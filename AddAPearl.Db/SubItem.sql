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
    [Rating]        DECIMAL (18)    NULL
);




