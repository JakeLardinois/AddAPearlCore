CREATE TABLE [dbo].[Customer] (
    [CustomerId]  INT             IDENTITY (1, 1) NOT NULL,
    [FirstName]   NVARCHAR (4000) NULL,
    [LastName]    NVARCHAR (4000) NULL,
    [PhoneNumber] NVARCHAR (4000) NULL,
    [BirthDay]    DATETIME        NOT NULL,
    [Email]       NVARCHAR (50)   NULL,
    [AddressId]   INT             NOT NULL,
    [CompanyId]   INT             NOT NULL,
    CONSTRAINT [PK_Customer] PRIMARY KEY CLUSTERED ([CustomerId] ASC),
    CONSTRAINT [FK_Customer_Address] FOREIGN KEY ([AddressId]) REFERENCES [dbo].[Address] ([AddressId]),
    CONSTRAINT [FK_Customer_Company] FOREIGN KEY ([CompanyId]) REFERENCES [dbo].[Company] ([CompanyId])
);


