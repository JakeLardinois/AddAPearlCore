CREATE TABLE [dbo].[Company] (
    [CompanyId]   INT           IDENTITY (1, 1) NOT NULL,
    [CompanyName] NVARCHAR (50) NULL,
    [Email]       NVARCHAR (50) NULL,
    [AddressId]   INT           NULL,
    CONSTRAINT [PK_Company] PRIMARY KEY CLUSTERED ([CompanyId] ASC),
    CONSTRAINT [FK_Company_Address] FOREIGN KEY ([AddressId]) REFERENCES [dbo].[Address] ([AddressId])
);




