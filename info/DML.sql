-- Database meets the three business objectives.
-- 
-- Objective 1: Prevent process safety incidents by monitoring the levels in the tanks
--

SELECT `Tanks`.`tankID`, `Tanks`.`tankName`, `Tanks`.`pumpableVol` / `Tanks`.`capacity` * 100 
AS `levelPercent`
FROM `Tanks`;

-- Below is to create Objective 1 query as a stored procedure
DELIMITER //
CREATE PROCEDURE tankLevels()
BEGIN
SELECT `Tanks`.`tankID`, `Tanks`.`tankName`, `Tanks`.`pumpableVol` / `Tanks`.`capacity` * 100 
AS `levelPercent`
FROM `Tanks`;
END;
//
-- This stored procedure can be used via the following:
CALL tankLevels();

-- This query gives the remaining volume in a Tank
SELECT (`Tanks`.`capacity` - `Tanks`.`pumpableVol`) AS 'freeVol'
FROM `Tanks`;

-- The above are combined in the tanksInfo stored procedure
------------------------
-- Tanks Information
------------------------
-- Provide the levels and remaining volume for each tank
DELIMITER //
CREATE PROCEDURE `tanksInfo`()
BEGIN
      CREATE TEMPORARY TABLE `Levels` SELECT `Tanks`.`tankID`, ROUND(`Tanks`.`pumpableVol` / `Tanks`.`capacity` * 100, 1) AS 
      `levelPercent`, FORMAT(`Tanks`.`capacity` - `Tanks`.`pumpableVol`, 0) AS `freeVol` FROM `Tanks`;
      
      SELECT `Tanks`.`tankID`, `Tanks`.`tankName`, `Tanks`.`tankTypeID`, `TankTypes`.`tankTypeName`, 
      FORMAT(`Tanks`.`pumpableVol`, 0) AS `pumpableVol`, `Levels`.`freeVol`, 
      FORMAT(`Tanks`.`capacity`, 0) AS `capacity`, `Tanks`.`materialID`, `Materials`.`materialName`, 
      `Tanks`.`srcOrDest`, `Levels`.`levelPercent` FROM `Tanks`
      JOIN `Levels` ON `Tanks`.`tankID` = `Levels`.`tankID`
      LEFT JOIN `TankTypes` ON `Tanks`.`tankTypeID` = `TankTypes`.`tankTypeID`
      JOIN `Materials` ON `Tanks`.`materialID` = `Materials`.`materialID`
      ORDER BY CAST(SUBSTRING(`Tanks`.`tankName`, 2) AS UNSIGNED);
      
      DROP TEMPORARY TABLE `Levels`;
   END //
DELIMITER ;
-- This stored procedure can be used via the following:
CALL tanksInfo;



-- Objective 2: Identify conflicting tasks (given a task, what tasks are not allowed b/c
--              of lineup conflicts).  Also should be able to identify which tanks belong
--              to which tasks.

-- Below is to identify the conflicting tasks as a stored procedure
DELIMITER //
CREATE PROCEDURE `conflictingTasks`(IN taskIDToCheck INT)
BEGIN
	CREATE TEMPORARY TABLE `TaskSources`
	SELECT `Tasks`.`taskID`, `Tasks`.`taskVolume`, GROUP_CONCAT(CONCAT(' ', `Tanks`.`tankName`, ' (', `Materials`.`materialName`, ')')) AS `sources`
	FROM `Tasks`
	JOIN `Lineups` ON `Tasks`.`taskID` = `Lineups`.`taskID`
	JOIN `Tanks` ON `Lineups`.`tankID` = `Tanks`.`tankID`
	JOIN `Materials` ON `Tanks`.`materialID` = `Materials`.`materialID`
	WHERE `Tanks`.`srcOrDest` = 'source'
	GROUP BY `Tasks`.`taskID`
	ORDER BY `Tasks`.`taskID`;

	CREATE TEMPORARY TABLE `TaskDestinations`
	SELECT `Tasks`.`taskID`, `Tasks`.`taskVolume`, CONCAT(`Materials`.`materialName`, ' in ', `Tanks`.`tankName`) AS `destination`
	FROM `Tasks`
	JOIN `Lineups` ON `Tasks`.`taskID` = `Lineups`.`taskID`
	JOIN `Tanks` ON `Lineups`.`tankID` = `Tanks`.`tankID`
	JOIN `Materials` ON `Tanks`.`materialID` = `Materials`.`materialID`
	WHERE `Tanks`.`srcOrDest` = 'destination'
	GROUP BY `Tasks`.`taskID`
	ORDER BY `Tasks`.`taskID`;
    
SELECT `Tasks`.`taskID`, CONCAT(FORMAT(`Tasks`.`taskVolume`, 0), ' bbls of ', `TaskDestinations`.`destination`, ' from ', `TaskSources`.`sources`) as taskDescription
FROM `Tasks`
JOIN `Lineups`
ON `Tasks`.`taskID` = `Lineups`.`taskID`
JOIN `TaskDestinations`
ON `Tasks`.`taskID` = `TaskDestinations`.`taskID` 
JOIN `TaskSources`
ON `Tasks`.`taskID` = `TaskSources`.`taskID` 
WHERE `Lineups`.`tankID` IN (
SELECT `Tanks`.`tankID` as TanksInUse
FROM `Tasks`
JOIN `Lineups`
ON `Tasks`.`taskID` = `Lineups`.`taskID`
JOIN `Tanks`
ON `Lineups`.`tankID` = `Tanks`.`tankID`
WHERE `Tasks`.`taskID` = taskIDToCheck) AND `Tasks`.`taskID` <> taskIDToCheck 
GROUP BY `Tasks`.`taskID`
ORDER BY `Tasks`.`taskID`;

DROP TEMPORARY TABLE `TaskSources`;
DROP TEMPORARY TABLE `TaskDestinations`;
END //
DELIMITER ;
-- This stored procedure can be used via the following:
CALL conflictingTasks(taskIDToCheck);

-- Below is to create a query as a stored procedure answering which tasks use a particular tank
DELIMITER //
CREATE PROCEDURE `tasksUsingTank`(IN tankNumber INT)
BEGIN
	CREATE TEMPORARY TABLE `TaskSources`
	SELECT `Tasks`.`taskID`, `Tasks`.`taskVolume`, GROUP_CONCAT(CONCAT(' ', `Tanks`.`tankName`, ' (', `Materials`.`materialName`, ')')) AS `sources`
	FROM `Tasks`
	JOIN `Lineups` ON `Tasks`.`taskID` = `Lineups`.`taskID`
	JOIN `Tanks` ON `Lineups`.`tankID` = `Tanks`.`tankID`
	JOIN `Materials` ON `Tanks`.`materialID` = `Materials`.`materialID`
	WHERE `Tanks`.`srcOrDest` = 'source'
	GROUP BY `Tasks`.`taskID`
	ORDER BY `Tasks`.`taskID`;

	CREATE TEMPORARY TABLE `TaskDestinations`
	SELECT `Tasks`.`taskID`, `Tasks`.`taskVolume`, CONCAT(`Materials`.`materialName`, ' in ', `Tanks`.`tankName`) AS `destination`
	FROM `Tasks`
	JOIN `Lineups` ON `Tasks`.`taskID` = `Lineups`.`taskID`
	JOIN `Tanks` ON `Lineups`.`tankID` = `Tanks`.`tankID`
	JOIN `Materials` ON `Tanks`.`materialID` = `Materials`.`materialID`
	WHERE `Tanks`.`srcOrDest` = 'destination'
	GROUP BY `Tasks`.`taskID`
	ORDER BY `Tasks`.`taskID`;
	
    CREATE TEMPORARY TABLE `TaskInfo`
	SELECT `TaskDestinations`.`taskID`, FORMAT(`TaskDestinations`.`taskVolume`, 0) as `taskVolume`, `TaskDestinations`.`destination`, `TaskSources`.`sources`, 
		CONCAT(FORMAT(`TaskDestinations`.`taskVolume`, 0), ' bbls of ', `TaskDestinations`.`destination`, ' from: ', `TaskSources`.`sources`) as taskDescription
	FROM `TaskDestinations`
	JOIN `TaskSources`
	ON `TaskDestinations`.`taskID` = `TaskSources`.`taskID`
	ORDER BY `TaskDestinations`.`taskID`;

	SELECT `TaskInfo`.`taskID`, `TaskInfo`.`taskDescription`
    FROM `TaskInfo`
    JOIN `Lineups` ON `TaskInfo`.`taskID` = `Lineups`.`taskID`
    WHERE `Lineups`.`tankID` = tankNumber
    ORDER BY `TaskInfo`.`taskID`;

	DROP TEMPORARY TABLE `TaskSources`;
	DROP TEMPORARY TABLE `TaskDestinations`;
    DROP TEMPORARY TABLE `TaskInfo`;
END //
DELIMITER ;
-- This stored procedure can be used via the following:
CALL tasksUsingTank(tankNumber);

-- Objective 3: Allow for blending optimization.
-- A third party blend optimization software package would use the BOMB to understand
-- material volumes, specifications, and lineups to schedule and blend the material from
-- the source tanks into the destination tanks.
--
--
---------------------------------------------------------
-- Other pages
--
------------------------
-- TankTypes Information
------------------------
-- Provide the count of tanks of a particular type and give a list of those tanks
DELIMITER //
CREATE PROCEDURE `tankTypesInfo`()
BEGIN
	SELECT `TankTypes`.`tankTypeID`, `TankTypes`.`tankTypeName`, COUNT(`Tanks`.`tankID`) AS count, 
		GROUP_CONCAT(`Tanks`.`tankName` SEPARATOR ', ') AS `tankNames`
	FROM `TankTypes`
	LEFT JOIN `Tanks` ON `Tanks`.`tankTypeID` = `TankTypes`.`tankTypeID`
	GROUP BY `TankTypes`.`tankTypeID`
	ORDER BY `TankTypes`.`tankTypeID`;
   END //
DELIMITER ;

------------------------
-- Tasks Information
------------------------
-- Provide volume as well as the destination tank and source tank(s) for each of the tasks
DELIMITER //
CREATE PROCEDURE `tasksInfo`()
BEGIN
	CREATE TEMPORARY TABLE `TaskSources`
	SELECT `Tasks`.`taskID`, `Tasks`.`taskVolume`, GROUP_CONCAT(CONCAT(' ', `Tanks`.`tankName`, ' (', `Materials`.`materialName`, ')')) AS `sources`
	FROM `Tasks`
	LEFT JOIN `Lineups` ON `Tasks`.`taskID` = `Lineups`.`taskID`
	LEFT JOIN `Tanks` ON `Lineups`.`tankID` = `Tanks`.`tankID`
	LEFT JOIN `Materials` ON `Tanks`.`materialID` = `Materials`.`materialID`
	WHERE (`Tanks`.`srcOrDest` = 'source' OR  `Tanks`.`srcOrDest` IS NULL)
	GROUP BY `Tasks`.`taskID`
	ORDER BY `Tasks`.`taskID`;

	CREATE TEMPORARY TABLE `TaskDestinations`
	SELECT `Tasks`.`taskID`, `Tasks`.`taskVolume`, CONCAT(`Materials`.`materialName`, ' in ', `Tanks`.`tankName`) AS `destination`
	FROM `Tasks`
	LEFT JOIN `Lineups` ON `Tasks`.`taskID` = `Lineups`.`taskID`
	LEFT JOIN `Tanks` ON `Lineups`.`tankID` = `Tanks`.`tankID`
	LEFT JOIN `Materials` ON `Tanks`.`materialID` = `Materials`.`materialID`
	WHERE (`Tanks`.`srcOrDest` = 'destination' OR  `Tanks`.`srcOrDest` IS NULL)
	GROUP BY `Tasks`.`taskID`
	ORDER BY `Tasks`.`taskID`;

	SELECT `TaskDestinations`.`taskID`, FORMAT(`TaskDestinations`.`taskVolume`, 0) as `taskVolume`, `TaskDestinations`.`destination`, `TaskSources`.`sources`, 
		CONCAT(`TaskDestinations`.`taskVolume`, ' of ', `TaskDestinations`.`destination`, ' from ', `TaskSources`.`sources`) as taskDescription
	FROM `TaskDestinations`
	LEFT JOIN `TaskSources`
	ON `TaskDestinations`.`taskID` = `TaskSources`.`taskID`
	ORDER BY `TaskDestinations`.`taskID`;

	DROP TEMPORARY TABLE `TaskSources`;
	DROP TEMPORARY TABLE `TaskDestinations`;
   END //
DELIMITER ;

------------------------
-- Lineups Information
------------------------
-- Provide the taskID, tankID as well as important information about the tank for all lineups
DELIMITER //
CREATE PROCEDURE `lineupsInfo`()
BEGIN
SELECT `Lineups`.`lineupID`, `Lineups`.`taskID`, `Lineups`.`tankID`, `Tanks`.`tankName`, `Tanks`.`srcOrDest`,
									CONCAT(`Tanks`.`tankName`, ' (', `Materials`.`materialName`, ') ', 
									CASE WHEN `Tanks`.`srcOrDest` = "source" 
                                    THEN CONCAT('Available: ', FORMAT(`Tanks`.`pumpableVol`, 0))
									ELSE CONCAT('Remaining: ', FORMAT(`Tanks`.`capacity` - `Tanks`.`pumpableVol`, 0)) 
                                    END) AS tankDetails
FROM `Lineups`
JOIN `Tanks` ON `Lineups`.`tankID` = `Tanks`.`tankID`
JOIN `Materials` ON `Tanks`.`materialID` = `Materials`.`materialID`
ORDER BY `Lineups`.`taskID`, `Tanks`.`srcOrDest`, `Tanks`.`tankName`;
END //
DELIMITER ;

------------------------
-- Materials Information
------------------------
-- Provide the materialID, name, as well as the specifications for a particular material.
DELIMITER //
CREATE PROCEDURE `materialInfo`(IN materialIDToCheck INT)
BEGIN     
SELECT CONCAT(`Materials`.`materialName`, ' ', `Tests`.`testName`) AS materialTestName ,`Materials`.`materialName`, 
`Tests`.`TestNumber`, `Tests`.`testDescription`, `Specifications`.`maxLimit`, `Specifications`.`minLimit`
	FROM `Materials`
	JOIN `Specifications`
	ON `Materials`.`materialID` = `Specifications`.`materialID`
	JOIN `Tests`
	ON `Specifications`.`testID` = `Tests`.`testID`
	WHERE `Materials`.`materialID` = materialIDToCheck
	GROUP BY `Tests`.`testID`;
END //
DELIMITER ;

------------------------
-- Tests Information
------------------------
-- Provide the test name, material, and specification info for a particular test.
DELIMITER //
CREATE PROCEDURE `testInfo`(IN testIDToCheck INT)
BEGIN
SELECT CONCAT(`Tests`.`testName`, ' ', `Materials`.`materialName`) AS testMaterialNames, `Tests`.`TestNumber`, `Tests`.`testDescription`, 
`Materials`.`materialName`,  `Specifications`.`maxLimit`, `Specifications`.`minLimit`
FROM `Tests`
JOIN `Specifications`
ON `Tests`.`testID` = `Specifications`.`testID`
JOIN `Materials`
ON `Specifications`.`materialID` = `Materials`.`materialID`
WHERE `Tests`.`testID` = testIDToCheck
GROUP BY `Materials`.`materialID`;
END //
DELIMITER ;

------------------------
-- Material/Tank Information
------------------------
-- Provide the materialID, name, as well as a count of the tanks holding each material and a listing of those tanks.
DELIMITER //
CREATE PROCEDURE `materialTankInfo`()
BEGIN
	SELECT `Materials`.`materialID`, `Materials`.`materialName`, COUNT(`Tanks`.`materialID`) as count,
		GROUP_CONCAT(`Tanks`.`tankName` ORDER BY CAST(SUBSTRING(`Tanks`.`tankName`, 2) AS UNSIGNED) SEPARATOR ', ' ) AS tankNames
	FROM `Materials`
	LEFT JOIN `Tanks` ON `Tanks`.`materialID` = `Materials`.`materialID`
	GROUP BY `Materials`.`materialName`;
END //
DELIMITER ;



---------------------------------------------------------
-----------------
-- Dropdown menus
-----------------
-- tanksDropdown - Dynamic query for dropdown selection
-- Below is to create the tanksDropdown as a stored procedure
DELIMITER //
CREATE PROCEDURE `tanksDropdown`()
BEGIN
SELECT `Tanks`.`tankID`, `Tanks`.`tankName`, CONCAT(`Tanks`.`tankName`, ' (', `Tanks`.`srcOrDest`, ') contains ',
									`Materials`.`materialName`, ' ', 
									CASE WHEN `Tanks`.`srcOrDest` = "source" 
                                    THEN CONCAT('Available: ', FORMAT(`Tanks`.`pumpableVol`, 0))
									ELSE CONCAT('Remaining: ', FORMAT(`Tanks`.`capacity` - `Tanks`.`pumpableVol`, 0)) 
                                    END) 
AS tankInfo
FROM `Tanks`
JOIN `Materials`
ON `Tanks`.`materialID` = `Materials`.`materialID`
ORDER BY CAST(SUBSTRING(`Tanks`.`tankName`, 2) AS UNSIGNED);
END //
DELIMITER ;
-- This stored procedure can be used via the following:
CALL tanksDropdown;

-- sourceTankDropdown - Dynamic query for dropdown selection
-- Below is to create the sourceTankDropdown as a stored procedure
DELIMITER //
CREATE PROCEDURE `sourceTankDropdown`()
BEGIN
SELECT `Tanks`.`tankID`, `Tanks`.`tankName`, CONCAT('Has ',
FORMAT(`Tanks`.`pumpableVol`, 0), ' bbls of ', 
`Materials`.`materialName`) 
AS tankInfo
FROM `Tanks`
JOIN `Materials`
ON `Tanks`.`materialID` = `Materials`.`materialID`
WHERE `Tanks`.`srcOrDest` = "source"
ORDER BY CAST(SUBSTRING(`Tanks`.`tankName`, 2) AS UNSIGNED);
END //
DELIMITER ;
-- This stored procedure can be used via the following:
CALL sourceTankDropdown;

-- destinationTankDropdown - Dynamic query for dropdown selection
-- Below is to create the sourceTankDropdown as a stored procedure
DELIMITER //
CREATE PROCEDURE `destinationTankDropdown`()
BEGIN
SELECT `Tanks`.`tankID`, `Tanks`.`tankName`, CONCAT('Can fit ',
FORMAT(`Tanks`.`capacity` - `Tanks`.`pumpableVol`, 0), ' bbls of ', 
`Materials`.`materialName`, ' (', FORMAT(`Tanks`.`pumpableVol`,0), ' in tank).' ) 
AS tankInfo
FROM `Tanks`
JOIN `Materials`
ON `Tanks`.`materialID` = `Materials`.`materialID`
WHERE `Tanks`.`srcOrDest` = "destination"
ORDER BY CAST(SUBSTRING(`Tanks`.`tankName`, 2) AS UNSIGNED);
END //
DELIMITER ;
-- This stored procedure can be used via the following:
CALL destinationTankDropdown;

-- tasksDropdown - Dynamic query for dropdown selection
-- Below is to create the tasksDropdown as a stored procedure
DELIMITER //
CREATE PROCEDURE `tasksDropdown`()
BEGIN
SELECT `Tasks`.`taskID`, CONCAT('Task ', `Tasks`.`taskID`, ': Volume: ', FORMAT(`Tasks`.`taskVolume`, 0))
AS taskInfo
FROM `Tasks`
ORDER BY `Tasks`.`taskID` DESC;
END //
DELIMITER ;
-- This stored procedure can be used via the following:
CALL tasksDropdown;



-----------------  BASIC TABLE OPERATIONS (Planned Values)  ----------------
--Create
INSERT INTO Tanks (tankName, tankTypeID, pumpableVol, capacity, srcOrDest, materialID) 
VALUES (:tankName, :tankTypeID_from_dropdown_Input, :pumpableVol, :capacity, :srcOrDest_from_dropdown_Input, :materialID_from_dropdown_Input);
INSERT INTO TankTypes (tankTypeName) VALUES (:tankTypeName);
INSERT INTO Tasks (taskVolume) VALUES (:taskVolume);
INSERT INTO Lineups (taskID, tankID) VALUES (:taskID_from_dropdown_Input, :tankID_from_dropdown_input);
INSERT INTO Materials (materialName) VALUES (:materialName);
INSERT INTO Tests (testNumber, testName, testDescription) VALUES (:testNumber, :testName, :testDescription);
INSERT INTO Specifications (maxLimit, minLimit, testID, materialID) VALUES (:maxLimit, :minLimit, :testID_from_dropdown_Input, materialID_from_dropdown_Input);

--Read
SELECT * FROM Tanks;
SELECT * FROM TankTypes;
SELECT * FROM Tasks;
SELECT * FROM Lineups;
SELECT * FROM Materials;
SELECT * FROM Tests;
SELECT * FROM Specifications;

--Update
UPDATE Tanks SET tankName = :tankName, tankTypeID = :tankTypeID_from_dropdown_Input, pumpableVol = :pumpableVol, capacity = :capacity, srcOrDest = :srcOrDest_from_dropdown_Input, materialID = :materialID_from_dropdown_Input WHERE tankID = :tankID;
UPDATE TankTypes SET tankTypeName = :tankTypeName WHERE tankTypeID = :tankTypeID;
UPDATE Tasks SET taskVolume = :taskVolume WHERE taskID = :taskID_from_dropdown_Input;
UPDATE Lineups SET taskID = :taskID_from_dropdown_Input, tankID = :tankID_from_dropdown_Input WHERE lineupID = :lineupID;
UPDATE Materials SET materialName = :materialName WHERE materialID = :materialID;
UPDATE Tests SET testNumber = :testNumber, testName = :testName, testDescription = :testDescription WHERE testID = :testID;
UPDATE Specifications SET maxLimit = :maxLimit, minLimit = :minLimit, testID = :testID_from_dropdown_Input, materialID = :materialID_from_dropdown_Input WHERE specificationID = :specificationID;

--Delete
DELETE FROM Tanks WHERE tankID = :tankID;
DELETE FROM TankTypes WHERE tankTypeID = :tankTypeID;
DELETE FROM Tasks WHERE taskID = :taskID;
DELETE FROM Lineups WHERE lineupID = :lineupID;
DELETE FROM Materials WHERE materialID = :materialID;
DELETE FROM Tests WHERE testID = :testID;
DELETE FROM Specifications WHERE specificationID = :specificationID;



-----------------  BASIC TABLE OPERATIONS (Real Values)  ----------------
--Create
INSERT INTO Tanks (tankName, tankTypeID, pumpableVol, capacity, srcOrDest, materialID) VALUES ("T202", "13", "44000", "80000", "source", "15");
INSERT INTO TankTypes (tankTypeName) VALUES ("Brick");
INSERT INTO Tasks (taskVolume) VALUES ("33000");
INSERT INTO Lineups (taskID, tankID) VALUES ("11", "15");
INSERT INTO Materials (materialName) VALUES ("Paraxylene");
INSERT INTO Tests (testNumber, testName, testDescription) VALUES ("D5986", "Oxygenates", "Standard Test Method for Determination of Oxygenates, Benzene, Toluene, C8–C12 Aromatics and Total Aromatics in Finished Gasoline by Gas Chromatography/Fourier Transform Infrared Spectroscopy");
INSERT INTO Specifications (maxLimit, minLimit, testID, materialID) VALUES ("1.2", "0.8", "14", "17");

--Read
SELECT * FROM Tanks;
SELECT * FROM TankTypes;
SELECT * FROM Tasks;
SELECT * FROM Lineups;
SELECT * FROM Materials;
SELECT * FROM Tests;
SELECT * FROM Specifications;

--Update
UPDATE Tanks SET tankName = "T404", tankTypeID = "13", pumpableVol = "33333", capacity = "90000", srcOrDest = "source", materialID = "15" WHERE tankID = 16;
UPDATE TankTypes SET tankTypeName = "Plastic" WHERE tankTypeID = 18;
UPDATE Tasks SET taskVolume = "15000" WHERE taskID = 14;
UPDATE Lineups SET taskID = "13", tankID = "15" WHERE lineupID = 22;
UPDATE Materials SET materialName = "Paraxylene" WHERE materialID = 18;
UPDATE Tests SET testNumber = "D2699", testName = "Research Octane Number (RON)", testDescription = "Updated - Standard Test Method for Research Octane Number of Spark Ignition Fuels" WHERE testID = 11;
UPDATE Specifications SET maxLimit = "1.1", minLimit = "0.5", testID = "14", materialID = "15" WHERE specificationID = 19;

--Delete
DELETE FROM Tanks WHERE tankID = 16;  -- (M-to-M relationship deletion Tanks -> Lineups -> Tasks)
DELETE FROM TankTypes WHERE tankTypeID = 18; -- (Can only delete if no Tanks have this TankType)
DELETE FROM Lineups WHERE lineupID = 774; -- (Bridge table entry deletion)
DELETE FROM Tasks WHERE taskID = 11;  -- (M-to-M relationship deletion Tasks -> Lineups)
DELETE FROM Materials WHERE materialID = 14; -- (M-to-M relationship deletion Materials -> Specifications)
DELETE FROM Tests WHERE testID = 18; -- (M-to-M relationship deletion Tests -> Specifications)
DELETE FROM Specifications WHERE specificationID = 19; -- (Bridge table entry deletion)


