CREATE TABLE [dbo].[SubItem] (
    [SubItemId]     INT             IDENTITY (1, 1) NOT NULL,
    [ItemId]        INT             NOT NULL,
    [ProductId]     INT             NOT NULL,
    [SubItemName]   NVARCHAR (4000) NULL,
    [Price]         DECIMAL (18)    NULL,
    [PurchasePrice] DECIMAL (18)    NOT NULL,
    [PurchaseDate]  DATETIME        NULL,
    [Description]   NVARCHAR (MAX)  NULL,
    [OwnerId]       INT             NOT NULL,
    [CustomerId]    INT             NOT NULL,
    [Rating]        DECIMAL (18)    NULL,
    CONSTRAINT [PK_SubItem] PRIMARY KEY CLUSTERED ([SubItemId] ASC),
    CONSTRAINT [FK_SubItem_Customer] FOREIGN KEY ([CustomerId]) REFERENCES [dbo].[Customer] ([CustomerId]),
    CONSTRAINT [FK_SubItem_Item] FOREIGN KEY ([ItemId]) REFERENCES [dbo].[Item] ([ItemId]),
    CONSTRAINT [FK_SubItem_OwnerCustomer] FOREIGN KEY ([OwnerId]) REFERENCES [dbo].[Customer] ([CustomerId]),
    CONSTRAINT [FK_SubItem_Product] FOREIGN KEY ([ProductId]) REFERENCES [dbo].[Product] ([ProductId])
);








