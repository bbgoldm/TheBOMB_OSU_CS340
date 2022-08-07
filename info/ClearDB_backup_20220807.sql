CREATE DATABASE  IF NOT EXISTS `heroku_92a67d62f28d117` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `heroku_92a67d62f28d117`;
-- MySQL dump 10.13  Distrib 8.0.29, for macos12 (x86_64)
--
-- Host: us-cdbr-east-06.cleardb.net    Database: heroku_92a67d62f28d117
-- ------------------------------------------------------
-- Server version	5.6.50-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `lineups`
--

DROP TABLE IF EXISTS `lineups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lineups` (
  `lineupID` int(11) NOT NULL AUTO_INCREMENT,
  `taskID` int(11) NOT NULL,
  `tankID` int(11) NOT NULL,
  PRIMARY KEY (`lineupID`),
  KEY `fk_tankID` (`tankID`),
  KEY `fk_taskID` (`taskID`),
  CONSTRAINT `fk_tankID` FOREIGN KEY (`tankID`) REFERENCES `tanks` (`tankID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_taskID` FOREIGN KEY (`taskID`) REFERENCES `tasks` (`taskID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=784 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lineups`
--

LOCK TABLES `lineups` WRITE;
/*!40000 ALTER TABLE `lineups` DISABLE KEYS */;
INSERT INTO `lineups` VALUES (684,182,14),(694,182,11),(704,182,12),(714,205,11),(724,205,13),(734,205,15),(744,11,17),(754,11,13),(764,11,16),(774,11,19);
/*!40000 ALTER TABLE `lineups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `materials`
--

DROP TABLE IF EXISTS `materials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `materials` (
  `materialID` int(11) NOT NULL AUTO_INCREMENT,
  `materialName` varchar(50) NOT NULL,
  PRIMARY KEY (`materialID`),
  UNIQUE KEY `materialName_UNIQUE` (`materialName`)
) ENGINE=InnoDB AUTO_INCREMENT=184 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `materials`
--

LOCK TABLES `materials` WRITE;
/*!40000 ALTER TABLE `materials` DISABLE KEYS */;
INSERT INTO `materials` VALUES (11,'Alkylate'),(17,'Conventional MOGAS'),(14,'Heavy Light Ultraformate'),(13,'Isomerate'),(12,'Light Hydrotreated Naphtha'),(18,'Premium MOGAS'),(16,'Stabilized Heavy Naphtha'),(15,'Ultraformate');
/*!40000 ALTER TABLE `materials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specifications`
--

DROP TABLE IF EXISTS `specifications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specifications` (
  `specificationID` int(11) NOT NULL AUTO_INCREMENT,
  `maxLimit` decimal(14,4) DEFAULT NULL,
  `minLimit` decimal(14,4) DEFAULT NULL,
  `testID` int(11) NOT NULL,
  `materialID` int(11) NOT NULL,
  PRIMARY KEY (`specificationID`),
  KEY `fk_testID_idx` (`testID`),
  KEY `fk_materialID_idx` (`materialID`),
  CONSTRAINT `fk_materialID` FOREIGN KEY (`materialID`) REFERENCES `materials` (`materialID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_testID` FOREIGN KEY (`testID`) REFERENCES `tests` (`testID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=154 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specifications`
--

LOCK TABLES `specifications` WRITE;
/*!40000 ALTER TABLE `specifications` DISABLE KEYS */;
INSERT INTO `specifications` VALUES (11,3.0000,0.0000,13,11),(12,2.0000,0.0000,18,11),(13,72.0000,68.0000,19,11),(14,5.6000,0.0000,12,11),(15,270.0000,187.0000,20,11),(16,54.0000,50.0000,19,12),(17,9.5000,0.0000,12,12),(18,255.0000,110.0000,20,12),(19,1.5000,0.0000,14,12),(20,2.0000,0.0000,16,12),(21,87.0000,83.0000,11,12),(22,10.0000,0.0000,13,12),(23,13.0000,10.0000,12,13),(24,87.0000,82.0000,11,13),(25,3.0000,0.0000,12,14),(26,86.2000,85.8000,11,14),(27,5.0000,0.0000,13,15),(28,104.0000,98.0000,11,15),(29,10.0000,0.0000,13,16),(30,92.0000,87.0000,11,16),(31,10.0000,0.0000,13,17),(32,9.4000,8.4000,12,17),(33,87.0000,85.0000,11,17),(34,5.0000,0.0000,13,18),(35,8.9000,8.1000,12,18),(36,92.0000,90.0000,11,18);
/*!40000 ALTER TABLE `specifications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tanks`
--

DROP TABLE IF EXISTS `tanks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tanks` (
  `tankID` int(11) NOT NULL AUTO_INCREMENT,
  `tankTypeID` int(11) DEFAULT NULL,
  `tankName` varchar(45) NOT NULL,
  `pumpableVol` decimal(14,4) NOT NULL,
  `capacity` decimal(14,4) NOT NULL,
  `srcOrDest` varchar(11) NOT NULL DEFAULT 'source',
  `materialID` int(11) NOT NULL,
  PRIMARY KEY (`tankID`),
  UNIQUE KEY `tankName_UNIQUE` (`tankName`),
  KEY `fk_Tanks_TankTypes_idx` (`tankTypeID`),
  KEY `fk_Tanks_Materials1_idx` (`materialID`),
  CONSTRAINT `fk_Tanks_Materials1` FOREIGN KEY (`materialID`) REFERENCES `materials` (`materialID`) ON UPDATE CASCADE,
  CONSTRAINT `fk_Tanks_TankTypes` FOREIGN KEY (`tankTypeID`) REFERENCES `tanktypes` (`tankTypeID`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=384 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tanks`
--

LOCK TABLES `tanks` WRITE;
/*!40000 ALTER TABLE `tanks` DISABLE KEYS */;
INSERT INTO `tanks` VALUES (11,14,'T27',60000.0000,80000.0000,'source',11),(12,12,'T168',45000.0000,68000.0000,'source',12),(13,15,'T321',15000.0000,25000.0000,'source',15),(14,15,'T90',5000.0000,82000.0000,'destination',17),(15,13,'T82',35000.0000,75000.0000,'destination',18),(16,15,'T74',5000.0000,60000.0000,'source',14),(17,NULL,'T322',37000.0000,70000.0000,'source',16),(18,16,'T1212',20000.0000,45000.0000,'source',13),(19,15,'T105',40000.0000,71000.0000,'destination',17);
/*!40000 ALTER TABLE `tanks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tanktypes`
--

DROP TABLE IF EXISTS `tanktypes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tanktypes` (
  `tankTypeID` int(11) NOT NULL AUTO_INCREMENT,
  `tankTypeName` varchar(45) NOT NULL,
  PRIMARY KEY (`tankTypeID`),
  UNIQUE KEY `tankTypeID_UNIQUE` (`tankTypeID`)
) ENGINE=InnoDB AUTO_INCREMENT=254 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tanktypes`
--

LOCK TABLES `tanktypes` WRITE;
/*!40000 ALTER TABLE `tanktypes` DISABLE KEYS */;
INSERT INTO `tanktypes` VALUES (11,'Bullet'),(12,'Cone Roof'),(13,'External Floating Roof'),(14,'Fixed Roof'),(15,'Internal Floating Roof'),(16,'Sphere');
/*!40000 ALTER TABLE `tanktypes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tasks` (
  `taskID` int(11) NOT NULL AUTO_INCREMENT,
  `taskVolume` decimal(14,4) NOT NULL,
  PRIMARY KEY (`taskID`)
) ENGINE=InnoDB AUTO_INCREMENT=206 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES (11,60000.0000),(182,20000.0000),(205,30000.0000);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tests`
--

DROP TABLE IF EXISTS `tests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tests` (
  `testID` int(11) NOT NULL AUTO_INCREMENT,
  `testNumber` varchar(45) NOT NULL,
  `testName` varchar(45) NOT NULL,
  `testDescription` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`testID`),
  UNIQUE KEY `testNumber_UNIQUE` (`testNumber`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tests`
--

LOCK TABLES `tests` WRITE;
/*!40000 ALTER TABLE `tests` DISABLE KEYS */;
INSERT INTO `tests` VALUES (11,'D2699','RON','Standard Test Method for Research Octane Number of Spark Ignition Fuels'),(12,'D323','RVP','Test for Vapor Pressure of Petroleum Products'),(13,'D5623','Sulfur','Standard Test Method for Sulfur Compounds in Light Petroleum Liquids by Gas Chromatography and Sulfur Selective Detection'),(14,'D130','Cu Strip','Copper Strip Corrosion Test'),(15,'D3606','Benzene','Standard Test Method for Determination of Benzene and Toluene in Spark Ignition Fuels by Gas Chromatography'),(16,'D7667','Ag Strip','Silver Strip Corrosion Test'),(17,'D2700','MON','Standard Test Method for Motor Octane Number of Spark Ignition Fuels'),(18,'D5762','Nitrogen','Standard Test Method for Nitrogen in Liquid Hydrocarbons, Petroleum and Petroleum Products by Boat-Inlet Chemiluminescence'),(19,'D6822','Gravity','Standard Test Method for Density, Relative Density, and API Gravity of Crude Petroleum and Liquid Petroleum Products by Thermohydrometer Method'),(20,'D7213','Sim Dist','Standard Test Method for Boiling Range Distribution of Petroleum Distillates in the Boiling Range from 100 °C to 615 °C by Gas Chromatography'),(21,'D4952','Mercaptans','Standard Test Method for Qualitative Analysis for Active Sulfur Species in Fuels and Solvents (Doctor Test)');
/*!40000 ALTER TABLE `tests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'heroku_92a67d62f28d117'
--
/*!50003 DROP PROCEDURE IF EXISTS `conflictingTasks` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`b7921d2176c042`@`%` PROCEDURE `conflictingTasks`(IN taskIDToCheck INT)
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `destinationTankDropdown` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`b7921d2176c042`@`%` PROCEDURE `destinationTankDropdown`()
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `lineupsInfo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`b7921d2176c042`@`%` PROCEDURE `lineupsInfo`()
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `materialInfo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`b7921d2176c042`@`%` PROCEDURE `materialInfo`(IN materialIDToCheck INT)
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `materialTankInfo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`b7921d2176c042`@`%` PROCEDURE `materialTankInfo`()
BEGIN
	SELECT `Materials`.`materialID`, `Materials`.`materialName`, COUNT(`Tanks`.`materialID`) as count,
		GROUP_CONCAT(`Tanks`.`tankName` ORDER BY CAST(SUBSTRING(`Tanks`.`tankName`, 2) AS UNSIGNED) SEPARATOR ', ' ) AS tankNames
	FROM `Materials`
	LEFT JOIN `Tanks` ON `Tanks`.`materialID` = `Materials`.`materialID`
	GROUP BY `Materials`.`materialName`;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `newTask` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`b7921d2176c042`@`%` PROCEDURE `newTask`(IN volume INT, IN destTankID INT, IN srcTankID1 INT, IN srcTankID2 INT)
BEGIN
START TRANSACTION;
INSERT INTO Tasks (taskVolume) VALUES (volume);
SELECT MAX(`Tasks`.`taskID`) INTO @newTask FROM `Tasks`;
INSERT INTO Lineups (taskID, tankID) VALUES (@newTask, destTankID);
INSERT INTO Lineups (taskID, tankID) VALUES (@newTask, srcTankID1);
INSERT INTO Lineups (taskID, tankID) VALUES (@newTask, srcTankID2);
COMMIT;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sourceTankDropdown` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`b7921d2176c042`@`%` PROCEDURE `sourceTankDropdown`()
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `tanksDropdown` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`b7921d2176c042`@`%` PROCEDURE `tanksDropdown`()
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `tanksInfo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`b7921d2176c042`@`%` PROCEDURE `tanksInfo`()
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
   END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `tankTypesInfo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`b7921d2176c042`@`%` PROCEDURE `tankTypesInfo`()
BEGIN
	SELECT `TankTypes`.`tankTypeID`, `TankTypes`.`tankTypeName`, COUNT(`Tanks`.`tankID`) AS count, 
		GROUP_CONCAT(`Tanks`.`tankName` SEPARATOR ', ') AS `tankNames`
	FROM `TankTypes`
	LEFT JOIN `Tanks` ON `Tanks`.`tankTypeID` = `TankTypes`.`tankTypeID`
	GROUP BY `TankTypes`.`tankTypeID`
	ORDER BY `TankTypes`.`tankTypeID`;
   END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `tankTypesTable` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`b7921d2176c042`@`%` PROCEDURE `tankTypesTable`()
BEGIN
SELECT tanktypes.tankTypeID, tanktypes.tankTypeName, COUNT(tanks.tankTypeID) AS tankCount, group_concat(tanks.tankName) AS tankNames
FROM tanks
RIGHT JOIN tanktypes
ON tanktypes.tankTypeID = tanks.tankTypeID
GROUP BY tankTypeName;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `tasksDropdown` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`b7921d2176c042`@`%` PROCEDURE `tasksDropdown`()
BEGIN
SELECT `Tasks`.`taskID`, CONCAT('Task ', `Tasks`.`taskID`, ': Volume: ', FORMAT(`Tasks`.`taskVolume`, 0))
AS taskInfo
FROM `Tasks`
ORDER BY `Tasks`.`taskID` DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `tasksInfo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`b7921d2176c042`@`%` PROCEDURE `tasksInfo`()
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
   END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `tasksUsingTank` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`b7921d2176c042`@`%` PROCEDURE `tasksUsingTank`(IN tankNumber INT)
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `testInfo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`b7921d2176c042`@`%` PROCEDURE `testInfo`(IN testIDToCheck INT)
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
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-06 23:34:35
