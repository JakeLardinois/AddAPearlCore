CREATE TABLE [dbo].[Product] (
    [ProductId]     INT             NOT NULL,
    [ProductName]   NVARCHAR (4000) NULL,
    [ProductCode]   NVARCHAR (4000) NULL,
    [ReleaseDate]   DATETIME        NULL,
    [Price]         DECIMAL (18)    NULL,
    [PurchasePrice] DECIMAL (18)    NOT NULL,
    [PurchaseDate]  DATETIME        NULL,
    [Description]   NVARCHAR (MAX)  NULL,
    CONSTRAINT [PK_Product] PRIMARY KEY CLUSTERED ([ProductId] ASC)
);

