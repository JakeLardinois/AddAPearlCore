CREATE TABLE [dbo].[Address](
	[AddressId] [int] IDENTITY(1,1) NOT NULL,
	[AddressLine1] [nvarchar](4000) NULL,
	[AddressLine2] [nvarchar](4000) NULL,
	[AddressLine3] [nvarchar](4000) NULL,
	[City] [nvarchar](4000) NULL,
	[State] [nvarchar](4000) NULL,
	[ZipCode] [nvarchar](4000) NULL,
 CONSTRAINT [PK_Address] PRIMARY KEY CLUSTERED 
(
	[AddressId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
