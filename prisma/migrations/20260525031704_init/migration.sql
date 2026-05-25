-- CreateTable
CREATE TABLE "clonex_followers" (
    "id" TEXT NOT NULL,
    "followerid" TEXT NOT NULL,
    "followingid" TEXT NOT NULL,
    "createdat" TIMESTAMP(6) NOT NULL,

    CONSTRAINT "clonex_followers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "addresses" (
    "id" VARCHAR(60) NOT NULL,
    "city" VARCHAR(150),
    "county" VARCHAR,
    "ward" VARCHAR,
    "street" VARCHAR,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6),
    "address" VARCHAR(60),

    CONSTRAINT "addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "alembic_version" (
    "version_num" VARCHAR(32) NOT NULL,

    CONSTRAINT "alembic_version_pkc" PRIMARY KEY ("version_num")
);

-- CreateTable
CREATE TABLE "cartitems" (
    "id" VARCHAR(60) NOT NULL,
    "name" VARCHAR(60),
    "product_id" VARCHAR(60),
    "cart_id" VARCHAR(60),
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "category" VARCHAR(60),
    "image_url" VARCHAR,

    CONSTRAINT "cartitems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "carts" (
    "id" VARCHAR(60) NOT NULL,
    "user_id" VARCHAR(60),
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "carts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "categories" (
    "id" VARCHAR(60) NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clonex_cxcomments" (
    "id" TEXT NOT NULL,
    "cxpostid" TEXT NOT NULL,
    "cxuserid" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clonex_cxcomments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clonex_cxlikes" (
    "id" TEXT NOT NULL,
    "cxpostid" TEXT,
    "cxcommentid" TEXT,
    "cxuserid" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clonex_cxlikes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clonex_cxposts" (
    "id" TEXT NOT NULL,
    "cxuserid" TEXT NOT NULL,
    "mediaurl" TEXT NOT NULL,
    "caption" TEXT NOT NULL,
    "created_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clonex_cxposts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "clonex_cxusers" (
    "id" TEXT NOT NULL,
    "cxusername" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordhash" TEXT NOT NULL,
    "createdat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "updatedat" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "clonex_cxusers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "inventories" (
    "id" VARCHAR(60) NOT NULL,
    "product_id" VARCHAR(60) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reserved_quantity" INTEGER NOT NULL,
    "cost_price" DECIMAL(10,2) NOT NULL,
    "selling_price" DECIMAL(10,2) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6),
    "location" VARCHAR(60),

    CONSTRAINT "inventories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "order_items" (
    "id" VARCHAR(60) NOT NULL,
    "product_id" VARCHAR(60),
    "quantity" INTEGER NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "image_url" VARCHAR,
    "order_id" VARCHAR(60),
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6),

    CONSTRAINT "order_items_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "orders" (
    "id" VARCHAR(60) NOT NULL,
    "total_amount" DECIMAL(10,2) NOT NULL,
    "status" VARCHAR(20) NOT NULL,
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6),
    "cart_id" VARCHAR(60) NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "permissions" (
    "id" VARCHAR(60) NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "action" VARCHAR(15) NOT NULL,
    "target" VARCHAR(15) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "permissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "product_images" (
    "id" VARCHAR NOT NULL,
    "url" VARCHAR NOT NULL,
    "file_name" VARCHAR NOT NULL,
    "is_main" BOOLEAN,
    "product_id" VARCHAR NOT NULL,
    "uploaded_at" TIMESTAMPTZ(6),

    CONSTRAINT "product_images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" VARCHAR(60) NOT NULL,
    "name" VARCHAR,
    "price" DECIMAL(10,2),
    "description" TEXT,
    "category_name" VARCHAR,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "role_permissions" (
    "id" INTEGER,
    "role_id" VARCHAR(60) NOT NULL,
    "permission_id" VARCHAR(60) NOT NULL,

    CONSTRAINT "role_permissions_pkey" PRIMARY KEY ("role_id","permission_id")
);

-- CreateTable
CREATE TABLE "roles" (
    "id" VARCHAR(60) NOT NULL,
    "name" VARCHAR(250) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6),

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user_addresses" (
    "user_id" VARCHAR(60) NOT NULL,
    "address_id" VARCHAR(60) NOT NULL,

    CONSTRAINT "user_addresses_pkey" PRIMARY KEY ("user_id","address_id")
);

-- CreateTable
CREATE TABLE "user_roles" (
    "id" INTEGER,
    "role_id" VARCHAR(60) NOT NULL,
    "user_id" VARCHAR(60) NOT NULL,

    CONSTRAINT "user_roles_pkey" PRIMARY KEY ("role_id","user_id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" VARCHAR(60) NOT NULL,
    "first_name" VARCHAR,
    "last_name" VARCHAR,
    "email" VARCHAR NOT NULL,
    "username" VARCHAR(60) NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL,
    "updated_at" TIMESTAMPTZ(6),
    "password_hash" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "carts_user_id_key" ON "carts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "categories_name_key" ON "categories"("name");

-- CreateIndex
CREATE UNIQUE INDEX "clonex_cxusers_cxusername_key" ON "clonex_cxusers"("cxusername");

-- CreateIndex
CREATE UNIQUE INDEX "inventories_location_key" ON "inventories"("location");

-- CreateIndex
CREATE UNIQUE INDEX "permissions_name_key" ON "permissions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "product_images_url_key" ON "product_images"("url");

-- CreateIndex
CREATE UNIQUE INDEX "product_images_file_name_key" ON "product_images"("file_name");

-- CreateIndex
CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "clonex_followers" ADD CONSTRAINT "fk_follower_user" FOREIGN KEY ("followerid") REFERENCES "clonex_cxusers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clonex_followers" ADD CONSTRAINT "fk_following_user" FOREIGN KEY ("followingid") REFERENCES "clonex_cxusers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cartitems" ADD CONSTRAINT "cartitems_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "cartitems" ADD CONSTRAINT "cartitems_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "carts" ADD CONSTRAINT "carts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clonex_cxcomments" ADD CONSTRAINT "fk_comment_post" FOREIGN KEY ("cxpostid") REFERENCES "clonex_cxposts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clonex_cxcomments" ADD CONSTRAINT "fk_comment_user" FOREIGN KEY ("cxuserid") REFERENCES "clonex_cxusers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clonex_cxlikes" ADD CONSTRAINT "fk_like_comment" FOREIGN KEY ("cxcommentid") REFERENCES "clonex_cxcomments"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clonex_cxlikes" ADD CONSTRAINT "fk_like_post" FOREIGN KEY ("cxpostid") REFERENCES "clonex_cxposts"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clonex_cxlikes" ADD CONSTRAINT "fk_like_user" FOREIGN KEY ("cxuserid") REFERENCES "clonex_cxusers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "clonex_cxposts" ADD CONSTRAINT "fk_post_user" FOREIGN KEY ("cxuserid") REFERENCES "clonex_cxusers"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "inventories" ADD CONSTRAINT "inventories_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "order_items" ADD CONSTRAINT "order_items_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_cart_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_category_name_fkey" FOREIGN KEY ("category_name") REFERENCES "categories"("name") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_permission_id_fkey" FOREIGN KEY ("permission_id") REFERENCES "permissions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "role_permissions" ADD CONSTRAINT "role_permissions_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "addresses"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "user_roles" ADD CONSTRAINT "user_roles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
