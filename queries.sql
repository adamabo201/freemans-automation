-- Retrieve All Records
SELECT * FROM form_fields;

-- Search by Field (change the selector if needed)
SELECT * FROM form_fields WHERE selector='#FirstName';

-- Update Record
UPDATE form_fields
SET value='Updated Name'
WHERE selector='#FirstName';

-- Delete Record
DELETE FROM form_fields
WHERE selector='#FirstName';
