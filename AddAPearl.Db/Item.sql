CREATE TABLE [dbo].[Item] (
    [ItemId]        INT             IDENTITY (1, 1) NOT NULL,
    [ProductId]     INT             NOT NULL,
    [ItemName]      NVARCHAR (4000) NULL,
    [Price]         DECIMAL (18)    NULL,
    [PurchasePrice] DECIMAL (18)    NOT NULL,
    [PurchaseDate]  DATETIME        NULL,
    [Description]   NVARCHAR (MAX)  NULL,
    [OwnerId]       INT             NOT NULL,
    [CustomerId]    INT             NOT NULL,
    CONSTRAINT [PK_StoreItem] PRIMARY KEY CLUSTERED ([ItemId] ASC)
);


