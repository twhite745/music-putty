-- MySQL dump 10.14  Distrib 5.5.33a-MariaDB, for Linux (x86_64)
--
-- Host: localhost    Database: musicPutty
-- ------------------------------------------------------
-- Server version	5.6.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `album`
--

DROP TABLE IF EXISTS `album`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `album` (
  `aID` int(11) NOT NULL AUTO_INCREMENT,
  `bID` int(11) NOT NULL,
  `aName` varchar(30) DEFAULT NULL,
  `aPic` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`aID`),
  KEY `a_FK_band` (`bID`),
  CONSTRAINT `a_FK_band` FOREIGN KEY (`bID`) REFERENCES `band` (`bID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `album`
--

LOCK TABLES `album` WRITE;
/*!40000 ALTER TABLE `album` DISABLE KEYS */;
INSERT INTO `album` VALUES (1,1,'OK Computer',NULL),(2,1,'Kid A',NULL),(3,2,'The Spine',NULL),(4,3,'Simple Things',NULL),(5,3,'When it Falls',NULL);
/*!40000 ALTER TABLE `album` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `band`
--

DROP TABLE IF EXISTS `band`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `band` (
  `bID` int(11) NOT NULL AUTO_INCREMENT,
  `bName` varchar(30) DEFAULT NULL,
  `sampleID` int(11) DEFAULT NULL,
  `bPic` varchar(50) DEFAULT NULL,
  `location` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`bID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `band`
--

LOCK TABLES `band` WRITE;
/*!40000 ALTER TABLE `band` DISABLE KEYS */;
INSERT INTO `band` VALUES (1,'Radiohead',1,'/media/shared-sadness.png','SLO, CA'),(2,'They Might Be Giants',8,'/media/band.png','beavertown'),(3,'Zero7',15,NULL,'SLO, CA');
/*!40000 ALTER TABLE `band` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `band_member`
--

DROP TABLE IF EXISTS `band_member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `band_member` (
  `bID` int(11) NOT NULL,
  `mID` int(11) NOT NULL,
  KEY `bID` (`bID`),
  KEY `mID` (`mID`),
  CONSTRAINT `band_member_ibfk_1` FOREIGN KEY (`bID`) REFERENCES `band` (`bID`),
  CONSTRAINT `band_member_ibfk_2` FOREIGN KEY (`mID`) REFERENCES `member` (`mID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `band_member`
--

LOCK TABLES `band_member` WRITE;
/*!40000 ALTER TABLE `band_member` DISABLE KEYS */;
/*!40000 ALTER TABLE `band_member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `band_merchandise`
--

DROP TABLE IF EXISTS `band_merchandise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `band_merchandise` (
  `bID` int(11) NOT NULL,
  `name` varchar(15) DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  `price` decimal(7,2) DEFAULT NULL,
  KEY `fk_merchandise_bID` (`bID`),
  CONSTRAINT `fk_merchandise_bID` FOREIGN KEY (`bID`) REFERENCES `band` (`bID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `band_merchandise`
--

LOCK TABLES `band_merchandise` WRITE;
/*!40000 ALTER TABLE `band_merchandise` DISABLE KEYS */;
/*!40000 ALTER TABLE `band_merchandise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `band_thankYou`
--

DROP TABLE IF EXISTS `band_thankYou`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `band_thankYou` (
  `bID` int(11) NOT NULL,
  `name` varchar(15) DEFAULT NULL,
  `price` decimal(7,2) DEFAULT NULL,
  `deliveryDate` date DEFAULT NULL,
  `description` varchar(100) DEFAULT NULL,
  KEY `fk_thankYous_bID` (`bID`),
  CONSTRAINT `fk_thankYous_bID` FOREIGN KEY (`bID`) REFERENCES `band` (`bID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `band_thankYou`
--

LOCK TABLES `band_thankYou` WRITE;
/*!40000 ALTER TABLE `band_thankYou` DISABLE KEYS */;
/*!40000 ALTER TABLE `band_thankYou` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `band_tourDate`
--

DROP TABLE IF EXISTS `band_tourDate`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `band_tourDate` (
  `bID` int(11) NOT NULL,
  `date` date DEFAULT NULL,
  `location` varchar(20) DEFAULT NULL,
  `venue` varchar(20) DEFAULT NULL,
  `tag_over21` bit(1) DEFAULT NULL,
  `tag_free` bit(1) DEFAULT NULL,
  `info` varchar(100) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  KEY `fk_tourDates_bID` (`bID`),
  CONSTRAINT `fk_tourDates_bID` FOREIGN KEY (`bID`) REFERENCES `band` (`bID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `band_tourDate`
--

LOCK TABLES `band_tourDate` WRITE;
/*!40000 ALTER TABLE `band_tourDate` DISABLE KEYS */;
/*!40000 ALTER TABLE `band_tourDate` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `member` (
  `mID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(15) DEFAULT NULL,
  `password` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`mID`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
INSERT INTO `member` VALUES (50,'tacho','password'),(51,'asdfasdf','asdfasdf'),(52,'arash2gmail.com','asdfasdf'),(53,'nam3','dianan1'),(54,'nam32','dianan1'),(55,'anamc','dianan1'),(56,'ana2','dianan1'),(57,'ArashIsWhale','blarg');
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project` (
  `bID` int(11) NOT NULL,
  `proj_title` varchar(20) DEFAULT NULL,
  `proj_description` varchar(100) DEFAULT NULL,
  `stats_supporters` int(11) DEFAULT NULL,
  `stats_funded` int(11) DEFAULT NULL,
  `stats_goal` int(11) DEFAULT NULL,
  `stats_days` int(11) DEFAULT NULL,
  KEY `fk_bID` (`bID`),
  CONSTRAINT `fk_bID` FOREIGN KEY (`bID`) REFERENCES `band` (`bID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_update`
--

DROP TABLE IF EXISTS `project_update`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_update` (
  `bID` int(11) NOT NULL,
  `updates` varchar(100) DEFAULT NULL,
  KEY `fk_updates_bID` (`bID`),
  CONSTRAINT `fk_updates_bID` FOREIGN KEY (`bID`) REFERENCES `band` (`bID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_update`
--

LOCK TABLES `project_update` WRITE;
/*!40000 ALTER TABLE `project_update` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_update` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `song`
--

DROP TABLE IF EXISTS `song`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `song` (
  `sID` int(11) NOT NULL AUTO_INCREMENT,
  `aID` int(11) NOT NULL,
  `bID` int(11) NOT NULL,
  `sName` varchar(30) DEFAULT NULL,
  `sPath` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`sID`),
  KEY `FK_band` (`bID`),
  KEY `FK_album` (`aID`),
  CONSTRAINT `FK_album` FOREIGN KEY (`aID`) REFERENCES `album` (`aID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `FK_band` FOREIGN KEY (`bID`) REFERENCES `band` (`bID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song`
--

LOCK TABLES `song` WRITE;
/*!40000 ALTER TABLE `song` DISABLE KEYS */;
INSERT INTO `song` VALUES (1,1,1,'Paranoid Android','/media/01%20Only%20Shallow.mp3'),(2,1,1,'Karma Police',NULL),(3,1,1,'Electioneering',NULL),(4,1,1,'Lucky',NULL),(5,2,1,'Everything in its Right Place',NULL),(6,2,1,'Treefingers',NULL),(7,2,1,'Idioteque',NULL),(8,3,2,'Birdhouse in Your Soul','/media/02%20Loomer.mp3'),(9,3,2,'The Statue got me High',NULL),(10,3,2,'Dont Lets Start',NULL),(11,4,3,'Out of Town',NULL),(12,4,3,'This World',NULL),(13,4,3,'Likufanele',NULL),(14,4,3,'End Theme',NULL),(15,5,3,'Warm Sound','/media/03 Touched.mp3'),(16,5,3,'Home',NULL),(17,5,3,'Summersault',NULL);
/*!40000 ALTER TABLE `song` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `song_tag`
--

DROP TABLE IF EXISTS `song_tag`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `song_tag` (
  `sID` int(11) DEFAULT NULL,
  `tag` varchar(15) DEFAULT NULL,
  `strength` int(11) DEFAULT NULL,
  KEY `sID` (`sID`),
  CONSTRAINT `song_tag_ibfk_1` FOREIGN KEY (`sID`) REFERENCES `song` (`sID`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `song_tag`
--

LOCK TABLES `song_tag` WRITE;
/*!40000 ALTER TABLE `song_tag` DISABLE KEYS */;
INSERT INTO `song_tag` VALUES (1,'Electronic',4),(1,'Rock',1),(2,'Electronic',8),(3,'Electronic',6),(3,'Rock',4),(4,'Electronic',2),(4,'Rock',6),(5,'Rock',7),(6,'Rock',8),(7,'Rock',10),(5,'Electronic',17),(6,'Instrumental',4),(6,'Ambience',4),(7,'Electronic',14),(8,'Rock',14),(9,'Rock',14),(10,'Rock',15),(11,'Rock',1),(11,'Acid Jazz',3),(11,'Electronic',3),(11,'Rock',2),(11,'Electronic',4),(11,'Acid Jazz',1),(11,'Electronic',3),(11,'Acid Jazz',1),(11,'Rock',3),(12,'Rock',3),(12,'Acid Jazz',3),(13,'Acid Jazz',2),(14,'Instrumental',5),(14,'Acid Jazz',4),(15,'Acid Jazz',8),(16,'Rock',2),(16,'Electronic',6),(16,'Acid Jazz',7),(17,'Acid Jazz',7),(17,'Electronic',2),(17,'Rock',1);
/*!40000 ALTER TABLE `song_tag` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2013-10-12 13:22:50
