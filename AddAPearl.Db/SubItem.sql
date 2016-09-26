CREATE TABLE [dbo].[SubItem](
	[SubItemId] [int] IDENTITY(1,1) NOT NULL,
	[ItemId] [int] NOT NULL,
	[Price] [decimal](18, 0) NULL,
	[PurchasePrice] [decimal](18, 0) NOT NULL,
	[PurchaseDate] [datetime] NULL,
	[Description] [nvarchar](max) NULL,
	[OwnerId] [int] NOT NULL,
	[CustomerId] [int] NOT NULL
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
