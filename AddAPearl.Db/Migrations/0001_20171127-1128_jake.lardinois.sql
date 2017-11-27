-- <Migration ID="cb7806c9-19ab-46a7-8d2f-f78e7158cc3c" />
GO

PRINT N'Creating [dbo].[Address]'
GO
CREATE TABLE [dbo].[Address]
(
[AddressId] [int] NOT NULL IDENTITY(1, 1),
[AddressLine1] [nvarchar] (4000) NULL,
[AddressLine2] [nvarchar] (4000) NULL,
[AddressLine3] [nvarchar] (4000) NULL,
[City] [nvarchar] (4000) NULL,
[State] [nvarchar] (4000) NULL,
[ZipCode] [nvarchar] (4000) NULL
)
GO
PRINT N'Creating primary key [PK_Address] on [dbo].[Address]'
GO
ALTER TABLE [dbo].[Address] ADD CONSTRAINT [PK_Address] PRIMARY KEY CLUSTERED  ([AddressId])
GO
PRINT N'Creating [dbo].[Company]'
GO
CREATE TABLE [dbo].[Company]
(
[CompanyId] [int] NOT NULL IDENTITY(1, 1),
[CompanyName] [nvarchar] (50) NULL,
[Email] [nvarchar] (50) NULL,
[AddressId] [int] NULL
)
GO
PRINT N'Creating primary key [PK_Company] on [dbo].[Company]'
GO
ALTER TABLE [dbo].[Company] ADD CONSTRAINT [PK_Company] PRIMARY KEY CLUSTERED  ([CompanyId])
GO
PRINT N'Creating [dbo].[Customer]'
GO
CREATE TABLE [dbo].[Customer]
(
[CustomerId] [int] NOT NULL IDENTITY(1, 1),
[FirstName] [nvarchar] (4000) NULL,
[LastName] [nvarchar] (4000) NULL,
[PhoneNumber] [nvarchar] (4000) NULL,
[BirthDay] [datetime] NOT NULL,
[Email] [nvarchar] (50) NULL,
[AddressId] [int] NULL,
[CompanyId] [int] NOT NULL
)
GO
PRINT N'Creating primary key [PK_Customer] on [dbo].[Customer]'
GO
ALTER TABLE [dbo].[Customer] ADD CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED  ([CustomerId])
GO
PRINT N'Creating [dbo].[Item]'
GO
CREATE TABLE [dbo].[Item]
(
[ItemId] [int] NOT NULL IDENTITY(1, 1),
[ProductId] [int] NOT NULL,
[ItemName] [nvarchar] (4000) NULL,
[Price] [decimal] (18, 0) NULL,
[PurchasePrice] [decimal] (18, 0) NOT NULL,
[PurchaseDate] [datetime] NULL,
[Description] [nvarchar] (max) NULL,
[OwnerId] [int] NOT NULL,
[CustomerId] [int] NOT NULL,
[Rating] [decimal] (18, 0) NULL
)
GO
PRINT N'Creating primary key [PK_StoreItem] on [dbo].[Item]'
GO
ALTER TABLE [dbo].[Item] ADD CONSTRAINT [PK_StoreItem] PRIMARY KEY CLUSTERED  ([ItemId])
GO
PRINT N'Creating [dbo].[Product]'
GO
CREATE TABLE [dbo].[Product]
(
[ProductId] [int] NOT NULL IDENTITY(1, 1),
[ProductName] [nvarchar] (4000) NULL,
[ProductCode] [nvarchar] (4000) NULL,
[ReleaseDate] [datetime] NULL,
[Price] [decimal] (18, 0) NULL,
[PurchasePrice] [decimal] (18, 0) NOT NULL,
[PurchaseDate] [datetime] NULL,
[Description] [nvarchar] (max) NULL,
[Rating] [decimal] (18, 0) NULL
)
GO
PRINT N'Creating primary key [PK_Product] on [dbo].[Product]'
GO
ALTER TABLE [dbo].[Product] ADD CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED  ([ProductId])
GO
PRINT N'Creating [dbo].[SubItem]'
GO
CREATE TABLE [dbo].[SubItem]
(
[SubItemId] [int] NOT NULL IDENTITY(1, 1),
[ItemId] [int] NOT NULL,
[ProductId] [int] NOT NULL,
[SubItemName] [nvarchar] (4000) NULL,
[Price] [decimal] (18, 0) NULL,
[PurchasePrice] [decimal] (18, 0) NOT NULL,
[PurchaseDate] [datetime] NULL,
[Description] [nvarchar] (max) NULL,
[OwnerId] [int] NOT NULL,
[CustomerId] [int] NOT NULL,
[Rating] [decimal] (18, 0) NULL
)
GO
PRINT N'Creating primary key [PK_SubItem] on [dbo].[SubItem]'
GO
ALTER TABLE [dbo].[SubItem] ADD CONSTRAINT [PK_SubItem] PRIMARY KEY CLUSTERED  ([SubItemId])
GO
PRINT N'Adding foreign keys to [dbo].[Company]'
GO
ALTER TABLE [dbo].[Company] ADD CONSTRAINT [FK_Company_Address] FOREIGN KEY ([AddressId]) REFERENCES [dbo].[Address] ([AddressId])
GO
PRINT N'Adding foreign keys to [dbo].[Customer]'
GO
ALTER TABLE [dbo].[Customer] ADD CONSTRAINT [FK_Customer_Address] FOREIGN KEY ([AddressId]) REFERENCES [dbo].[Address] ([AddressId])
GO
ALTER TABLE [dbo].[Customer] ADD CONSTRAINT [FK_Customer_Company] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([CompanyId])
GO
PRINT N'Adding foreign keys to [dbo].[Item]'
GO
ALTER TABLE [dbo].[Item] ADD CONSTRAINT [FK_Item_Customer] FOREIGN KEY ([CustomerId]) REFERENCES [dbo].[Customer] ([CustomerId])
GO
ALTER TABLE [dbo].[Item] ADD CONSTRAINT [FK_Item_OwnerCustomer] FOREIGN KEY ([OwnerId]) REFERENCES [dbo].[Customer] ([CustomerId])
GO
ALTER TABLE [dbo].[Item] ADD CONSTRAINT [FK_Item_Product] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product] ([ProductId])
GO
PRINT N'Adding foreign keys to [dbo].[SubItem]'
GO
ALTER TABLE [dbo].[SubItem] ADD CONSTRAINT [FK_SubItem_Customer] FOREIGN KEY ([CustomerId]) REFERENCES [dbo].[Customer] ([CustomerId])
GO
ALTER TABLE [dbo].[SubItem] ADD CONSTRAINT [FK_SubItem_OwnerCustomer] FOREIGN KEY ([OwnerId]) REFERENCES [dbo].[Customer] ([CustomerId])
GO
ALTER TABLE [dbo].[SubItem] ADD CONSTRAINT [FK_SubItem_Item] FOREIGN KEY ([ItemId]) REFERENCES [dbo].[Item] ([ItemId])
GO
ALTER TABLE [dbo].[SubItem] ADD CONSTRAINT [FK_SubItem_Product] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product] ([ProductId])
GO
