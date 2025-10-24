// Prisma Schema Converted from Provided SQL
// Database: PostgreSQL

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Role {
  id            BigInt           @id @default(autoincrement())
  role_name     String
  users         User[]
  permissions   RolesPermissions[]
  audit_logs    AuditLog[]

  @@map("roles")
}

model Permission {
  id          BigInt              @id @default(autoincrement())
  name        String
  roles       RolesPermissions[]
  audit_logs  AuditLog[]

  @@map("permissions")
}

model RolesPermissions {
  role_id       BigInt
  permission_id BigInt

  role        Role        @relation(fields: [role_id], references: [id])
  permission  Permission  @relation(fields: [permission_id], references: [id])

  @@id([role_id, permission_id])
  @@map("roles_permissions")
}

model User {
  id           BigInt         @id @default(autoincrement())
  role_id      BigInt
  email        String?
  phone_number String
  name         String
  is_active    Boolean        @default(true)
  created_at   DateTime       @default(now())
  updated_at   DateTime       @default(now())
  auth         Auth?
  role         Role           @relation(fields: [role_id], references: [id])
  stores       UsersStores[]
  carts        Cart[]
  orders       Order[]
  audit_logs   AuditLog[]

  @@map("users")
}

model Auth {
  id        BigInt  @id @default(autoincrement())
  user_id   BigInt  @unique
  username  String  @unique
  password  String
  user      User    @relation(fields: [user_id], references: [id])

  @@map("auths")
}

model Store {
  id             BigInt              @id @default(autoincrement())
  name           String
  created_at     DateTime            @default(now())
  updated_at     DateTime            @default(now())
  users          UsersStores[]
  menus          Menu[]
  tables         StoreTable[]
  carts          Cart[]
  orders         Order[]
  transactions   Transaction[]
  audit_logs     AuditLog[]
  store_accesses StoresStoreAccess[]

  @@map("stores")
}

model StoreAccess {
  id         BigInt              @id @default(autoincrement())
  name       String
  storeLinks StoresStoreAccess[]

  @@map("stores_access")
}

model StoresStoreAccess {
  store_id        BigInt
  store_access_id BigInt

  store       Store        @relation(fields: [store_id], references: [id])
  storeAccess StoreAccess  @relation(fields: [store_access_id], references: [id])

  @@id([store_id, store_access_id])
  @@map("stores_store_access")
}

model UsersStores {
  user_id  BigInt
  store_id BigInt

  user  User  @relation(fields: [user_id], references: [id])
  store Store @relation(fields: [store_id], references: [id])

  @@id([user_id, store_id])
  @@map("users_stores")
}

model Menu {
  id          BigInt     @id @default(autoincrement())
  store_id    BigInt
  name        String
  created_at  DateTime   @default(now())
  updated_at  DateTime   @default(now())
  store       Store      @relation(fields: [store_id], references: [id])
  items       Item[]

  @@map("menus")
}

model Item {
  id          BigInt     @id @default(autoincrement())
  menu_id     BigInt
  name        String
  price       BigInt
  category    String?
  is_active   Boolean    @default(true)
  created_at  DateTime   @default(now())
  updated_at  DateTime   @default(now())
  menu        Menu       @relation(fields: [menu_id], references: [id])
  cart_items  CartsItems[]

  @@map("items")
}

model StoreTable {
  id           BigInt    @id @default(autoincrement())
  store_id     BigInt
  table_number String
  qr_code      String    @unique
  created_at   DateTime  @default(now())
  updated_at   DateTime  @default(now())
  store        Store     @relation(fields: [store_id], references: [id])
  carts        Cart[]

  @@map("store_tables")
}

model Cart {
  id          BigInt      @id @default(autoincrement())
  user_id     BigInt
  store_id    BigInt
  table_id    BigInt
  total_cost  BigInt?
  created_at  DateTime    @default(now())
  updated_at  DateTime    @default(now())
  user        User        @relation(fields: [user_id], references: [id])
  store       Store       @relation(fields: [store_id], references: [id])
  table       StoreTable  @relation(fields: [table_id], references: [id])
  items       CartsItems[]
  payment     Payment?

  @@map("carts")
}

model CartsItems {
  id        BigInt  @id @default(autoincrement())
  cart_id   BigInt
  item_id   BigInt
  quantity  BigInt
  price     BigInt

  cart  Cart  @relation(fields: [cart_id], references: [id])
  item  Item  @relation(fields: [item_id], references: [id])

  @@map("carts_items")
}

model Payment {
  id               BigInt     @id @default(autoincrement())
  cart_id          BigInt     @unique   // ✅ Fixed: one-to-one relation with Cart
  method           String
  midtrans_id      String?
  gross_amount     Decimal
  payment_method   String?
  bank             String?
  payment_receipt  String?
  status           String?
  invoice          String?
  midtrans_data    Json?
  paid_at          DateTime   @default(now())
  cart             Cart       @relation(fields: [cart_id], references: [id])
  order            Order?

  @@map("payments")
}

model Order {
  id          BigInt     @id @default(autoincrement())
  user_id     BigInt
  payment_id  BigInt     @unique   // ✅ Fixed: one-to-one relation with Payment
  store_id    BigInt
  status      String?
  created_at  DateTime   @default(now())
  updated_at  DateTime   @default(now())
  user        User       @relation(fields: [user_id], references: [id])
  payment     Payment    @relation(fields: [payment_id], references: [id])
  store       Store      @relation(fields: [store_id], references: [id])
  transactions Transaction[]

  @@map("orders")
}

model Transaction {
  id          BigInt     @id @default(autoincrement())
  store_id    BigInt
  order_id    BigInt
  income      BigInt
  detail      Json?
  created_at  DateTime   @default(now())
  updated_at  DateTime   @default(now())
  store       Store      @relation(fields: [store_id], references: [id])
  order       Order      @relation(fields: [order_id], references: [id])

  @@map("transactions")
}

model AuditLog {
  id               BigInt     @id @default(autoincrement())
  user_id          BigInt
  role_id          BigInt
  permission_id    BigInt
  store_id         BigInt
  old_data         Json?
  new_data         Json?
  title            String?
  description      String?
  action           String?
  ip_address       String?
  user_access_from String?
  status           String?
  created_at       DateTime   @default(now())
  user             User       @relation(fields: [user_id], references: [id])
  role             Role       @relation(fields: [role_id], references: [id])
  permission       Permission @relation(fields: [permission_id], references: [id])
  store            Store      @relation(fields: [store_id], references: [id])

  @@map("audit_logs")
}
