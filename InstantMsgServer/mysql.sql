CREATE DATABASE  IF NOT EXISTS `instant_msg` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `instant_msg`;
-- MySQL dump 10.13  Distrib 5.6.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: instant_msg
-- ------------------------------------------------------
-- Server version	5.6.24-log

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
-- Table structure for table `friends`
--

DROP TABLE IF EXISTS `friends`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `friends` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `providerId` int(10) unsigned NOT NULL DEFAULT '0',
  `requestId` int(10) unsigned NOT NULL DEFAULT '0',
  `status` binary(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Index_3` (`providerId`,`requestId`),
  KEY `Index_2` (`providerId`,`requestId`,`status`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1 COMMENT='providerId is the Id of the users who wish to be friend with';
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `friends`
--

LOCK TABLES `friends` WRITE;
/*!40000 ALTER TABLE `friends` DISABLE KEYS */;
INSERT INTO `friends` VALUES (1,8,7,'1'),(2,9,7,'1');
/*!40000 ALTER TABLE `friends` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `fromuid` int(255) NOT NULL,
  `touid` int(255) NOT NULL,
  `sentdt` datetime NOT NULL,
  `read` tinyint(1) NOT NULL DEFAULT '0',
  `readdt` datetime DEFAULT NULL,
  `content` longtext CHARACTER SET utf8 COLLATE utf8_bin NOT NULL,
  `type` varchar(10) NOT NULL DEFAULT 'text',
  PRIMARY KEY (`id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,7,8,'2015-05-29 12:03:26',1,'2015-05-29 12:03:29','wtf','0'),(2,8,7,'2015-05-29 12:03:42',1,'2015-05-29 12:03:45','yes fuck ne','0'),(3,8,7,'2015-05-29 13:05:12',1,'2015-05-29 13:05:14','pk','0'),(4,8,7,'2015-05-29 13:08:08',1,'2015-05-29 13:08:11','guck me','0'),(5,7,8,'2015-05-29 13:08:24',1,'2015-05-29 13:08:25','kkkkkllkk','0'),(6,9,7,'2015-05-29 13:09:41',1,'2015-05-29 13:09:41','yoooo','0'),(7,7,9,'2015-05-29 13:09:58',1,'2015-05-29 13:10:01','wtf man','0'),(8,7,9,'2015-05-29 13:11:29',1,'2015-05-29 13:11:31','dhjsjgsgs','0'),(9,9,7,'2015-05-29 13:25:52',1,'2015-05-29 13:25:53','okkkok','0'),(10,7,9,'2015-05-29 13:26:20',1,'2015-05-29 13:26:22','wtffff','0'),(11,7,9,'2015-05-29 13:57:25',1,'2015-05-29 13:57:27','yyy','0'),(12,7,9,'2015-05-29 13:57:29',1,'2015-05-29 13:57:30','好久了无数','0'),(13,7,9,'2015-05-29 13:57:51',1,'2015-05-29 13:57:54','頂你','0'),(14,9,7,'2015-05-29 13:57:59',1,'2015-05-29 13:58:02','好啊','0'),(15,8,7,'2015-05-29 17:06:00',1,'2015-05-29 17:06:01','pk','0'),(16,9,7,'2015-05-29 18:58:11',1,'2015-05-29 18:58:15','yo','0'),(17,7,9,'2015-05-29 18:58:39',1,'2015-05-29 18:58:40','wrf man','0'),(18,8,7,'2015-05-29 19:01:46',1,'2015-05-29 19:01:49','hihihi','0'),(19,7,8,'2015-05-29 19:04:06',1,'2015-05-29 19:04:07','頂你個肺','0'),(20,7,8,'2015-05-29 19:04:31',1,'2015-05-29 19:04:31','吹咩','0'),(21,8,7,'2015-05-29 19:04:34',1,'2015-05-29 19:04:37','768867','0'),(22,7,8,'2015-05-29 19:04:40',1,'2015-05-29 19:04:40','好了！','0'),(23,8,7,'2015-05-29 19:07:33',1,'2015-05-29 19:07:35','你好靚仔','0'),(24,7,8,'2015-05-29 19:08:00',1,'2015-05-29 19:08:01','叼你咪','0'),(25,8,7,'2015-05-29 19:17:28',1,'2015-05-29 19:17:28','好嘢啊','0'),(26,8,7,'2015-05-29 19:21:03',1,'2015-05-29 19:21:05','土','0'),(27,7,8,'2015-05-29 19:21:20',1,'2015-05-29 19:21:23','叼','0'),(28,8,7,'2015-05-29 19:22:04',1,'2015-05-29 19:22:06','业你想','0'),(29,8,7,'2015-05-29 19:22:54',1,'2015-05-29 19:23:16','好啊呀你還','0'),(30,8,7,'2015-05-29 19:23:32',1,'2015-05-29 19:23:36','啊','0'),(31,8,7,'2015-05-29 19:24:37',1,'2015-05-29 19:24:37','啦啦！了！','0'),(32,7,8,'2015-05-29 19:24:59',1,'2015-05-29 19:24:59','我顶','0'),(33,8,7,'2015-06-01 11:46:22',1,'2015-06-01 11:46:25','靚仔','0'),(34,7,8,'2015-06-01 11:47:09',1,'2015-06-01 11:47:10','正啊','0'),(35,7,8,'2015-06-01 11:48:09',1,'2015-06-01 11:48:10','頂你個肺','0'),(36,7,8,'2015-06-01 11:48:41',1,'2015-06-01 11:48:43','乜乜，，我國','0'),(37,7,8,'2015-06-01 11:48:52',1,'2015-06-01 11:48:52','叼','0'),(38,7,8,'2015-06-01 11:50:49',1,'2015-06-01 11:50:49','4了5了？不555','0'),(39,8,7,'2015-06-01 11:51:18',1,'2015-06-01 11:51:18','乜七','0'),(40,8,7,'2015-06-01 12:36:54',1,'2015-06-01 12:37:22','yoooop','0'),(41,7,8,'2015-06-01 13:18:03',1,'2015-06-01 13:18:19','yje','0'),(42,8,7,'2015-06-01 13:18:29',1,'2015-06-01 13:18:31','good','0'),(43,7,8,'2015-06-01 13:25:20',1,'2015-06-01 15:28:34','giid','0'),(44,7,8,'2015-06-01 13:52:11',1,'2015-06-01 15:28:38','yy','0'),(45,7,8,'2015-06-01 14:04:24',1,'2015-06-01 15:28:38','tg','0'),(46,7,8,'2015-06-01 15:28:47',1,'2015-06-01 15:28:50','fuck','0'),(47,8,7,'2015-06-01 16:25:51',1,'2015-06-01 16:25:57','cool','text'),(48,8,7,'2015-06-01 16:26:44',1,'2015-06-01 16:26:45','ij','text'),(49,8,7,'2015-06-01 16:27:59',1,'2015-06-01 16:28:00','hjk','text'),(50,8,7,'2015-06-01 16:28:25',1,'2015-06-01 16:28:27','787888','text');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sysparam`
--

DROP TABLE IF EXISTS `sysparam`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sysparam` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `attribute` varchar(45) NOT NULL,
  `value` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sysparam`
--

LOCK TABLES `sysparam` WRITE;
/*!40000 ALTER TABLE `sysparam` DISABLE KEYS */;
INSERT INTO `sysparam` VALUES (1,'IMAGEPATH','./images/'),(2,'AUDIOPATH','./audios/');
/*!40000 ALTER TABLE `sysparam` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL DEFAULT '',
  `password` varchar(32) NOT NULL DEFAULT '',
  `email` varchar(45) NOT NULL DEFAULT '',
  `date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `authenticationTime` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `userKey` varchar(32) NOT NULL DEFAULT '',
  `IP` varchar(45) NOT NULL DEFAULT '',
  `port` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Index_2` (`username`),
  KEY `Index_3` (`authenticationTime`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (7,'james','96e79218965eb72c92a549dd5a330112','james.kuang@ariagp.com','0000-00-00 00:00:00',0,'2015-06-01 19:00:15','','::ffff:192.168.33.62',15145),(8,'jason','96e79218965eb72c92a549dd5a330112','jason.chu@ariagp.com','0000-00-00 00:00:00',0,'2015-06-01 18:29:37','','::ffff:192.168.33.75',15145),(9,'jacob','96e79218965eb72c92a549dd5a330112','jacob.wu@ariagp.com','0000-00-00 00:00:00',0,'2015-05-29 18:59:11','','::ffff:192.168.33.51',15145);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2015-06-01 19:08:07
