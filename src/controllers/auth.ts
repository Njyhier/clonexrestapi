// import type { Response, Request, NextFunction } from "express";
// import { prisma } from "./prisma";
// import { compareSync } from "bcrypt";
// import jwt from "jsonwebtoken";
// import dotenv from "dotenv";
// import { hash } from "bcrypt";
// import { Prisma } from "@prisma/client";

// dotenv.config({ path: ".env" });

// const SECRET_KEY = process.env.SECRET_KEY!;
// export const login = async (req: Request, res: Response) => {
//   try {
//     const { password, username } = req.body;

//     const user = await prisma.cXUser.findFirst({
//       where: { cxusername: username },
//     });

//     if (!user) {
//       throw new Error("Invalid username or password");
//     }

//     if (!compareSync(password, user.passwordhash ?? "")) {
//       throw new Error("Invalid username or password");
//     }

//     const token = jwt.sign(
//       {
//         userId: user.id,
//       },
//       SECRET_KEY,
//     );

//     return res.status(200).json({
//       message: "Login successful",
//       payload: {
//         user,
//         token,
//       },
//     });
//   } catch (error: any) {
//     console.error("Login error:", error);

//     return res.status(401).json({
//       message: error.message || "Login failed",
//     });
//   }
// };

// export const signup = async (req: Request, res: Response) => {
//   try {
//     const { username, password, email } = req.body;

//     // 1. Basic validation
//     if (
//       typeof username !== "string" ||
//       typeof password !== "string" ||
//       typeof email !== "string"
//     ) {
//       return res.status(400).json({
//         message: "Username, email and password are required",
//       });
//     }

//     // 2. Normalize input
//     const normalizedUsername = username.trim();
//     const normalizedEmail = email.trim().toLowerCase();

//     // 3. Validate values
//     if (!normalizedUsername || !normalizedEmail || !password) {
//       return res.status(400).json({
//         message: "Username, email and password are required",
//       });
//     }

//     if (normalizedUsername.length < 3) {
//       return res.status(400).json({
//         message: "Username must be at least 3 characters",
//       });
//     }

//     if (password.length < 8) {
//       return res.status(400).json({
//         message: "Password must be at least 8 characters",
//       });
//     }

//     // 4. Check whether user already exists
//     const existingUser = await prisma.cXUser.findFirst({
//       where: {
//         OR: [{ cxusername: normalizedUsername }, { email: normalizedEmail }],
//       },
//       select: {
//         id: true,
//         cxusername: true,
//         email: true,
//       },
//     });

//     if (existingUser) {
//       return res.status(409).json({
//         message: "Username or email already exists",
//       });
//     }

//     // 5. Hash password
//     const passwordHash = await hash(password, 12);

//     // 6. Create user
//     const user = await prisma.cXUser.create({
//       data: {
//         cxusername: normalizedUsername,
//         email: normalizedEmail,
//         passwordhash: passwordHash,
//       },
//       select: {
//         id: true,
//         cxusername: true,
//         email: true,
//         createdAt: true,
//       },
//     });

//     // 7. Return safe response
//     return res.status(201).json({
//       message: "Signup successful",
//       payload: user,
//     });
//   } catch (error) {
//     console.error("Signup error:", error);

//     // Prisma unique constraint
//     if (
//       error instanceof Prisma.PrismaClientKnownRequestError &&
//       error.code === "P2002"
//     ) {
//       return res.status(409).json({
//         message: "Username or email already exists",
//       });
//     }

//     // Don't expose database/internal errors to client
//     return res.status(500).json({
//       message: "Unable to create account",
//     });
//   }
// };

// export const getCurrentUser = async (
//   req: Request,
//   res: Response,
//   next: NextFunction,
// ) => {
//   try {
//     const token = req.headers.authorization ?? "";
//     if (!token) {
//       return res.status(403).json({
//         message: "Unauthorized",
//       });
//     }
//     const payload: { userId: string } = jwt.verify(token, SECRET_KEY) as any;
//     const user = await prisma.cXUser.findFirst({
//       where: { id: payload?.userId },
//     });
//     if (!user) {
//       return res.status(404).json({ message: "User does not exist" });
//     }
//     return res.json({ user });
//   } catch (error: any) {
//     console.log("Error", error);
//   }
// };

import type { Request, Response } from "express";
import { prisma } from "./prisma";
import { hash, compare } from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Prisma } from "@prisma/client";

dotenv.config({ path: ".env" });

const SECRET_KEY = process.env.SECRET_KEY;

if (!SECRET_KEY) {
  throw new Error("SECRET_KEY is not configured");
}

const JWT_EXPIRES_IN = "1h";

/**
 * Generate JWT
 */
const generateToken = (userId: string) => {
  return jwt.sign(
    {
      userId,
    },
    SECRET_KEY,
    {
      expiresIn: JWT_EXPIRES_IN,
    },
  );
};

/**
 * LOGIN
 */
export const login = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;

    // Validate input
    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      !username.trim() ||
      !password
    ) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    const normalizedUsername = username.trim();

    // Find user
    const user = await prisma.cXUser.findFirst({
      where: {
        cxusername: normalizedUsername,
      },
    });

    // Don't reveal whether username exists
    if (!user) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    // Compare password
    const passwordMatches = await compare(password, user.passwordhash ?? "");

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid username or password",
      });
    }

    // Generate JWT
    const token = generateToken(user.id);

    // Never return password hash
    const safeUser = {
      id: user.id,
      username: user.cxusername,
      email: user.email,
      createdAt: user.createdat,
    };

    return res.status(200).json({
      message: "Login successful",
      payload: {
        user: safeUser,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error);

    return res.status(500).json({
      message: "Unable to login",
    });
  }
};

/**
 * SIGNUP
 */
export const signup = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = req.body;

    // Basic validation
    if (
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof email !== "string"
    ) {
      return res.status(400).json({
        message: "Username, email and password are required",
      });
    }

    // Normalize
    const normalizedUsername = username.trim();
    const normalizedEmail = email.trim().toLowerCase();

    // Validate
    if (!normalizedUsername || !normalizedEmail || !password) {
      return res.status(400).json({
        message: "Username, email and password are required",
      });
    }

    if (normalizedUsername.length < 3) {
      return res.status(400).json({
        message: "Username must be at least 3 characters",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message: "Password must be at least 8 characters",
      });
    }

    // Check existing user
    const existingUser = await prisma.cXUser.findFirst({
      where: {
        OR: [
          {
            cxusername: normalizedUsername,
          },
          {
            email: normalizedEmail,
          },
        ],
      },
      select: {
        id: true,
        cxusername: true,
        email: true,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "Username or email already exists",
      });
    }

    // Hash password
    const passwordHash = await hash(password, 12);

    // Create user
    const user = await prisma.cXUser.create({
      data: {
        cxusername: normalizedUsername,
        email: normalizedEmail,
        passwordhash: passwordHash,
      },
      select: {
        id: true,
        cxusername: true,
        email: true,
        createdAt: true,
      },
    });

    return res.status(201).json({
      message: "Signup successful",
      payload: user,
    });
  } catch (error) {
    console.error("Signup error:", error);

    // Prisma unique constraint
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2002"
    ) {
      return res.status(409).json({
        message: "Username or email already exists",
      });
    }

    return res.status(500).json({
      message: "Unable to create account",
    });
  }
};

/**
 * GET CURRENT USER
 */
export const getCurrentUser = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;

    // Authorization header missing
    if (!authHeader) {
      return res.status(401).json({
        message: "Authentication required",
      });
    }

    // Expected:
    // Authorization: Bearer <token>
    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        message: "Invalid authorization header",
      });
    }

    // Verify JWT
    const payload = jwt.verify(token, SECRET_KEY) as {
      userId: string;
    };

    // Find user
    const user = await prisma.cXUser.findUnique({
      where: {
        id: payload.userId,
      },
      select: {
        id: true,
        cxusername: true,
        email: true,
        createdat: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "User does not exist",
      });
    }

    return res.status(200).json({
      message: "User retrieved successfully",
      payload: user,
    });
  } catch (error) {
    console.error("Get current user error:", error);

    if (error instanceof jwt.TokenExpiredError) {
      return res.status(401).json({
        message: "Token has expired",
      });
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({
        message: "Invalid token",
      });
    }

    return res.status(500).json({
      message: "Unable to retrieve user",
    });
  }
};
