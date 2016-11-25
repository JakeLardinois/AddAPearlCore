/*
Post-Deployment Script Template							
--------------------------------------------------------------------------------------
 This file contains SQL statements that will be appended to the build script.		
 Use SQLCMD syntax to include a file in the post-deployment script.			
 Example:      :r .\myfile.sql								
 Use SQLCMD syntax to reference a variable in the post-deployment script.		
 Example:      :setvar TableName MyTable							
               SELECT * FROM [$(TableName)]					
--------------------------------------------------------------------------------------
*/
--Reference Data for Address 
MERGE INTO Address AS Target 
USING (VALUES 
  (0, N'3565 Ridge Road', N'Undefined', N'Undefined', N'Sturgeon Bay', N'WI', N'54235'), 
  (1, N'50 North Third Avenue', N'Undefined', N'Undefined', N'Sturgeon Bay', N'WI', N'54235')
) 
AS Source (AddressId, AddressLine1, AddressLine2, AddressLine3, City, State, ZipCode) 
ON Target.AddressId = Source.AddressId 
--update matched rows 
WHEN MATCHED THEN 
UPDATE SET AddressLine1 = Source.AddressLine1, AddressLine2 = Source.AddressLine2, AddressLine3 = Source.AddressLine3, City = Source.City, State = Source.State, ZipCode = Source.ZipCode
--insert new rows 
WHEN NOT MATCHED BY TARGET THEN 
INSERT (AddressLine1, AddressLine2, AddressLine3, City, State, ZipCode) 
VALUES (AddressLine1, AddressLine2, AddressLine3, City, State, ZipCode) 
--delete rows that are in the target but not the source 
WHEN NOT MATCHED BY SOURCE THEN 
DELETE;