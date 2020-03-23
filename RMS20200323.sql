-- phpMyAdmin SQL Dump
-- version 5.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 23, 2020 at 10:35 AM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.3.14

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `arcm`
--
CREATE DATABASE IF NOT EXISTS `arcm` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `arcm`;

-- --------------------------------------------------------

--
-- Table structure for table `additionalsubmissiondocuments`
--

CREATE TABLE `additionalsubmissiondocuments` (
  `ID` int(5) NOT NULL,
  `ApplicationID` int(11) DEFAULT NULL,
  `Description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `FileName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FilePath` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `Create_at` datetime NOT NULL,
  `CreatedBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Deleted` tinyint(1) NOT NULL,
  `DeletedBY` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted_At` datetime(6) DEFAULT NULL,
  `Category` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Confidential` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=2340 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `additionalsubmissiondocuments`
--

INSERT INTO `additionalsubmissiondocuments` (`ID`, `ApplicationID`, `Description`, `FileName`, `FilePath`, `Create_at`, `CreatedBy`, `Deleted`, `DeletedBY`, `Deleted_At`, `Category`, `Confidential`) VALUES
(5, 2, 'Tender Document', '1572867253078-jonaa3.PNG', 'http://localhost:3001/Documents', '2019-11-04 14:34:13', 'TestUser', 1, NULL, NULL, 'PE', 0),
(6, 2, 'Tender Document', '1572868285983-7ef2abea3c71e54f6017747184a34ba7.png', 'http://localhost:3001/Documents', '2019-11-04 14:51:26', 'TestUser', 1, NULL, NULL, 'PE', 1),
(7, 2, 'Tender Document', '1572869255732-Accepted.png', 'http://localhost:3001/Documents', '2019-11-04 15:07:35', 'TestUser', 0, NULL, NULL, 'PE', 0),
(8, 2, 'Tender Document', '1572869307589-Accepted.png', 'http://localhost:3001/Documents', '2019-11-04 15:08:28', 'TestUser', 0, NULL, NULL, 'PE', 0),
(9, 4, 'Tender Document', '1572874912058-admin.png', 'http://localhost:3001/Documents', '2019-11-04 16:41:52', 'Applicant', 1, NULL, NULL, 'Applicant', 1),
(10, 4, 'Tender Document', '1572874916840-admin.png', 'http://localhost:3001/Documents', '2019-11-04 16:41:57', 'Applicant', 0, NULL, NULL, 'Applicant', 1),
(11, 7, 'Evidence', '1573578378551-CD Label.jpg', 'http://74.208.157.60:3001/Documents', '2019-11-12 17:06:18', 'P0123456788X', 0, NULL, NULL, 'Applicant', 0);

-- --------------------------------------------------------

--
-- Table structure for table `additionalsubmissions`
--

CREATE TABLE `additionalsubmissions` (
  `ID` int(5) NOT NULL,
  `ApplicationID` int(11) DEFAULT NULL,
  `Description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `FileName` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FilePath` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '0',
  `Create_at` datetime NOT NULL,
  `CreatedBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Deleted` tinyint(1) NOT NULL,
  `DeletedBY` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted_At` datetime(6) DEFAULT NULL,
  `Category` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=2340 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `additionalsubmissions`
--

INSERT INTO `additionalsubmissions` (`ID`, `ApplicationID`, `Description`, `FileName`, `FilePath`, `Create_at`, `CreatedBy`, `Deleted`, `DeletedBY`, `Deleted_At`, `Category`) VALUES
(1, 7, '<p>Review against the decision of the Principal Secretary, State Department of Irrigation and the award of Tender No: MALF &amp; I/SDI/OT/04/2018-2019 for Procurement of Construction of Kaigunji Irrigation Project Phase II Section One.</p>\n', '1573578378551-CD Label.jpg', 'http://74.208.157.60:3001/Documents', '2019-11-12 17:06:35', 'P0123456788X', 0, NULL, NULL, 'Applicant'),
(2, 7, '<p>Review against the decision of the Principal Secretary, State Department of Irrigation and the award of Tender No: MALF &amp; I/SDI/OT/04/2018-2019 for Procurement of Construction of Kaigunji Irrigation Project Phase II Section One.</p>\n', '1573578378551-CD Label.jpg', 'http://74.208.157.60:3001/Documents', '2019-11-12 17:06:56', 'P0123456788X', 0, NULL, NULL, 'Applicant');

-- --------------------------------------------------------

--
-- Table structure for table `adjournment`
--

CREATE TABLE `adjournment` (
  `ID` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  `Applicant` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Reason` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `DecisionDate` date DEFAULT NULL,
  `Status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Created_At` date NOT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Approver` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ApprovalRemarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `adjournmentdocuments`
--

CREATE TABLE `adjournmentdocuments` (
  `ID` int(11) NOT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Description` varchar(155) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Path` varchar(105) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Filename` varchar(105) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `applicants`
--

CREATE TABLE `applicants` (
  `ID` bigint(20) NOT NULL,
  `ApplicantCode` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PEType` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `County` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Location` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `POBox` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PostalCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Town` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mobile` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Telephone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Logo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Website` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL,
  `RegistrationDate` datetime DEFAULT NULL,
  `PIN` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RegistrationNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=5461 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `applicants`
--

INSERT INTO `applicants` (`ID`, `ApplicantCode`, `Name`, `PEType`, `County`, `Location`, `POBox`, `PostalCode`, `Town`, `Mobile`, `Telephone`, `Email`, `Logo`, `Website`, `Created_By`, `Created_At`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_By`, `Deleted_At`, `RegistrationDate`, `PIN`, `RegistrationNo`) VALUES
(8, 'AP-17', 'JAMES SUPPLIERS LTD', '', '001', 'Nairobi', '00101', '00101', 'Nairobi', '0122719412', '0122719412', 'KEREBEI@HOTMAIL.COM', '', 'www.wilcom.co.ke', 'P0123456788X', '2019-11-11 15:41:19', NULL, NULL, 0, NULL, NULL, '2000-12-08 00:00:00', 'P0123456788X', 'C1887432'),
(9, 'AP-18', 'APPLICANT LTD', '', '001', 'Nairobi', '123', '00100', 'NAIROBI', '0722114567', '0722114567', 'info@wilcom.co.ke', '1573656756638-logoLister.png', 'https://www.Chemei.go.ke', 'P09875345W', '2019-11-13 14:56:01', '2019-11-19 12:40:06', 'admin', 0, NULL, NULL, '2019-10-01 00:00:00', 'P09875345W', '12345'),
(10, 'AP-19', 'CMC MOTORS CORPORATION', '', '047', 'LUSAKA ROAD', '1234', '00101', 'NAIROBI', '0705128595', '0705128595', 'judiejuma@gmail.com', '', 'CMC.CO.KE', 'P123456879Q', '2019-11-15 10:39:06', NULL, NULL, 0, NULL, NULL, '1980-08-12 00:00:00', 'P123456879Q', 'C1234568');

--
-- Triggers `applicants`
--
DELIMITER $$
CREATE TRIGGER `SaveCopy` AFTER INSERT ON `applicants` FOR EACH ROW INSERT INTO `applicantshistory`( `ApplicantCode`, `Name`, `County`, `Location`, `POBox`, `PostalCode`, `Town`, `Mobile`, `Telephone`, `Email`, `Logo`, `Website`, `Created_By`, `Created_At`) 
VALUES (new.ApplicantCode,new.Name,new.County,new.Location,new.POBox,new.PostalCode,new.Town,new.Mobile,new.Telephone,new.Email,new.Logo,new.Website,new.Created_By,new.Created_At)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `UpdateRecord` AFTER UPDATE ON `applicants` FOR EACH ROW INSERT INTO `applicantshistory`( `ApplicantCode`, `Name`, `County`, `Location`, `POBox`, `PostalCode`, `Town`, `Mobile`, `Telephone`, `Email`, `Logo`, `Website`, `Created_By`, `Created_At`) 
VALUES (old.ApplicantCode,old.Name,old.County,old.Location,old.POBox,old.PostalCode,old.Town,old.Mobile,old.Telephone,old.Email,old.Logo,old.Website,old.Created_By,old.Created_At)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `applicantshistory`
--

CREATE TABLE `applicantshistory` (
  `ID` bigint(20) NOT NULL,
  `ApplicantCode` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PEType` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `County` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Location` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `POBox` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PostalCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Town` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mobile` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Telephone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Logo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Website` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=3276 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `applicantshistory`
--

INSERT INTO `applicantshistory` (`ID`, `ApplicantCode`, `Name`, `PEType`, `County`, `Location`, `POBox`, `PostalCode`, `Town`, `Mobile`, `Telephone`, `Email`, `Logo`, `Website`, `Created_By`, `Created_At`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_By`, `Deleted_At`) VALUES
(1, 'AP-17', 'JAMES SUPPLIERS LTD', '', '001', 'Nairobi', '00101', '00101', 'Nairobi', '0122719412', '0122719412', 'KEREBEI@HOTMAIL.COM', '', 'www.wilcom.co.ke', 'P0123456788X', '2019-11-11 15:41:19', NULL, NULL, NULL, NULL, NULL),
(2, 'AP-18', 'APPLICANT LTD', '', '001', 'Nairobi', '123', '00100', 'NAIROBI', '0722114567', '0722114567', 'info@wilcom.co.ke', '1573656756638-logoLister.png', '', 'P09875345W', '2019-11-13 14:56:01', NULL, NULL, NULL, NULL, NULL),
(3, 'AP-19', 'CMC MOTORS CORPORATION', '', '047', 'LUSAKA ROAD', '1234', '00101', 'NAIROBI', '0705128595', '0705128595', 'judiejuma@gmail.com', '', 'CMC.CO.KE', 'P123456879Q', '2019-11-15 10:39:06', NULL, NULL, NULL, NULL, NULL),
(4, 'AP-18', 'APPLICANT LTD', '', '001', 'Nairobi', '123', '00100', 'NAIROBI', '0722114567', '0722114567', 'info@wilcom.co.ke', '1573656756638-logoLister.png', '', 'P09875345W', '2019-11-13 14:56:01', NULL, NULL, NULL, NULL, NULL),
(5, 'AP-18', 'APPLICANT LTD', '', '001', 'Nairobi', '123', '00100', 'NAIROBI', '0722114567', '0722114567', 'info@wilcom.co.ke', '1573656756638-logoLister.png', 'https://www.Chemei.go.ke', 'P09875345W', '2019-11-13 14:56:01', NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `applicationapprovalcontacts`
--

CREATE TABLE `applicationapprovalcontacts` (
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mobile` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Msg` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `applicationapprovalcontacts`
--

INSERT INTO `applicationapprovalcontacts` (`Name`, `Email`, `Mobile`, `Msg`, `ApplicationNo`) VALUES
('STATE DEPARTMENT OF INTERIOR ', 'judyjay879@gmail.com', '0733299665', 'PE', '18 OF 2019');

-- --------------------------------------------------------

--
-- Table structure for table `applicationdocuments`
--

CREATE TABLE `applicationdocuments` (
  `ID` bigint(20) NOT NULL,
  `ApplicationID` int(100) NOT NULL,
  `Description` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FileName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DateUploaded` datetime NOT NULL,
  `Path` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(4) DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Confidential` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB AVG_ROW_LENGTH=2048 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `applicationdocuments`
--

INSERT INTO `applicationdocuments` (`ID`, `ApplicationID`, `Description`, `FileName`, `DateUploaded`, `Path`, `Created_By`, `Created_At`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_At`, `Deleted_By`, `Confidential`) VALUES
(1, 1, 'Form of Tender', '1573487662790-FORM OF TENDER.docx', '2019-11-11 15:54:23', 'http://74.208.157.60:3001/Documents', 'P0123456788X', '2019-11-11 15:54:23', NULL, NULL, 0, NULL, NULL, 0),
(2, 1, 'Price Schedule', '1573487715016-Price Schedule.pdf', '2019-11-11 15:55:15', 'http://74.208.157.60:3001/Documents', 'P0123456788X', '2019-11-11 15:55:15', NULL, NULL, 0, NULL, NULL, 1),
(3, 5, 'Tender document', '1573546570554-rptSalesSummaryReportcs.pdf', '2019-11-12 11:16:10', 'http://74.208.157.60:3001/Documents', 'P0123456788X', '2019-11-12 11:16:10', NULL, NULL, 0, NULL, NULL, 0),
(4, 5, 'document', '1573546697849-6 OF 2019.pdf', '2019-11-12 11:18:18', 'http://74.208.157.60:3001/Documents', 'P0123456788X', '2019-11-12 11:18:18', NULL, NULL, 0, NULL, NULL, 0),
(5, 10, 'Tender document', '1573632895965-6 OF 2019.pdf', '2019-11-13 11:14:56', 'http://74.208.157.60:3001/Documents', 'P0123456788X', '2019-11-13 11:14:56', NULL, NULL, 0, NULL, NULL, 0),
(6, 15, 'Form of tender', '1573665453738-6 OF 2019.pdf', '2019-11-13 17:17:34', 'http://74.208.157.60:3001/Documents', 'P09875345W', '2019-11-13 17:17:34', NULL, NULL, 0, NULL, NULL, 1),
(7, 17, 'Form of Tender', '1573815727889-Online Store.vsdx', '2019-11-15 11:02:08', 'http://74.208.157.60:3001/Documents', 'P123456879Q', '2019-11-15 11:02:08', NULL, NULL, 0, NULL, NULL, 0),
(8, 17, 'Tender Document', '1573815758130-DECISION 54 OF 2019 KAREN Infrastructure Vs SD Irrigation.pdf', '2019-11-15 11:02:38', 'http://74.208.157.60:3001/Documents', 'P123456879Q', '2019-11-15 11:02:38', NULL, NULL, 0, NULL, NULL, 1);

--
-- Triggers `applicationdocuments`
--
DELIMITER $$
CREATE TRIGGER `OnSave` AFTER INSERT ON `applicationdocuments` FOR EACH ROW INSERT INTO `applicationdocumentshistory`( `ApplicationID`,  `Description`, `FileName`, `DateUploaded`, `Path`, `Created_By`, `Created_At`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_At`, `Deleted_By`) 
VALUES (new.ApplicationID,new.Description,new.FileName,new.DateUploaded,new.Path,new.Created_By,new.Created_At,new.Updated_At,new.Updated_By,new.Deleted,new.Deleted_At,new.Deleted_By)
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `OnUpdate` AFTER UPDATE ON `applicationdocuments` FOR EACH ROW INSERT INTO `applicationdocumentshistory`( `ApplicationID`, `Description`, `FileName`, `DateUploaded`, `Path`, `Created_By`, `Created_At`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_At`, `Deleted_By`) 
VALUES (old.ApplicationID,old.Description,old.FileName,old.DateUploaded,new.Path,old.Created_By,old.Created_At,old.Updated_At,old.Updated_By,old.Deleted,old.Deleted_At,old.Deleted_By)
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `applicationdocumentshistory`
--

CREATE TABLE `applicationdocumentshistory` (
  `ID` bigint(20) NOT NULL,
  `ApplicationID` int(100) NOT NULL,
  `DocType` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Description` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FileName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DateUploaded` datetime NOT NULL,
  `Path` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(4) DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=2048 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `applicationdocumentshistory`
--

INSERT INTO `applicationdocumentshistory` (`ID`, `ApplicationID`, `DocType`, `Description`, `FileName`, `DateUploaded`, `Path`, `Created_By`, `Created_At`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_At`, `Deleted_By`) VALUES
(1, 1, NULL, 'Form of Tender', '1573487662790-FORM OF TENDER.docx', '2019-11-11 15:54:23', 'http://74.208.157.60:3001/Documents', 'P0123456788X', '2019-11-11 15:54:23', NULL, NULL, 0, NULL, NULL),
(2, 1, NULL, 'Price Schedule', '1573487715016-Price Schedule.pdf', '2019-11-11 15:55:15', 'http://74.208.157.60:3001/Documents', 'P0123456788X', '2019-11-11 15:55:15', NULL, NULL, 0, NULL, NULL),
(3, 5, NULL, 'Tender document', '1573546570554-rptSalesSummaryReportcs.pdf', '2019-11-12 11:16:10', 'http://74.208.157.60:3001/Documents', 'P0123456788X', '2019-11-12 11:16:10', NULL, NULL, 0, NULL, NULL),
(4, 5, NULL, 'document', '1573546697849-6 OF 2019.pdf', '2019-11-12 11:18:18', 'http://74.208.157.60:3001/Documents', 'P0123456788X', '2019-11-12 11:18:18', NULL, NULL, 0, NULL, NULL),
(5, 10, NULL, 'Tender document', '1573632895965-6 OF 2019.pdf', '2019-11-13 11:14:56', 'http://74.208.157.60:3001/Documents', 'P0123456788X', '2019-11-13 11:14:56', NULL, NULL, 0, NULL, NULL),
(6, 15, NULL, 'Form of tender', '1573665453738-6 OF 2019.pdf', '2019-11-13 17:17:34', 'http://74.208.157.60:3001/Documents', 'P09875345W', '2019-11-13 17:17:34', NULL, NULL, 0, NULL, NULL),
(7, 17, NULL, 'Form of Tender', '1573815727889-Online Store.vsdx', '2019-11-15 11:02:08', 'http://74.208.157.60:3001/Documents', 'P123456879Q', '2019-11-15 11:02:08', NULL, NULL, 0, NULL, NULL),
(8, 17, NULL, 'Tender Document', '1573815758130-DECISION 54 OF 2019 KAREN Infrastructure Vs SD Irrigation.pdf', '2019-11-15 11:02:38', 'http://74.208.157.60:3001/Documents', 'P123456879Q', '2019-11-15 11:02:38', NULL, NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `applicationfees`
--

CREATE TABLE `applicationfees` (
  `ID` bigint(20) NOT NULL,
  `ApplicationID` bigint(20) NOT NULL,
  `EntryType` int(11) DEFAULT NULL,
  `AmountDue` float DEFAULT NULL,
  `RefNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `BillDate` datetime NOT NULL,
  `AmountPaid` float DEFAULT NULL,
  `PaidDate` datetime DEFAULT NULL,
  `PaymentRef` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PaymentMode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(4) DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CalculatedAmount` float DEFAULT NULL,
  `FeesStatus` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ApprovedBy` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DateApproved` datetime DEFAULT NULL,
  `Narration` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=468 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `applicationfees`
--

INSERT INTO `applicationfees` (`ID`, `ApplicationID`, `EntryType`, `AmountDue`, `RefNo`, `BillDate`, `AmountPaid`, `PaidDate`, `PaymentRef`, `PaymentMode`, `Created_By`, `Created_At`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_At`, `Deleted_By`, `CalculatedAmount`, `FeesStatus`, `ApprovedBy`, `DateApproved`, `Narration`) VALUES
(1, 1, 14, 5000, '1', '2019-11-11 15:47:45', 0, NULL, NULL, NULL, 'P0123456788X', '2019-11-11 15:47:45', NULL, NULL, 0, NULL, NULL, 5000, 'Approved', 'CASEOFFICER01', '2019-11-11 16:15:44', '12334444'),
(2, 1, 1, 20000, '1', '2019-11-11 15:47:45', 0, NULL, NULL, NULL, 'P0123456788X', '2019-11-11 15:47:45', NULL, NULL, 0, NULL, NULL, 20000, 'Approved', 'CASEOFFICER01', '2019-11-11 16:15:44', '12334444'),
(3, 1, 2, 3800, '1', '2019-11-11 15:47:45', 0, NULL, NULL, NULL, 'P0123456788X', '2019-11-11 15:47:45', NULL, NULL, 0, NULL, NULL, 3800, 'Approved', 'CASEOFFICER01', '2019-11-11 16:15:44', '12334444'),
(4, 5, 14, 5000, '5', '2019-11-12 10:58:39', 0, NULL, NULL, NULL, 'P0123456788X', '2019-11-12 10:58:39', NULL, NULL, 0, NULL, NULL, 5000, 'Approved', 'PPRA01', '2019-11-12 11:42:38', '12344545'),
(5, 5, 4, 10000, '5', '2019-11-12 10:58:39', 0, NULL, NULL, NULL, 'P0123456788X', '2019-11-12 10:58:39', NULL, NULL, 0, NULL, NULL, 10000, 'Approved', 'PPRA01', '2019-11-12 11:42:38', '12344545'),
(6, 6, 14, 5000, '6', '2019-11-12 15:45:26', 0, NULL, NULL, NULL, 'P0123456788X', '2019-11-12 15:45:26', NULL, NULL, 0, NULL, NULL, 5000, 'Approved', 'PPRA01', '2019-11-12 15:55:25', '12344545'),
(7, 6, 1, 20000, '6', '2019-11-12 15:45:26', 0, NULL, NULL, NULL, 'P0123456788X', '2019-11-12 15:45:26', NULL, NULL, 0, NULL, NULL, 20000, 'Approved', 'PPRA01', '2019-11-12 15:55:25', '12344545'),
(8, 6, 2, 500, '6', '2019-11-12 15:45:26', 0, NULL, NULL, NULL, 'P0123456788X', '2019-11-12 15:45:26', NULL, NULL, 0, NULL, NULL, 500, 'Approved', 'PPRA01', '2019-11-12 15:55:25', '12344545'),
(9, 7, 14, 5000, '7', '2019-11-12 16:42:15', 0, NULL, NULL, NULL, 'P0123456788X', '2019-11-12 16:42:15', NULL, NULL, 0, NULL, NULL, 5000, 'Approved', 'Admin', '2019-11-12 17:00:55', '12344545'),
(10, 7, 6, 40000, '7', '2019-11-12 16:42:15', 0, NULL, NULL, NULL, 'P0123456788X', '2019-11-12 16:42:15', NULL, NULL, 0, NULL, NULL, 40000, 'Approved', 'Admin', '2019-11-12 17:00:55', '12344545'),
(11, 9, 14, 5000, '8', '2019-11-13 11:11:36', 0, NULL, NULL, NULL, 'P0123456788X', '2019-11-13 11:11:36', NULL, NULL, 0, NULL, NULL, 5000, 'Pending Approval', NULL, NULL, NULL),
(12, 9, 8, 20000, '8', '2019-11-13 11:11:36', 0, NULL, NULL, NULL, 'P0123456788X', '2019-11-13 11:11:36', NULL, NULL, 0, NULL, NULL, 20000, 'Pending Approval', NULL, NULL, NULL),
(13, 10, 14, 5000, '8', '2019-11-13 11:14:12', 0, NULL, NULL, NULL, 'P0123456788X', '2019-11-13 11:14:12', NULL, NULL, 0, NULL, NULL, 5000, 'Approved', 'Admin', '2019-11-13 11:32:12', '12344545'),
(14, 10, 8, 20000, '8', '2019-11-13 11:14:12', 0, NULL, NULL, NULL, 'P0123456788X', '2019-11-13 11:14:12', NULL, NULL, 0, NULL, NULL, 20000, 'Approved', 'Admin', '2019-11-13 11:32:12', '12344545'),
(15, 11, 14, 5000, '11', '2019-11-13 17:04:41', 0, NULL, NULL, NULL, 'P09875345W', '2019-11-13 17:04:41', NULL, NULL, 0, NULL, NULL, 5000, 'Pending Approval', NULL, NULL, NULL),
(16, 11, 1, 12000, '11', '2019-11-13 17:04:41', 0, NULL, NULL, NULL, 'P09875345W', '2019-11-13 17:04:41', NULL, NULL, 0, NULL, NULL, 12000, 'Pending Approval', NULL, NULL, NULL),
(17, 12, 14, 5000, '12', '2019-11-13 17:05:23', 0, NULL, NULL, NULL, 'P09875345W', '2019-11-13 17:05:23', NULL, NULL, 0, NULL, NULL, 5000, 'Pending Approval', NULL, NULL, NULL),
(18, 12, 1, 20000, '12', '2019-11-13 17:05:23', 0, NULL, NULL, NULL, 'P09875345W', '2019-11-13 17:05:23', NULL, NULL, 0, NULL, NULL, 20000, 'Pending Approval', NULL, NULL, NULL),
(19, 12, 2, 40000, '12', '2019-11-13 17:05:23', 0, NULL, NULL, NULL, 'P09875345W', '2019-11-13 17:05:23', NULL, NULL, 0, NULL, NULL, 40000, 'Pending Approval', NULL, NULL, NULL),
(20, 13, 14, 5000, '13', '2019-11-13 17:05:55', 0, NULL, NULL, NULL, 'P09875345W', '2019-11-13 17:05:55', NULL, NULL, 0, NULL, NULL, 5000, 'Pending Approval', NULL, NULL, NULL),
(21, 13, 1, 20000, '13', '2019-11-13 17:05:55', 0, NULL, NULL, NULL, 'P09875345W', '2019-11-13 17:05:55', NULL, NULL, 0, NULL, NULL, 20000, 'Pending Approval', NULL, NULL, NULL),
(22, 13, 2, 48000, '13', '2019-11-13 17:05:55', 0, NULL, NULL, NULL, 'P09875345W', '2019-11-13 17:05:55', NULL, NULL, 0, NULL, NULL, 48000, 'Pending Approval', NULL, NULL, NULL),
(23, 13, 3, 13000, '13', '2019-11-13 17:05:55', 0, NULL, NULL, NULL, 'P09875345W', '2019-11-13 17:05:55', NULL, NULL, 0, NULL, NULL, 13000, 'Pending Approval', NULL, NULL, NULL),
(24, 14, 14, 5000, '14', '2019-11-13 17:07:40', 0, NULL, NULL, NULL, 'P09875345W', '2019-11-13 17:07:40', NULL, NULL, 1, '2019-11-13 17:07:40', 'P09875345W', 5000, 'Approved', 'Admin', '2019-11-13 17:49:50', 'Reff123'),
(25, 14, 14, 5000, '14', '2019-11-13 17:07:40', 0, NULL, NULL, NULL, 'P09875345W', '2019-11-13 17:07:40', NULL, NULL, 0, NULL, NULL, 5000, 'Approved', 'Admin', '2019-11-13 17:49:50', 'Reff123'),
(26, 15, 14, 5000, '15', '2019-11-13 17:08:01', 0, NULL, NULL, NULL, 'P09875345W', '2019-11-13 17:08:01', NULL, NULL, 1, '2019-11-13 17:08:01', 'P09875345W', 5000, 'Approved', 'Admin', '2019-11-13 17:31:36', 'Reff123'),
(27, 15, 14, 5000, '15', '2019-11-13 17:08:01', 0, NULL, NULL, NULL, 'P09875345W', '2019-11-13 17:08:01', NULL, NULL, 0, NULL, NULL, 5000, 'Approved', 'Admin', '2019-11-13 17:31:36', 'Reff123'),
(28, 16, 14, 5000, '16', '2019-11-14 14:45:02', 0, NULL, NULL, NULL, 'P0123456788X', '2019-11-14 14:45:02', NULL, NULL, 0, NULL, NULL, 5000, 'Approved', 'Admin', '2019-11-14 14:48:40', 'Reff123'),
(29, 16, 10, 20000, '16', '2019-11-14 14:45:02', 0, NULL, NULL, NULL, 'P0123456788X', '2019-11-14 14:45:02', NULL, NULL, 0, NULL, NULL, 20000, 'Approved', 'Admin', '2019-11-14 14:48:40', 'Reff123'),
(30, 17, 14, 5000, '17', '2019-11-15 10:55:18', 0, NULL, NULL, NULL, 'P123456879Q', '2019-11-15 10:55:18', NULL, NULL, 0, NULL, NULL, 5000, 'Approved', 'Pokumu', '2019-11-15 11:17:24', 'ARB0001/19'),
(31, 17, 1, 20000, '17', '2019-11-15 10:55:18', 0, NULL, NULL, NULL, 'P123456879Q', '2019-11-15 10:55:18', NULL, NULL, 0, NULL, NULL, 20000, 'Approved', 'Pokumu', '2019-11-15 11:17:24', 'ARB0001/19'),
(32, 17, 2, 48000, '17', '2019-11-15 10:55:18', 0, NULL, NULL, NULL, 'P123456879Q', '2019-11-15 10:55:18', NULL, NULL, 0, NULL, NULL, 48000, 'Approved', 'Pokumu', '2019-11-15 11:17:24', 'ARB0001/19'),
(33, 17, 3, 237500, '17', '2019-11-15 10:55:18', 0, NULL, NULL, NULL, 'P123456879Q', '2019-11-15 10:55:18', NULL, NULL, 0, NULL, NULL, 237500, 'Approved', 'Pokumu', '2019-11-15 11:17:24', 'ARB0001/19'),
(34, 18, 14, 5000, '18', '2019-11-15 11:49:58', 0, NULL, NULL, NULL, 'P0123456788X', '2019-11-15 11:49:58', NULL, NULL, 0, NULL, NULL, 5000, 'Approved', 'Admin', '2019-11-15 11:51:56', 'Reff123'),
(35, 18, 1, 10000, '18', '2019-11-15 11:49:58', 0, NULL, NULL, NULL, 'P0123456788X', '2019-11-15 11:49:58', NULL, NULL, 0, NULL, NULL, 10000, 'Approved', 'Admin', '2019-11-15 11:51:56', 'Reff123'),
(36, 19, 14, 5000, '19', '2019-11-19 15:02:26', 0, NULL, NULL, NULL, 'P09875345W', '2019-11-19 15:02:26', NULL, NULL, 0, NULL, NULL, 5000, 'Pending Approval', NULL, NULL, NULL),
(37, 19, 4, 10000, '19', '2019-11-19 15:02:26', 0, NULL, NULL, NULL, 'P09875345W', '2019-11-19 15:02:26', NULL, NULL, 0, NULL, NULL, 10000, 'Pending Approval', NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `applicationfeeshistory`
--

CREATE TABLE `applicationfeeshistory` (
  `ID` bigint(20) NOT NULL,
  `ApplicantID` bigint(20) NOT NULL,
  `EntryType` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AmountDue` float DEFAULT NULL,
  `RefNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `BillDate` datetime NOT NULL,
  `AmountPaid` float DEFAULT NULL,
  `PaidDate` datetime DEFAULT NULL,
  `PaymentRef` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PaymentMode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(4) DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `applications`
--

CREATE TABLE `applications` (
  `ID` bigint(20) NOT NULL,
  `TenderID` bigint(20) NOT NULL,
  `ApplicantID` bigint(20) NOT NULL,
  `PEID` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FilingDate` datetime DEFAULT NULL,
  `ApplicationREf` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Status` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(4) DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ClosingDate` date DEFAULT NULL,
  `PaymentStatus` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DecisionDate` date DEFAULT NULL,
  `Followup` tinyint(1) DEFAULT NULL,
  `Referral` tinyint(1) DEFAULT NULL,
  `WithdrawalDate` date DEFAULT NULL,
  `FileNumber` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Closed` tinyint(1) DEFAULT NULL,
  `ApplicationSuccessful` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=1260 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `applications`
--

INSERT INTO `applications` (`ID`, `TenderID`, `ApplicantID`, `PEID`, `FilingDate`, `ApplicationREf`, `ApplicationNo`, `Status`, `Created_By`, `Created_At`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_At`, `Deleted_By`, `ClosingDate`, `PaymentStatus`, `DecisionDate`, `Followup`, `Referral`, `WithdrawalDate`, `FileNumber`, `Closed`, `ApplicationSuccessful`) VALUES
(1, 12, 8, 'PE-2', '2019-11-11 15:47:45', '1', '12 OF 2019', 'Approved', 'P0123456788X', '2019-11-11 15:47:45', NULL, NULL, 0, NULL, NULL, '2019-12-02', 'Approved', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(5, 16, 8, 'PE-3', '2019-11-12 10:58:39', '5', '13 OF 2019', 'Approved', 'P0123456788X', '2019-11-12 10:58:39', NULL, NULL, 0, NULL, NULL, '2019-12-03', 'Approved', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(6, 17, 8, 'PE-3', '2019-11-12 15:45:26', '6', '14 OF 2019', 'WITHDRAWN', 'P0123456788X', '2019-11-12 15:45:26', NULL, NULL, 0, NULL, NULL, '2019-12-03', 'Approved', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(7, 18, 8, 'PE-2', '2019-11-12 16:42:14', '7', '15 OF 2019', 'Submited', 'P0123456788X', '2019-11-12 16:42:14', NULL, NULL, 0, NULL, NULL, '2019-12-03', 'Submited', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 21, 8, 'PE-3', '2019-11-13 11:14:12', '8', '16 OF 2019', 'Approved', 'P0123456788X', '2019-11-13 11:14:12', NULL, NULL, 0, NULL, NULL, '2019-12-04', 'Approved', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 22, 9, 'PE-2', '2019-11-13 17:04:41', '11', '11', 'Not Submited', 'P09875345W', '2019-11-13 17:04:41', NULL, NULL, 0, NULL, NULL, NULL, 'Not Submited', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 23, 9, 'PE-2', '2019-11-13 17:05:23', '12', '12', 'Not Submited', 'P09875345W', '2019-11-13 17:05:23', NULL, NULL, 0, NULL, NULL, NULL, 'Not Submited', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, 24, 9, 'PE-2', '2019-11-13 17:05:55', '13', '13', 'Not Submited', 'P09875345W', '2019-11-13 17:05:55', NULL, NULL, 0, NULL, NULL, NULL, 'Not Submited', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, 25, 9, 'PE-2', '2019-11-13 17:07:40', '14', '14', 'DECLINED', 'P09875345W', '2019-11-13 17:07:40', NULL, NULL, 0, NULL, NULL, NULL, 'Approved', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, 26, 9, 'PE-2', '2019-11-13 17:08:01', '15', '17 OF 2019', 'HEARING IN PROGRESS', 'P09875345W', '2019-11-13 17:08:01', NULL, NULL, 0, NULL, NULL, '2019-12-04', 'Approved', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, 27, 8, 'PE-3', '2019-11-14 14:45:01', '16', '16', 'DECLINED', 'P0123456788X', '2019-11-14 14:45:01', NULL, NULL, 0, NULL, NULL, NULL, 'Approved', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 28, 10, 'PE-4', '2019-11-15 10:55:17', '17', '18 OF 2019', 'Closed', 'P123456879Q', '2019-11-15 10:55:17', NULL, NULL, 0, NULL, NULL, '2019-12-06', 'Approved', '1970-01-01', 0, 0, NULL, NULL, 0, 0),
(18, 29, 8, 'PE-2', '2019-11-15 11:49:58', '18', '18', 'Pending Approval', 'P0123456788X', '2019-11-15 11:49:58', NULL, NULL, 0, NULL, NULL, NULL, 'Approved', NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(19, 30, 9, 'PE-3', '2019-11-19 15:02:25', '19', '19', 'Not Submited', 'P09875345W', '2019-11-19 15:02:25', NULL, NULL, 0, NULL, NULL, NULL, 'Not Submited', NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `applicationsequence`
--

CREATE TABLE `applicationsequence` (
  `ID` int(11) NOT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Date` datetime DEFAULT NULL,
  `Action` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ExpectedAction` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `User` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=372 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `applicationsequence`
--

INSERT INTO `applicationsequence` (`ID`, `ApplicationNo`, `Date`, `Action`, `Status`, `ExpectedAction`, `User`) VALUES
(21, '16 OF 2019', '2019-11-13 00:00:00', 'Created New Application', 'Done', 'Not Submited Application', 'P0123456788X'),
(22, '16 OF 2019', '2019-11-13 00:00:00', 'Submited Application', 'Done', 'Awaiting fees confirmation', 'P0123456788X'),
(23, '16 OF 2019', '2019-11-13 00:00:00', 'Application Fees Confirmed', 'Done', 'Awaiting Application Approval', 'Admin'),
(24, '16 OF 2019', '2019-11-13 00:00:00', 'Application Approved', 'Done', 'Awaiting PE Response', 'Admin'),
(25, '16 OF 2019', '2019-11-13 00:00:00', 'Procuring Entity Submited her Response', 'Done', 'Awaiting Pleriminary Fees Confirmation', 'A123456789U'),
(26, '16 OF 2019', '2019-11-13 00:00:00', 'Pleriminary Fees Confirmed', 'Done', 'Awaiting Application Approval', 'Admin'),
(27, '11', '2019-11-13 17:04:41', 'Created New Application', 'Done', 'Not Submited Application', 'P09875345W'),
(28, '12', '2019-11-13 17:05:23', 'Created New Application', 'Done', 'Not Submited Application', 'P09875345W'),
(29, '13', '2019-11-13 17:05:55', 'Created New Application', 'Done', 'Not Submited Application', 'P09875345W'),
(30, '14', '2019-11-13 17:07:40', 'Created New Application', 'Done', 'Not Submited Application', 'P09875345W'),
(31, '17 OF 2019', '2019-11-13 17:08:01', 'Created New Application', 'Done', 'Not Submited Application', 'P09875345W'),
(32, '17 OF 2019', '2019-11-13 17:19:00', 'Submited Application', 'Done', 'Awaiting fees confirmation', 'P09875345W'),
(33, '17 OF 2019', '2019-11-13 17:31:36', 'Application Fees Payment Confirmed', 'Done', 'Awaiting Application Approval', 'Admin'),
(34, '17 OF 2019', '2019-11-13 17:40:43', 'Application Approved', 'Done', 'Awaiting PE Response', 'Admin'),
(35, '14', '2019-11-13 17:49:22', 'Submited Application', 'Done', 'Awaiting fees confirmation', 'P09875345W'),
(36, '14', '2019-11-13 17:49:51', 'Application Fees Payment Confirmed', 'Done', 'Awaiting Application Approval', 'Admin'),
(37, '17 OF 2019', '2019-11-13 18:34:06', 'Procuring Entity Submited her Response', 'Done', 'Awaiting Pleriminary Fees Confirmation', 'A123456789X'),
(38, '17 OF 2019', '2019-11-13 18:38:25', 'Preliminary Objection Fees Payment Confirmed', 'Done', 'Awaiting Panel Formation', 'Admin'),
(39, '15 OF 2019', '2019-11-14 07:37:50', 'Procuring Entity Submited her Response', 'Done', 'Awaiting Panel Formation', 'A123456789X'),
(40, '16', '2019-11-14 14:45:01', 'Created New Application', 'Done', 'Not Submited Application', 'P0123456788X'),
(41, '16', '2019-11-14 14:45:57', 'Submited Application', 'Done', 'Awaiting fees confirmation', 'P0123456788X'),
(42, '16', '2019-11-14 14:48:40', 'Application Fees Payment Confirmed', 'Done', 'Awaiting Application Approval', 'Admin'),
(43, '16', '2019-11-14 15:17:28', 'Resubmited Application', 'Done', 'Awaiting fees confirmation', 'P0123456788X'),
(44, '17 OF 2019', '2019-11-14 15:52:11', 'Submited Hearing Panel', 'Done', 'Awaiting Panel Approval', 'Admin'),
(45, '17 OF 2019', '2019-11-14 16:07:38', 'Approved PanelList', 'Done', 'Awaiting Hearing Date scheduling', 'PPRA01'),
(46, '16 OF 2019', '2019-11-14 16:14:13', 'Submited Hearing Panel', 'Done', 'Awaiting Panel Approval', 'PPRA01'),
(47, '16 OF 2019', '2019-11-14 16:18:53', 'Approved PanelList', 'Done', 'Awaiting Hearing Date scheduling', 'Admin'),
(48, '17 OF 2019', '2019-11-14 16:33:49', 'Scheduled Hearing Date and Venue', 'Done', 'HEARING IN PROGRESS', 'Admin'),
(49, '17 OF 2019', '2019-11-14 16:34:34', 'Case Scheduled and hearing notice generated', 'Done', 'Hearing', 'Admin'),
(50, '17 OF 2019', '2019-11-14 16:40:38', 'Case hearing', 'Done', 'Decision preparation', 'Admin'),
(51, '18 OF 2019', '2019-11-15 10:55:17', 'Created New Application', 'Done', 'Not Submited Application', 'P123456879Q'),
(52, '18 OF 2019', '2019-11-15 11:10:01', 'Submited Application', 'Done', 'Awaiting fees confirmation', 'P123456879Q'),
(53, '18 OF 2019', '2019-11-15 11:17:24', 'Application Fees Payment Confirmed', 'Done', 'Awaiting Application Approval', 'Pokumu'),
(54, '18 OF 2019', '2019-11-15 11:36:02', 'Application Approved', 'Done', 'Awaiting PE Response', 'Admin'),
(55, '18', '2019-11-15 11:49:58', 'Created New Application', 'Done', 'Not Submited Application', 'P0123456788X'),
(56, '18', '2019-11-15 11:50:57', 'Submited Application', 'Done', 'Awaiting fees confirmation', 'P0123456788X'),
(57, '18', '2019-11-15 11:51:56', 'Application Fees Payment Confirmed', 'Done', 'Awaiting Application Approval', 'Admin'),
(58, '18 OF 2019', '2019-11-15 12:06:43', 'Procuring Entity Submited her Response', 'Done', 'Awaiting Panel Formation', 'P65498745R'),
(59, '18 OF 2019', '2019-11-15 12:22:42', 'Submited Hearing Panel', 'Done', 'Awaiting Panel Approval', 'Admin'),
(60, '18 OF 2019', '2019-11-15 12:28:47', 'Approved PanelList', 'Done', 'Awaiting Hearing Date scheduling', 'Admin'),
(61, '18 OF 2019', '2019-11-15 12:34:32', 'Scheduled Hearing Date and Venue', 'Done', 'HEARING IN PROGRESS', 'Admin'),
(62, '18 OF 2019', '2019-11-15 12:34:58', 'Case Scheduled and hearing notice generated', 'Done', 'Hearing', 'Admin'),
(63, '18 OF 2019', '2019-11-15 13:05:22', 'Case hearing', 'Done', 'Decision preparation', 'Admin'),
(64, '18 OF 2019', '2019-11-15 13:50:02', 'Decision preparation', 'Done', 'Closed', 'Admin'),
(65, '19', '2019-11-19 15:02:25', 'Created New Application', 'Done', 'Not Submited Application', 'P09875345W');

-- --------------------------------------------------------

--
-- Table structure for table `applicationshistory`
--

CREATE TABLE `applicationshistory` (
  `ID` bigint(20) NOT NULL,
  `TenderID` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ApplicantID` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PEID` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FilingDate` datetime DEFAULT NULL,
  `ApplicationREf` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Status` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(4) DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `applications_approval_workflow`
--

CREATE TABLE `applications_approval_workflow` (
  `ID` bigint(20) NOT NULL,
  `TenderID` bigint(20) NOT NULL,
  `ApplicantID` bigint(20) NOT NULL,
  `PEID` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FilingDate` datetime DEFAULT NULL,
  `ApplicationREf` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Status` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Approver` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Approved_At` datetime DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=2340 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `applications_approval_workflow`
--

INSERT INTO `applications_approval_workflow` (`ID`, `TenderID`, `ApplicantID`, `PEID`, `FilingDate`, `ApplicationREf`, `ApplicationNo`, `Status`, `Approver`, `Remarks`, `Created_By`, `Approved_At`, `Created_At`) VALUES
(1, 12, 8, 'PE-2', '2019-11-11 15:47:45', '1', '1', 'Approved', 'Admin', 'APPROVED', 'Admin', '2019-11-11 16:20:11', '2019-11-11 16:20:11'),
(2, 16, 8, 'PE-3', '2019-11-12 10:58:39', '5', '5', 'Approved', 'PPRA01', 'DateUploaded', 'PPRA01', '2019-11-12 11:51:53', '2019-11-12 11:51:53'),
(3, 17, 8, 'PE-3', '2019-11-12 15:45:26', '6', '6', 'Approved', 'PPRA01', '593428', 'PPRA01', '2019-11-12 15:56:41', '2019-11-12 15:56:41'),
(4, 18, 8, 'PE-2', '2019-11-12 16:42:14', '7', '7', 'Approved', 'Admin', 'Approved', 'Admin', '2019-11-12 17:02:35', '2019-11-12 17:02:35'),
(5, 21, 8, 'PE-3', '2019-11-13 11:14:12', '8', '8', 'Approved', 'Admin', 'Approved', 'Admin', '2019-11-13 11:42:41', '2019-11-13 11:42:41'),
(6, 26, 9, 'PE-2', '2019-11-13 17:08:01', '15', '15', 'Approved', 'Admin', 'Declined', 'Admin', '2019-11-13 17:40:43', '2019-11-13 17:40:43'),
(7, 28, 10, 'PE-4', '2019-11-15 10:55:17', '17', '17', 'Approved', 'Admin', 'Approved', 'Admin', '2019-11-15 11:36:02', '2019-11-15 11:36:02');

-- --------------------------------------------------------

--
-- Table structure for table `approvalmodules`
--

CREATE TABLE `approvalmodules` (
  `ID` int(5) NOT NULL,
  `ModuleCode` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Create_at` datetime NOT NULL,
  `Update_at` datetime DEFAULT NULL,
  `Deleted` tinyint(1) NOT NULL,
  `CreatedBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `UpdatedBy` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Category` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MaxApprovals` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB AVG_ROW_LENGTH=2730 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `approvalmodules`
--

INSERT INTO `approvalmodules` (`ID`, `ModuleCode`, `Name`, `Create_at`, `Update_at`, `Deleted`, `CreatedBy`, `UpdatedBy`, `Category`, `MaxApprovals`) VALUES
(1, 'APFRE', 'Applications Approval', '2019-08-21 17:58:50', NULL, 0, '', NULL, 'Application', 1),
(2, 'PAYMT', 'Payment Confirmation', '2019-08-21 17:58:50', NULL, 0, '', NULL, 'Fees', 1),
(3, 'REXED', 'Request For Extension of Deadline', '2019-08-21 17:58:50', NULL, 0, '', NULL, 'Application', 1),
(4, 'PAREQ', 'Panellist Appointment', '2019-08-21 17:58:50', NULL, 0, '', NULL, 'Case Management', 1),
(6, 'WIOAP', 'Withdrawal of Appeal', '2019-08-21 17:58:50', NULL, 0, '', NULL, 'Case Management', 1),
(8, 'ADJRE', 'Adjournment Request', '2019-08-21 17:58:50', NULL, 0, '', NULL, 'Case Management', 1);

-- --------------------------------------------------------

--
-- Table structure for table `approvers`
--

CREATE TABLE `approvers` (
  `ID` int(5) NOT NULL,
  `Username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ModuleCode` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Mandatory` tinyint(1) NOT NULL DEFAULT 0,
  `Active` tinyint(1) DEFAULT NULL,
  `Create_at` datetime NOT NULL,
  `Update_at` datetime DEFAULT NULL,
  `CreatedBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `UpdatedBy` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `DeletedBY` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted_At` datetime(6) DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=682 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `approvers`
--

INSERT INTO `approvers` (`ID`, `Username`, `ModuleCode`, `Mandatory`, `Active`, `Create_at`, `Update_at`, `CreatedBy`, `UpdatedBy`, `Deleted`, `DeletedBY`, `Deleted_At`) VALUES
(1, 'Admin', 'APFRE', 0, 1, '2019-10-16 14:11:35', NULL, 'Admin', 'Admin', 0, NULL, NULL),
(3, 'Admin', 'REXED', 0, 1, '2019-10-16 14:38:31', NULL, 'Admin', 'Admin', 0, NULL, NULL),
(4, 'Admin', 'PAYMT', 0, 1, '2019-10-16 16:32:58', NULL, 'Admin', 'Admin', 0, NULL, NULL),
(6, 'PPRA01', 'PAREQ', 0, 1, '2019-10-17 09:41:23', NULL, 'Admin', 'Admin2', 0, NULL, NULL),
(7, 'Admin', 'PAREQ', 0, 1, '2019-10-17 09:41:24', NULL, 'Admin', 'Admin2', 0, NULL, NULL),
(8, 'Admin', 'WIOAP', 0, 1, '2019-10-28 14:27:20', NULL, 'Admin', 'Admin', 0, NULL, NULL),
(10, 'PPRA01', 'PAYMT', 0, 1, '2019-11-11 16:04:25', NULL, 'Admin', NULL, 0, NULL, NULL),
(11, 'PPRA01', 'APFRE', 0, 1, '2019-11-11 16:05:05', NULL, 'Admin', 'Admin', 0, NULL, NULL),
(12, 'CASEOFFICER01', 'REXED', 0, 1, '2019-11-11 16:05:44', NULL, 'Admin', 'Admin', 0, NULL, NULL),
(13, 'PPRA01', 'REXED', 0, 1, '2019-11-11 16:05:46', NULL, 'Admin', 'Admin', 0, NULL, NULL),
(14, 'CASEOFFICER01', 'APFRE', 0, 0, '2019-11-11 16:06:05', NULL, 'Admin', 'Admin', 0, NULL, NULL),
(15, 'CASEOFFICER01', 'PAYMT', 0, 1, '2019-11-11 16:06:15', NULL, 'Admin', NULL, 0, NULL, NULL),
(16, 'CASEOFFICER01', 'PAREQ', 0, 1, '2019-11-11 16:06:33', NULL, 'Admin', NULL, 0, NULL, NULL),
(17, 'PPRA01', 'PAREQ', 0, 1, '2019-11-11 16:06:34', NULL, 'Admin', NULL, 0, NULL, NULL),
(18, 'CASEOFFICER01', 'WIOAP', 0, 1, '2019-11-11 16:06:48', NULL, 'Admin', NULL, 0, NULL, NULL),
(19, 'PPRA01', 'WIOAP', 0, 1, '2019-11-11 16:06:49', NULL, 'Admin', NULL, 0, NULL, NULL),
(20, 'Admin', 'ADJRE', 0, 1, '2019-11-11 16:07:22', NULL, 'Admin', NULL, 0, NULL, NULL),
(21, 'CASEOFFICER01', 'ADJRE', 0, 1, '2019-11-11 16:07:23', NULL, 'Admin', NULL, 0, NULL, NULL),
(22, 'PPRA01', 'ADJRE', 0, 1, '2019-11-11 16:07:24', NULL, 'Admin', NULL, 0, NULL, NULL),
(23, 'pkiprop', 'APFRE', 0, 0, '2019-11-15 11:12:42', NULL, 'Admin', 'Admin', 0, NULL, NULL),
(24, 'SOdhiambo', 'APFRE', 0, 0, '2019-11-15 11:12:47', NULL, 'Admin', 'Admin', 0, NULL, NULL),
(25, 'pkiprop', 'PAYMT', 0, 1, '2019-11-15 11:14:18', NULL, 'Admin', 'Admin', 0, NULL, NULL),
(26, 'Pokumu', 'PAYMT', 0, 1, '2019-11-15 11:14:21', NULL, 'Admin', NULL, 0, NULL, NULL),
(27, 'SOdhiambo', 'PAYMT', 0, 1, '2019-11-15 11:14:26', NULL, 'Admin', NULL, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `attendanceregister`
--

CREATE TABLE `attendanceregister` (
  `ID` int(11) NOT NULL,
  `RegisterID` int(11) DEFAULT NULL,
  `IDNO` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MobileNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Category` varchar(55) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_By` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Designation` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FirmFrom` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=5461 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `attendanceregister`
--

INSERT INTO `attendanceregister` (`ID`, `RegisterID`, `IDNO`, `MobileNo`, `Name`, `Email`, `Category`, `Created_At`, `Created_By`, `Designation`, `FirmFrom`) VALUES
(1, 1, '1234567', '0705555285', 'KIMUTAI', 'info@wilcom.co.ke', 'Applicant', '2019-11-14 16:45:36', 'Admin', 'ENG', 'WILCOM SYSTEMS'),
(2, 1, '123456789', '0722719412', 'WILSON B. KEREBEI', 'wkerebei@gmail.com', 'PPRA', '2019-11-14 16:49:26', 'Admin', 'Staff', 'PPRA'),
(3, 2, '123456', '0722719412', 'WILSON B. KEREBEI', 'wkerebei@gmail.com', 'Applicant', '2019-11-15 13:11:50', 'Admin', 'md', 'W');

-- --------------------------------------------------------

--
-- Table structure for table `audittrails`
--

CREATE TABLE `audittrails` (
  `AuditID` bigint(20) NOT NULL,
  `Date` datetime NOT NULL,
  `Username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `IpAddress` bigint(20) NOT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=151 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `audittrails`
--

INSERT INTO `audittrails` (`AuditID`, `Date`, `Username`, `Description`, `Category`, `IpAddress`) VALUES
(1, '2019-11-11 15:11:22', 'Admin', 'Cahnged User Photo for user: Admin', 'Update', 0),
(2, '2019-11-11 15:11:28', 'Admin', 'Updated  User with username: Admin', 'Update', 0),
(3, '2019-11-11 15:19:43', 'Admin', 'Added new User with username:PPRA01', 'Add', 0),
(4, '2019-11-11 15:22:12', 'PPRA01', 'Cahnged User Photo for user: PPRA01', 'Update', 0),
(5, '2019-11-11 15:22:14', 'PPRA01', 'Updated  User with username: PPRA01', 'Update', 0),
(6, '2019-11-11 15:25:59', 'Admin', 'Updated UserGroup with iD: 9', 'Update', 0),
(7, '2019-11-11 15:26:18', 'Admin', '469', 'Create', 0),
(8, '2019-11-11 15:26:24', 'Admin', '469', 'Update', 0),
(9, '2019-11-11 15:26:25', 'Admin', '469', 'Update', 0),
(10, '2019-11-11 15:26:26', 'Admin', '469', 'Update', 0),
(11, '2019-11-11 15:26:27', 'Admin', '469', 'Update', 0),
(12, '2019-11-11 15:26:31', 'Admin', '469', 'Update', 0),
(13, '2019-11-11 15:26:33', 'Admin', '469', 'Update', 0),
(14, '2019-11-11 15:26:35', 'Admin', '499', 'Create', 0),
(15, '2019-11-11 15:26:37', 'Admin', '499', 'Update', 0),
(16, '2019-11-11 15:26:38', 'Admin', '499', 'Update', 0),
(17, '2019-11-11 15:26:43', 'Admin', '539', 'Create', 0),
(18, '2019-11-11 15:26:44', 'Admin', '539', 'Update', 0),
(19, '2019-11-11 15:26:45', 'Admin', '539', 'Update', 0),
(20, '2019-11-11 15:26:45', 'Admin', '539', 'Update', 0),
(21, '2019-11-11 15:26:54', 'Admin', '609', 'Create', 0),
(22, '2019-11-11 15:26:55', 'Admin', '609', 'Update', 0),
(23, '2019-11-11 15:26:56', 'Admin', '609', 'Update', 0),
(24, '2019-11-11 15:26:57', 'Admin', '609', 'Update', 0),
(25, '2019-11-11 15:27:05', 'Admin', '339', 'Create', 0),
(26, '2019-11-11 15:27:06', 'Admin', '339', 'Update', 0),
(27, '2019-11-11 15:27:07', 'Admin', '339', 'Update', 0),
(28, '2019-11-11 15:27:18', 'Admin', '359', 'Create', 0),
(29, '2019-11-11 15:27:18', 'Admin', '359', 'Update', 0),
(30, '2019-11-11 15:27:19', 'Admin', '359', 'Update', 0),
(31, '2019-11-11 15:27:20', 'Admin', '359', 'Update', 0),
(32, '2019-11-11 15:27:25', 'Admin', '369', 'Create', 0),
(33, '2019-11-11 15:27:26', 'Admin', '369', 'Update', 0),
(34, '2019-11-11 15:27:27', 'Admin', '369', 'Update', 0),
(35, '2019-11-11 15:27:27', 'Admin', '369', 'Update', 0),
(36, '2019-11-11 15:27:29', 'Admin', '379', 'Create', 0),
(37, '2019-11-11 15:27:30', 'Admin', '379', 'Update', 0),
(38, '2019-11-11 15:27:31', 'Admin', '379', 'Update', 0),
(39, '2019-11-11 15:27:32', 'Admin', '379', 'Update', 0),
(40, '2019-11-11 15:27:33', 'Admin', '389', 'Create', 0),
(41, '2019-11-11 15:27:34', 'Admin', '389', 'Update', 0),
(42, '2019-11-11 15:27:36', 'Admin', '389', 'Update', 0),
(43, '2019-11-11 15:27:37', 'Admin', '389', 'Update', 0),
(44, '2019-11-11 15:27:39', 'Admin', '399', 'Create', 0),
(45, '2019-11-11 15:27:40', 'Admin', '399', 'Update', 0),
(46, '2019-11-11 15:27:40', 'Admin', '399', 'Update', 0),
(47, '2019-11-11 15:27:41', 'Admin', '399', 'Update', 0),
(48, '2019-11-11 15:27:42', 'Admin', '409', 'Create', 0),
(49, '2019-11-11 15:27:43', 'Admin', '409', 'Update', 0),
(50, '2019-11-11 15:27:44', 'Admin', '409', 'Update', 0),
(51, '2019-11-11 15:27:45', 'Admin', '409', 'Update', 0),
(52, '2019-11-11 15:27:55', 'Admin', '429', 'Create', 0),
(53, '2019-11-11 15:27:56', 'Admin', '429', 'Update', 0),
(54, '2019-11-11 15:27:57', 'Admin', '429', 'Update', 0),
(55, '2019-11-11 15:27:58', 'Admin', '429', 'Update', 0),
(56, '2019-11-11 15:28:05', 'Admin', '439', 'Create', 0),
(57, '2019-11-11 15:28:11', 'Admin', '449', 'Create', 0),
(58, '2019-11-11 15:28:14', 'Admin', '459', 'Create', 0),
(59, '2019-11-11 15:28:17', 'Admin', '459', 'Update', 0),
(60, '2019-11-11 15:28:18', 'Admin', '449', 'Update', 0),
(61, '2019-11-11 15:28:20', 'Admin', '509', 'Create', 0),
(62, '2019-11-11 15:28:22', 'Admin', '509', 'Update', 0),
(63, '2019-11-11 15:28:23', 'Admin', '509', 'Update', 0),
(64, '2019-11-11 15:28:24', 'Admin', '509', 'Update', 0),
(65, '2019-11-11 15:28:29', 'Admin', '559', 'Create', 0),
(66, '2019-11-11 15:28:30', 'Admin', '559', 'Update', 0),
(67, '2019-11-11 15:28:31', 'Admin', '559', 'Update', 0),
(68, '2019-11-11 15:28:34', 'Admin', '249', 'Create', 0),
(69, '2019-11-11 15:28:35', 'Admin', '249', 'Update', 0),
(70, '2019-11-11 15:28:37', 'Admin', '249', 'Update', 0),
(71, '2019-11-11 15:28:37', 'Admin', '249', 'Update', 0),
(72, '2019-11-11 15:28:38', 'Admin', '249', 'Update', 0),
(73, '2019-11-11 15:28:39', 'Admin', '259', 'Create', 0),
(74, '2019-11-11 15:28:42', 'Admin', '259', 'Update', 0),
(75, '2019-11-11 15:28:43', 'Admin', '259', 'Update', 0),
(76, '2019-11-11 15:28:44', 'Admin', '259', 'Update', 0),
(77, '2019-11-11 15:28:45', 'Admin', '259', 'Update', 0),
(78, '2019-11-11 15:28:46', 'Admin', '269', 'Create', 0),
(79, '2019-11-11 15:28:47', 'Admin', '269', 'Update', 0),
(80, '2019-11-11 15:28:47', 'Admin', '269', 'Update', 0),
(81, '2019-11-11 15:28:48', 'Admin', '269', 'Update', 0),
(82, '2019-11-11 15:28:49', 'Admin', '269', 'Update', 0),
(83, '2019-11-11 15:28:52', 'Admin', '279', 'Create', 0),
(84, '2019-11-11 15:28:53', 'Admin', '279', 'Update', 0),
(85, '2019-11-11 15:28:55', 'Admin', '279', 'Update', 0),
(86, '2019-11-11 15:28:56', 'Admin', '279', 'Update', 0),
(87, '2019-11-11 15:28:57', 'Admin', '279', 'Update', 0),
(88, '2019-11-11 15:28:58', 'Admin', '479', 'Create', 0),
(89, '2019-11-11 15:28:59', 'Admin', '479', 'Update', 0),
(90, '2019-11-11 15:29:00', 'Admin', '479', 'Update', 0),
(91, '2019-11-11 15:29:01', 'Admin', '479', 'Update', 0),
(92, '2019-11-11 15:29:02', 'Admin', '479', 'Update', 0),
(93, '2019-11-11 15:29:03', 'Admin', '489', 'Create', 0),
(94, '2019-11-11 15:29:04', 'Admin', '489', 'Update', 0),
(95, '2019-11-11 15:29:05', 'Admin', '489', 'Update', 0),
(96, '2019-11-11 15:29:06', 'Admin', '489', 'Update', 0),
(97, '2019-11-11 15:29:07', 'Admin', '489', 'Update', 0),
(98, '2019-11-11 15:29:10', 'Admin', '519', 'Create', 0),
(99, '2019-11-11 15:29:11', 'Admin', '519', 'Update', 0),
(100, '2019-11-11 15:29:13', 'Admin', '519', 'Update', 0),
(101, '2019-11-11 15:29:14', 'Admin', '519', 'Update', 0),
(102, '2019-11-11 15:29:15', 'Admin', '519', 'Update', 0),
(103, '2019-11-11 15:29:17', 'Admin', '529', 'Create', 0),
(104, '2019-11-11 15:29:17', 'Admin', '529', 'Update', 0),
(105, '2019-11-11 15:29:19', 'Admin', '529', 'Update', 0),
(106, '2019-11-11 15:29:20', 'Admin', '529', 'Update', 0),
(107, '2019-11-11 15:29:21', 'Admin', '529', 'Update', 0),
(108, '2019-11-11 15:29:23', 'Admin', '549', 'Create', 0),
(109, '2019-11-11 15:29:24', 'Admin', '549', 'Update', 0),
(110, '2019-11-11 15:29:26', 'Admin', '549', 'Update', 0),
(111, '2019-11-11 15:29:27', 'Admin', '549', 'Update', 0),
(112, '2019-11-11 15:29:28', 'Admin', '549', 'Update', 0),
(113, '2019-11-11 15:29:34', 'Admin', '569', 'Create', 0),
(114, '2019-11-11 15:29:36', 'Admin', '579', 'Create', 0),
(115, '2019-11-11 15:29:37', 'Admin', '579', 'Update', 0),
(116, '2019-11-11 15:29:38', 'Admin', '579', 'Update', 0),
(117, '2019-11-11 15:29:39', 'Admin', '579', 'Update', 0),
(118, '2019-11-11 15:29:41', 'Admin', '569', 'Update', 0),
(119, '2019-11-11 15:29:43', 'Admin', '599', 'Create', 0),
(120, '2019-11-11 15:29:44', 'Admin', '599', 'Update', 0),
(121, '2019-11-11 15:29:45', 'Admin', '599', 'Update', 0),
(122, '2019-11-11 15:29:45', 'Admin', '599', 'Update', 0),
(123, '2019-11-11 15:29:49', 'Admin', '619', 'Create', 0),
(124, '2019-11-11 15:29:50', 'Admin', '619', 'Update', 0),
(125, '2019-11-11 15:29:55', 'Admin', '619', 'Update', 0),
(126, '2019-11-11 15:29:56', 'Admin', '619', 'Update', 0),
(127, '2019-11-11 15:30:07', 'Admin', '629', 'Create', 0),
(128, '2019-11-11 15:30:08', 'Admin', '629', 'Update', 0),
(129, '2019-11-11 15:30:08', 'Admin', '629', 'Update', 0),
(130, '2019-11-11 15:30:10', 'Admin', '639', 'Create', 0),
(131, '2019-11-11 15:30:11', 'Admin', '639', 'Update', 0),
(132, '2019-11-11 15:30:12', 'Admin', '639', 'Update', 0),
(133, '2019-11-11 15:30:13', 'Admin', '639', 'Update', 0),
(134, '2019-11-11 15:30:14', 'Admin', '649', 'Create', 0),
(135, '2019-11-11 15:30:15', 'Admin', '649', 'Update', 0),
(136, '2019-11-11 15:30:17', 'Admin', '649', 'Update', 0),
(137, '2019-11-11 15:30:18', 'Admin', '649', 'Update', 0),
(138, '2019-11-11 15:30:22', 'Admin', '589', 'Create', 0),
(139, '2019-11-11 15:30:22', 'Admin', '589', 'Update', 0),
(140, '2019-11-11 15:30:24', 'Admin', '589', 'Update', 0),
(141, '2019-11-11 15:30:25', 'Admin', '589', 'Update', 0),
(142, '2019-11-11 15:30:36', 'Admin', 'Updated UserGroup with iD: 9', 'Update', 0),
(143, '2019-11-11 15:34:20', 'PPRA01', 'Added new User with username:CASEOFFICER01', 'Add', 0),
(144, '2019-11-11 15:41:19', 'P0123456788X', 'Added new applicant with Name: JAMES SUPPLIERS LTD', 'Add', 0),
(145, '2019-11-11 15:47:45', 'P0123456788X', 'Added new Tender with TenderNo:MOEST/ICT/02/2018-2019', 'Add', 0),
(146, '2019-11-11 15:47:45', 'P0123456788X', 'Added new Application with ApplicationNo:1', 'Add', 0),
(147, '2019-11-11 15:47:45', 'P0123456788X', 'Added Fee for Application: 1', 'Add', 0),
(148, '2019-11-11 15:47:45', 'P0123456788X', 'Added Fee for Application: 1', 'Add', 0),
(149, '2019-11-11 15:47:45', 'P0123456788X', 'Added Fee for Application: 1', 'Add', 0),
(150, '2019-11-11 15:48:54', 'P0123456788X', 'Added new Tender Addendum for TenderID:12', 'Add', 0),
(151, '2019-11-11 15:51:31', 'P0123456788X', 'Added new Ground/Request for Application:1', 'Add', 0),
(152, '2019-11-11 15:51:50', 'P0123456788X', 'Added new Ground/Request for Application:1', 'Add', 0),
(153, '2019-11-11 15:52:05', 'P0123456788X', 'Added new Ground/Request for Application:1', 'Add', 0),
(154, '2019-11-11 15:52:22', 'P0123456788X', 'Added new Ground/Request for Application:1', 'Add', 0),
(155, '2019-11-11 15:52:42', 'P0123456788X', 'Added new Ground/Request for Application:1', 'Add', 0),
(156, '2019-11-11 15:52:55', 'P0123456788X', 'Added new Ground/Request for Application:1', 'Add', 0),
(157, '2019-11-11 15:53:11', 'P0123456788X', 'Added new Ground/Request for Application:1', 'Add', 0),
(158, '2019-11-11 15:53:28', 'P0123456788X', 'Added new Ground/Request for Application:1', 'Add', 0),
(159, '2019-11-11 15:54:23', 'P0123456788X', 'Added new Document for application: 1', 'Add', 0),
(160, '2019-11-11 15:55:15', 'P0123456788X', 'Added new Document for application: 1', 'Add', 0),
(161, '2019-11-11 15:58:40', 'P0123456788X', 'Added new interested party for application:1', 'Add', 0),
(162, '2019-11-11 16:04:25', 'Admin', '0', 'Add', 0),
(163, '2019-11-11 16:04:37', 'Admin', 'Updated Maximum Approvals for ModulePAYMT', 'Add', 0),
(164, '2019-11-11 16:04:42', 'Admin', 'Updated Maximum Approvals for ModulePAYMT', 'Add', 0),
(165, '2019-11-11 16:05:05', 'Admin', '0', 'Add', 0),
(166, '2019-11-11 16:05:06', 'Admin', '0', 'Add', 0),
(167, '2019-11-11 16:05:08', 'Admin', '0', 'Add', 0),
(168, '2019-11-11 16:05:17', 'Admin', '0', 'Add', 0),
(169, '2019-11-11 16:05:23', 'Admin', 'Updated Maximum Approvals for ModuleAPFRE', 'Add', 0),
(170, '2019-11-11 16:05:39', 'Admin', '0', 'Add', 0),
(171, '2019-11-11 16:05:44', 'Admin', '0', 'Add', 0),
(172, '2019-11-11 16:05:45', 'Admin', '0', 'Add', 0),
(173, '2019-11-11 16:05:46', 'Admin', '0', 'Add', 0),
(174, '2019-11-11 16:05:47', 'Admin', '0', 'Add', 0),
(175, '2019-11-11 16:05:48', 'Admin', '0', 'Add', 0),
(176, '2019-11-11 16:05:51', 'Admin', '0', 'Add', 0),
(177, '2019-11-11 16:05:54', 'Admin', 'Updated Maximum Approvals for ModuleREXED', 'Add', 0),
(178, '2019-11-11 16:06:05', 'Admin', '0', 'Add', 0),
(179, '2019-11-11 16:06:07', 'Admin', 'Updated Maximum Approvals for ModuleAPFRE', 'Add', 0),
(180, '2019-11-11 16:06:15', 'Admin', '0', 'Add', 0),
(181, '2019-11-11 16:06:19', 'Admin', 'Updated Maximum Approvals for ModulePAYMT', 'Add', 0),
(182, '2019-11-11 16:06:33', 'Admin', '0', 'Add', 0),
(183, '2019-11-11 16:06:34', 'Admin', '0', 'Add', 0),
(184, '2019-11-11 16:06:37', 'Admin', 'Updated Maximum Approvals for ModulePAREQ', 'Add', 0),
(185, '2019-11-11 16:06:46', 'Admin', '0', 'Add', 0),
(186, '2019-11-11 16:06:48', 'Admin', '0', 'Add', 0),
(187, '2019-11-11 16:06:49', 'Admin', '0', 'Add', 0),
(188, '2019-11-11 16:06:54', 'Admin', 'Updated Maximum Approvals for ModuleWIOAP', 'Add', 0),
(189, '2019-11-11 16:06:59', 'Admin', 'Updated Maximum Approvals for ModuleWIOAP', 'Add', 0),
(190, '2019-11-11 16:07:22', 'Admin', '0', 'Add', 0),
(191, '2019-11-11 16:07:23', 'Admin', '0', 'Add', 0),
(192, '2019-11-11 16:07:24', 'Admin', '0', 'Add', 0),
(193, '2019-11-11 16:07:26', 'Admin', 'Updated Maximum Approvals for ModuleADJRE', 'Add', 0),
(194, '2019-11-11 16:10:54', 'P0123456788X', 'Added new bank slip for application: 1', 'Add', 0),
(195, '2019-11-11 16:10:58', 'P0123456788X', 'Added new payment details for application: 1', 'Add', 0),
(196, '2019-11-11 16:20:11', 'Admin', ' Approved Application: 1', 'Approval', 0),
(197, '2019-11-11 17:35:16', 'admin', '012 OF 2019', 'Approval', 0),
(198, '2019-11-11 17:39:01', 'A123456789X', 'PE-212', 'Add', 0),
(199, '2019-11-11 17:39:02', 'A123456789X', 'Updated PE Response for Response ID: 1', 'Add', 0),
(200, '2019-11-11 17:39:15', 'A123456789X', 'Updated PE Response for Response ID: 1', 'Add', 0),
(201, '2019-11-11 17:39:24', 'A123456789X', 'Updated PE Response for Response ID: 1', 'Add', 0),
(202, '2019-11-11 17:39:42', 'A123456789X', 'Updated PE Response for Response ID: 1', 'Add', 0),
(203, '2019-11-11 17:39:52', 'A123456789X', 'Updated PE Response for Response ID: 1', 'Add', 0),
(204, '2019-11-11 17:40:15', 'A123456789X', 'Updated PE Response for Response ID: 1', 'Add', 0),
(205, '2019-11-11 17:40:35', 'A123456789X', 'Updated PE Response for Response ID: 1', 'Add', 0),
(206, '2019-11-11 17:40:41', 'A123456789X', 'Updated PE Response for Response ID: 1', 'Add', 0),
(207, '2019-11-11 17:40:48', 'A123456789X', 'Updated PE Response for Response ID: 1', 'Add', 0),
(208, '2019-11-11 17:42:39', 'A123456789X', 'Deleted PE Response Document : 1573494111039-2020190002762066.pdf', 'DELETE', 0),
(209, '2019-11-11 17:42:47', 'A123456789X', 'Deleted PE Response Document : 1573494100741-2020190002762066.pdf', 'DELETE', 0),
(210, '2019-11-12 10:56:24', 'P0123456788X', 'Added new Tender with TenderNo:CGS/SCM/WENR/OT/18-19/081', 'Add', 0),
(211, '2019-11-12 10:56:32', 'P0123456788X', 'Added new Tender with TenderNo:CGS/SCM/WENR/OT/18-19/081', 'Add', 0),
(212, '2019-11-12 10:56:51', 'P0123456788X', 'Added new Tender with TenderNo:CGS/SCM/WENR/OT/18-19/081', 'Add', 0),
(213, '2019-11-12 10:58:39', 'P0123456788X', 'Added new Tender with TenderNo:CGS/SCM/WENR/OT/18-19/081', 'Add', 0),
(214, '2019-11-12 10:58:39', 'P0123456788X', 'Added new Application with ApplicationNo:5', 'Add', 0),
(215, '2019-11-12 10:58:39', 'P0123456788X', 'Added Fee for Application: 5', 'Add', 0),
(216, '2019-11-12 10:58:39', 'P0123456788X', 'Added Fee for Application: 5', 'Add', 0),
(217, '2019-11-12 11:00:15', 'P0123456788X', 'Added new Ground/Request for Application:5', 'Add', 0),
(218, '2019-11-12 11:00:36', 'P0123456788X', 'Added new Ground/Request for Application:5', 'Add', 0),
(219, '2019-11-12 11:11:33', 'P0123456788X', 'Added new Ground/Request for Application:5', 'Add', 0),
(220, '2019-11-12 11:11:40', 'P0123456788X', 'Deleted Ground/Request for Application:5', 'Delete', 0),
(221, '2019-11-12 11:11:48', 'P0123456788X', 'Added new Ground/Request for Application:5', 'Add', 0),
(222, '2019-11-12 11:14:40', 'P0123456788X', 'Added new Ground/Request for Application:5', 'Add', 0),
(223, '2019-11-12 11:14:53', 'P0123456788X', 'Added new Ground/Request for Application:5', 'Add', 0),
(224, '2019-11-12 11:16:10', 'P0123456788X', 'Added new Document for application: 5', 'Add', 0),
(225, '2019-11-12 11:18:18', 'P0123456788X', 'Added new Document for application: 5', 'Add', 0),
(226, '2019-11-12 11:21:59', 'P0123456788X', 'Added new interested party for application:5', 'Add', 0),
(227, '2019-11-12 11:24:33', 'P0123456788X', 'Added new bank slip for application: 5', 'Add', 0),
(228, '2019-11-12 11:24:36', 'P0123456788X', 'Added new payment details for application: 5', 'Add', 0),
(229, '2019-11-12 11:51:54', 'PPRA01', ' Approved Application: 5', 'Approval', 0),
(230, '2019-11-12 14:20:43', 'A123456789U', 'Added new PE Response background Information for ApplicationNo:13 OF 2019', 'Add', 0),
(231, '2019-11-12 14:26:48', 'A123456789U', 'Added new PE Response background Information for ApplicationNo:13 OF 2019', 'Add', 0),
(232, '2019-11-12 14:40:06', 'A123456789U', 'PE-313', 'Add', 0),
(233, '2019-11-12 14:43:37', 'A123456789U', 'Added new PE Response background Information for ApplicationNo:13 OF 2019', 'Add', 0),
(234, '2019-11-12 14:43:43', 'A123456789U', 'Updated PE Response for Response ID: 2', 'Add', 0),
(235, '2019-11-12 14:45:30', 'A123456789U', 'Deleted PE Response detail: 10', 'Add', 0),
(236, '2019-11-12 14:55:01', 'A123456789U', 'Updated PE Response for Response ID: 2', 'Add', 0),
(237, '2019-11-12 14:55:07', 'A123456789U', 'Updated PE Response for Response ID: 2', 'Add', 0),
(238, '2019-11-12 14:56:55', 'A123456789U', 'Updated PE Response for Response ID: 2', 'Add', 0),
(239, '2019-11-12 14:57:01', 'A123456789U', 'Updated PE Response for Response ID: 2', 'Add', 0),
(240, '2019-11-12 15:24:45', 'P0123456788X', 'Cahnged User Photo for user: P0123456788X', 'Update', 0),
(241, '2019-11-12 15:24:48', 'P0123456788X', 'Updated  User with username: P0123456788X', 'Update', 0),
(242, '2019-11-12 15:45:25', 'P0123456788X', 'Added new Tender with TenderNo:UON/ICT/2019-2020', 'Add', 0),
(243, '2019-11-12 15:45:26', 'P0123456788X', 'Added new Application with ApplicationNo:6', 'Add', 0),
(244, '2019-11-12 15:45:26', 'P0123456788X', 'Added Fee for Application: 6', 'Add', 0),
(245, '2019-11-12 15:45:26', 'P0123456788X', 'Added Fee for Application: 6', 'Add', 0),
(246, '2019-11-12 15:45:26', 'P0123456788X', 'Added Fee for Application: 6', 'Add', 0),
(247, '2019-11-12 15:47:31', 'P0123456788X', 'Added new Ground/Request for Application:6', 'Add', 0),
(248, '2019-11-12 15:47:39', 'P0123456788X', 'Added new Ground/Request for Application:6', 'Add', 0),
(249, '2019-11-12 15:47:47', 'P0123456788X', 'Added new Ground/Request for Application:6', 'Add', 0),
(250, '2019-11-12 15:48:28', 'P0123456788X', 'Added new interested party for application:6', 'Add', 0),
(251, '2019-11-12 15:51:34', 'P0123456788X', 'Added new bank slip for application: 6', 'Add', 0),
(252, '2019-11-12 15:51:39', 'P0123456788X', 'Added new payment details for application: 6', 'Add', 0),
(253, '2019-11-12 15:54:37', 'Admin', '0', 'Add', 0),
(254, '2019-11-12 15:54:38', 'Admin', '0', 'Add', 0),
(255, '2019-11-12 15:54:39', 'Admin', '0', 'Add', 0),
(256, '2019-11-12 15:54:41', 'Admin', 'Updated Maximum Approvals for ModulePAYMT', 'Add', 0),
(257, '2019-11-12 15:56:41', 'PPRA01', ' Approved Application: 6', 'Approval', 0),
(258, '2019-11-12 15:58:30', 'P0123456788X', 'Submited request for case withdrawal for application:14 OF 2019', 'Add', 0),
(259, '2019-11-12 16:04:21', 'Admin', 'Approved Case Withdrawal for Application : 14 OF 2019', 'Approval', 0),
(260, '2019-11-12 16:42:14', 'P0123456788X', 'Added new Tender with TenderNo:MOE/VTT/ICT/2018-2019', 'Add', 0),
(261, '2019-11-12 16:42:14', 'P0123456788X', 'Added new Application with ApplicationNo:7', 'Add', 0),
(262, '2019-11-12 16:42:15', 'P0123456788X', 'Added Fee for Application: 7', 'Add', 0),
(263, '2019-11-12 16:42:15', 'P0123456788X', 'Added Fee for Application: 7', 'Add', 0),
(264, '2019-11-12 16:43:21', 'P0123456788X', 'Added new Tender Addendum for TenderID:18', 'Add', 0),
(265, '2019-11-12 16:45:19', 'P0123456788X', 'Added new Ground/Request for Application:7', 'Add', 0),
(266, '2019-11-12 16:45:33', 'P0123456788X', 'Added new Ground/Request for Application:7', 'Add', 0),
(267, '2019-11-12 16:45:48', 'P0123456788X', 'Added new Ground/Request for Application:7', 'Add', 0),
(268, '2019-11-12 16:46:08', 'P0123456788X', 'Added new Ground/Request for Application:7', 'Add', 0),
(269, '2019-11-12 16:46:39', 'P0123456788X', 'Added new Ground/Request for Application:7', 'Add', 0),
(270, '2019-11-12 16:46:44', 'P0123456788X', 'Deleted Ground/Request for Application:7', 'Delete', 0),
(271, '2019-11-12 16:46:51', 'P0123456788X', 'Added new Ground/Request for Application:7', 'Add', 0),
(272, '2019-11-12 16:47:08', 'P0123456788X', 'Added new Ground/Request for Application:7', 'Add', 0),
(273, '2019-11-12 16:47:51', 'P0123456788X', 'Added new interested party for application:7', 'Add', 0),
(274, '2019-11-12 16:52:24', 'P0123456788X', 'Added new bank slip for application: 7', 'Add', 0),
(275, '2019-11-12 16:52:41', 'P0123456788X', 'Added new payment details for application: 7', 'Add', 0),
(276, '2019-11-12 17:02:36', 'Admin', ' Approved Application: 7', 'Approval', 0),
(277, '2019-11-12 17:06:18', 'P0123456788X', 'Added new additionalsubmissions doument for ApplicationNo:7', 'Add', 0),
(278, '2019-11-12 17:06:35', 'P0123456788X', 'Added new additionalsubmissions for ApplicationNo:7', 'Add', 0),
(279, '2019-11-12 17:06:56', 'P0123456788X', 'Added new additionalsubmissions for ApplicationNo:7', 'Add', 0),
(280, '2019-11-12 17:17:51', 'Admin', '015 OF 2019', 'Approval', 0),
(281, '2019-11-12 17:19:23', 'A123456789X', 'Added new PE Response background Information for ApplicationNo:15 OF 2019', 'Add', 0),
(282, '2019-11-12 17:19:56', 'A123456789X', 'PE-215', 'Add', 0),
(283, '2019-11-12 17:19:56', 'A123456789X', 'Updated PE Response for Response ID: 3', 'Add', 0),
(284, '2019-11-12 17:20:06', 'A123456789X', 'Updated PE Response for Response ID: 3', 'Add', 0),
(285, '2019-11-12 17:20:14', 'A123456789X', 'Updated PE Response for Response ID: 3', 'Add', 0),
(286, '2019-11-12 17:20:49', 'A123456789X', 'Updated PE Response for Response ID: 3', 'Add', 0),
(287, '2019-11-12 17:21:03', 'A123456789X', 'Updated PE Response for Response ID: 3', 'Add', 0),
(288, '2019-11-12 17:21:10', 'A123456789X', 'Updated PE Response for Response ID: 3', 'Add', 0),
(289, '2019-11-12 17:21:56', 'A123456789X', 'Added new interested party for application:7', 'Add', 0),
(290, '2019-11-12 17:24:31', 'A123456789X', 'Added new bank slip for application: 7', 'Add', 0),
(291, '2019-11-12 17:25:08', 'A123456789X', 'Added new payment details for application: 7', 'Add', 0),
(292, '2019-11-13 11:08:50', 'P0123456788X', 'Added new Tender with TenderNo:CGS/SCM/WENR/OT/18-19/081', 'Add', 0),
(293, '2019-11-13 11:11:35', 'P0123456788X', 'Added new Tender with TenderNo:CGS/SCM/WENR/OT/18-19/081', 'Add', 0),
(294, '2019-11-13 11:11:36', 'P0123456788X', 'Added new Application with ApplicationNo:8', 'Add', 0),
(295, '2019-11-13 11:11:36', 'P0123456788X', 'Added Fee for Application: 9', 'Add', 0),
(296, '2019-11-13 11:11:36', 'P0123456788X', 'Added Fee for Application: 9', 'Add', 0),
(297, '2019-11-13 11:14:12', 'P0123456788X', 'Added new Tender with TenderNo:CGS/SCM/WENR/OT/18-19/081', 'Add', 0),
(298, '2019-11-13 11:14:12', 'P0123456788X', 'Added new Application with ApplicationNo:8', 'Add', 0),
(299, '2019-11-13 11:14:12', 'P0123456788X', 'Added Fee for Application: 10', 'Add', 0),
(300, '2019-11-13 11:14:12', 'P0123456788X', 'Added Fee for Application: 10', 'Add', 0),
(301, '2019-11-13 11:14:42', 'P0123456788X', 'Added new Ground/Request for Application:10', 'Add', 0),
(302, '2019-11-13 11:14:46', 'P0123456788X', 'Added new Ground/Request for Application:10', 'Add', 0),
(303, '2019-11-13 11:14:56', 'P0123456788X', 'Added new Document for application: 10', 'Add', 0),
(304, '2019-11-13 11:20:07', 'P0123456788X', 'Added new bank slip for application: 10', 'Add', 0),
(305, '2019-11-13 11:20:13', 'P0123456788X', 'Added new payment details for application: 10', 'Add', 0),
(306, '2019-11-13 11:21:59', 'P0123456788X', 'Added new payment details for application: 10', 'Add', 0),
(307, '2019-11-13 11:24:41', 'P0123456788X', 'Added new payment details for application: 10', 'Add', 0),
(308, '2019-11-13 11:42:42', 'Admin', ' Approved Application: 8', 'Approval', 0),
(309, '2019-11-13 11:46:28', 'A123456789U', 'Added new PE Response background Information for ApplicationNo:16 OF 2019', 'Add', 0),
(310, '2019-11-13 11:53:34', 'A123456789U', 'PE-316', 'Add', 0),
(311, '2019-11-13 11:53:34', 'A123456789U', 'Updated PE Response for Response ID: 4', 'Add', 0),
(312, '2019-11-13 11:55:17', 'A123456789U', 'Updated PE Response for Response ID: 4', 'Add', 0),
(313, '2019-11-13 11:55:33', 'A123456789U', 'Added new interested party for application:10', 'Add', 0),
(314, '2019-11-13 11:55:55', 'A123456789U', 'Added new bank slip for application: 10', 'Add', 0),
(315, '2019-11-13 11:56:03', 'A123456789U', 'Added new payment details for application: 10', 'Add', 0),
(316, '2019-11-13 12:36:36', 'Admin', 'Deleted UserGroup with iD:0', 'Delete', 0),
(317, '2019-11-13 12:36:41', 'Admin', 'Deleted UserGroup with iD:0', 'Delete', 0),
(318, '2019-11-13 12:36:49', 'Admin', 'Deleted UserGroup with iD:0', 'Delete', 0),
(319, '2019-11-13 12:37:08', 'Admin', 'Deleted UserGroup with iD:0', 'Delete', 0),
(320, '2019-11-13 12:38:21', 'Admin', 'Deleted UserGroup with iD:0', 'Delete', 0),
(321, '2019-11-13 12:38:31', 'Admin', 'Deleted UserGroup with iD:0', 'Delete', 0),
(322, '2019-11-13 12:40:37', 'Admin', 'Deleted UserGroup with iD:0', 'Delete', 0),
(323, '2019-11-13 12:41:06', 'Admin', 'Deleted UserGroup with iD:0', 'Delete', 0),
(324, '2019-11-13 12:42:05', 'Admin', 'Deleted UserGroup with iD:10', 'Delete', 0),
(325, '2019-11-13 13:45:44', 'Admin', '281', 'Update', 0),
(326, '2019-11-13 13:45:45', 'Admin', '281', 'Update', 0),
(327, '2019-11-13 13:45:46', 'Admin', '281', 'Update', 0),
(328, '2019-11-13 13:45:47', 'Admin', '281', 'Update', 0),
(329, '2019-11-13 13:45:49', 'Admin', '351', 'Update', 0),
(330, '2019-11-13 14:30:07', 'Admin', 'Deleted UserGroup with iD:7', 'Delete', 0),
(331, '2019-11-13 14:30:21', 'Admin', '289', 'Create', 0),
(332, '2019-11-13 14:30:22', 'Admin', '289', 'Update', 0),
(333, '2019-11-13 14:31:04', 'Admin', 'Updated UserGroup with iD: 8', 'Update', 0),
(334, '2019-11-13 14:31:21', 'Admin', 'Updated UserGroup with iD: 1', 'Update', 0),
(335, '2019-11-13 14:33:37', 'Admin', 'Added new UserGroup with name: Financeand Decs: Finance/Accounts', 'Add', 0),
(336, '2019-11-13 14:33:48', 'Admin', '2511', 'Create', 0),
(337, '2019-11-13 14:33:49', 'Admin', '2511', 'Update', 0),
(338, '2019-11-13 14:33:50', 'Admin', '2411', 'Create', 0),
(339, '2019-11-13 14:34:10', 'Admin', '6111', 'Create', 0),
(340, '2019-11-13 14:34:12', 'Admin', '6111', 'Update', 0),
(341, '2019-11-13 14:34:12', 'Admin', '6111', 'Update', 0),
(342, '2019-11-13 14:34:13', 'Admin', '6111', 'Update', 0),
(343, '2019-11-13 14:34:14', 'Admin', '6111', 'Update', 0),
(344, '2019-11-13 14:34:25', 'Admin', '2811', 'Create', 0),
(345, '2019-11-13 14:34:26', 'Admin', '2811', 'Update', 0),
(346, '2019-11-13 14:34:27', 'Admin', '2811', 'Update', 0),
(347, '2019-11-13 14:37:13', 'Admin', 'Cahnged User Photo for user: Admin', 'Update', 0),
(348, '2019-11-13 14:42:26', 'Admin', 'Updated Procurement Entity: PE-2', 'Update', 0),
(349, '2019-11-13 14:56:01', 'P09875345W', 'Added new applicant with Name: APPLICANT LTD', 'Add', 0),
(350, '2019-11-13 17:01:59', 'Admin', 'Added new Case Officer: PPRA01', 'Add', 0),
(351, '2019-11-13 17:02:31', 'Admin', 'Deleted Case Officer: CASEOFFICER01', 'Delete', 0),
(352, '2019-11-13 17:04:41', 'P09875345W', 'Added new Tender with TenderNo:TNDE/0001/2019', 'Add', 0),
(353, '2019-11-13 17:04:41', 'P09875345W', 'Added new Application with ApplicationNo:11', 'Add', 0),
(354, '2019-11-13 17:04:41', 'P09875345W', 'Added Fee for Application: 11', 'Add', 0),
(355, '2019-11-13 17:04:41', 'P09875345W', 'Added Fee for Application: 11', 'Add', 0),
(356, '2019-11-13 17:05:22', 'P09875345W', 'Added new Tender with TenderNo:TNDE/0001/2019', 'Add', 0),
(357, '2019-11-13 17:05:23', 'P09875345W', 'Added new Application with ApplicationNo:12', 'Add', 0),
(358, '2019-11-13 17:05:23', 'P09875345W', 'Added Fee for Application: 12', 'Add', 0),
(359, '2019-11-13 17:05:23', 'P09875345W', 'Added Fee for Application: 12', 'Add', 0),
(360, '2019-11-13 17:05:23', 'P09875345W', 'Added Fee for Application: 12', 'Add', 0),
(361, '2019-11-13 17:05:54', 'P09875345W', 'Added new Tender with TenderNo:TNDE/0001/2019', 'Add', 0),
(362, '2019-11-13 17:05:55', 'P09875345W', 'Added new Application with ApplicationNo:13', 'Add', 0),
(363, '2019-11-13 17:05:55', 'P09875345W', 'Added Fee for Application: 13', 'Add', 0),
(364, '2019-11-13 17:05:55', 'P09875345W', 'Added Fee for Application: 13', 'Add', 0),
(365, '2019-11-13 17:05:55', 'P09875345W', 'Added Fee for Application: 13', 'Add', 0),
(366, '2019-11-13 17:05:55', 'P09875345W', 'Added Fee for Application: 13', 'Add', 0),
(367, '2019-11-13 17:07:39', 'P09875345W', 'Added new Tender with TenderNo:TNDE/0001/2019', 'Add', 0),
(368, '2019-11-13 17:07:40', 'P09875345W', 'Added new Application with ApplicationNo:14', 'Add', 0),
(369, '2019-11-13 17:07:40', 'P09875345W', 'Added Fee for Application: 14', 'Add', 0),
(370, '2019-11-13 17:07:40', 'P09875345W', 'Added Fee for Application: 14', 'Add', 0),
(371, '2019-11-13 17:08:00', 'P09875345W', 'Added new Tender with TenderNo:TNDE/0001/2019', 'Add', 0),
(372, '2019-11-13 17:08:01', 'P09875345W', 'Added new Application with ApplicationNo:15', 'Add', 0),
(373, '2019-11-13 17:08:01', 'P09875345W', 'Added Fee for Application: 15', 'Add', 0),
(374, '2019-11-13 17:08:01', 'P09875345W', 'Added Fee for Application: 15', 'Add', 0),
(375, '2019-11-13 17:17:02', 'P09875345W', 'Added new Ground/Request for Application:15', 'Add', 0),
(376, '2019-11-13 17:17:09', 'P09875345W', 'Added new Ground/Request for Application:15', 'Add', 0),
(377, '2019-11-13 17:17:34', 'P09875345W', 'Added new Document for application: 15', 'Add', 0),
(378, '2019-11-13 17:18:54', 'P09875345W', 'Added new bank slip for application: 15', 'Add', 0),
(379, '2019-11-13 17:19:00', 'P09875345W', 'Added new payment details for application: 15', 'Add', 0),
(380, '2019-11-13 17:40:43', 'Admin', '015', 'Approval', 0),
(381, '2019-11-13 17:40:43', 'Admin', ' Approved Application: 15', 'Approval', 0),
(382, '2019-11-13 17:49:21', 'P09875345W', 'Added new bank slip for application: 14', 'Add', 0),
(383, '2019-11-13 17:49:22', 'P09875345W', 'Added new payment details for application: 14', 'Add', 0),
(384, '2019-11-13 17:50:47', 'Admin', '014', 'Approval', 0),
(385, '2019-11-13 18:28:40', 'A123456789X', 'Added new PE Response background Information for ApplicationNo:17 OF 2019', 'Add', 0),
(386, '2019-11-13 18:28:46', 'A123456789X', 'PE-217', 'Add', 0),
(387, '2019-11-13 18:28:47', 'A123456789X', 'Updated PE Response for Response ID: 5', 'Add', 0),
(388, '2019-11-13 18:28:54', 'A123456789X', 'Updated PE Response for Response ID: 5', 'Add', 0),
(389, '2019-11-13 18:30:00', 'A123456789X', 'Added new interested party for application:15', 'Add', 0),
(390, '2019-11-13 18:30:43', 'A123456789X', 'Added new bank slip for application: 15', 'Add', 0),
(391, '2019-11-13 18:30:45', 'A123456789X', 'Added new payment details for application: 15', 'Add', 0),
(392, '2019-11-13 18:34:00', 'A123456789X', 'Added new payment details for application: 15', 'Add', 0),
(393, '2019-11-14 07:56:52', 'Admin', 'Updated Case Officer: PPRA01', 'Update', 0),
(394, '2019-11-14 14:45:01', 'P0123456788X', 'Added new Tender with TenderNo:TNDE/0001/2019', 'Add', 0),
(395, '2019-11-14 14:45:01', 'P0123456788X', 'Added new Application with ApplicationNo:16', 'Add', 0),
(396, '2019-11-14 14:45:02', 'P0123456788X', 'Added Fee for Application: 16', 'Add', 0),
(397, '2019-11-14 14:45:02', 'P0123456788X', 'Added Fee for Application: 16', 'Add', 0),
(398, '2019-11-14 14:45:16', 'P0123456788X', 'Added new Ground/Request for Application:16', 'Add', 0),
(399, '2019-11-14 14:45:20', 'P0123456788X', 'Added new Ground/Request for Application:16', 'Add', 0),
(400, '2019-11-14 14:46:28', 'P0123456788X', 'Added new bank slip for application: 16', 'Add', 0),
(401, '2019-11-14 14:46:35', 'P0123456788X', 'Added new payment details for application: 16', 'Add', 0),
(402, '2019-11-14 14:49:52', 'Admin', '016', 'Approval', 0),
(403, '2019-11-14 14:51:46', 'Admin', '016', 'Approval', 0),
(404, '2019-11-14 14:52:59', 'Admin', '016', 'Approval', 0),
(405, '2019-11-14 15:35:50', 'Admin', '016', 'Approval', 0),
(406, '2019-11-14 15:40:08', 'Admin', '016', 'Approval', 0),
(407, '2019-11-14 15:45:45', 'Admin', 'Added new PanelMember for Application 17 OF 2019', 'Add', 0),
(408, '2019-11-14 15:46:12', 'Admin', 'Added new PanelMember for Application 17 OF 2019', 'Add', 0),
(409, '2019-11-14 15:46:34', 'Admin', 'Added new PanelMember for Application 17 OF 2019', 'Add', 0),
(410, '2019-11-14 15:49:37', 'Admin', '017 OF 2019', 'Delete', 0),
(411, '2019-11-14 15:49:45', 'Admin', 'Added new PanelMember for Application 17 OF 2019', 'Add', 0),
(412, '2019-11-14 15:50:39', 'Admin', '017 OF 2019', 'Delete', 0),
(413, '2019-11-14 15:51:18', 'Admin', 'Added new PanelMember for Application 17 OF 2019', 'Add', 0),
(414, '2019-11-14 15:52:11', 'Admin', 'Submited PanelList  for Application: 17 OF 2019', 'Add', 0),
(415, '2019-11-14 15:57:45', 'Admin', 'Approved  PanelMember:Admin', 'Approval', 0),
(416, '2019-11-14 15:57:50', 'Admin', '017 OF 2019', 'Delete', 0),
(417, '2019-11-14 15:57:57', 'Admin', '17PPRA01', 'Add', 0),
(418, '2019-11-14 16:01:24', 'Admin', '017 OF 2019', 'Delete', 0),
(419, '2019-11-14 16:01:30', 'Admin', '17Admin', 'Add', 0),
(420, '2019-11-14 16:02:42', 'Admin', 'Approved  PanelMember:CASEOFFICER01', 'Approval', 0),
(421, '2019-11-14 16:07:31', 'PPRA01', 'Approved  PanelMember:CASEOFFICER01', 'Approval', 0),
(422, '2019-11-14 16:07:33', 'PPRA01', 'Approved  PanelMember:PPRA01', 'Approval', 0),
(423, '2019-11-14 16:07:36', 'PPRA01', 'Approved  PanelMember:Admin', 'Approval', 0),
(424, '2019-11-14 16:14:13', 'PPRA01', 'Submited PanelList  for Application: 16 OF 2019', 'Add', 0),
(425, '2019-11-14 16:16:32', 'Admin', 'Added new PanelMember for Application 16 OF 2019', 'Add', 0),
(426, '2019-11-14 16:16:37', 'Admin', 'Added new PanelMember for Application 16 OF 2019', 'Add', 0),
(427, '2019-11-14 16:16:41', 'Admin', 'Added new PanelMember for Application 16 OF 2019', 'Add', 0),
(428, '2019-11-14 16:16:43', 'Admin', 'Submited PanelList  for Application: 16 OF 2019', 'Add', 0),
(429, '2019-11-14 16:17:06', 'Admin', 'Approved  PanelMember:Admin', 'Approval', 0),
(430, '2019-11-14 16:17:08', 'Admin', 'Approved  PanelMember:CASEOFFICER01', 'Approval', 0),
(431, '2019-11-14 16:17:10', 'Admin', 'Approved  PanelMember:PPRA01', 'Approval', 0),
(432, '2019-11-14 16:18:43', 'Admin', 'Approved  PanelMember:Admin', 'Approval', 0),
(433, '2019-11-14 16:18:46', 'Admin', 'Approved  PanelMember:CASEOFFICER01', 'Approval', 0),
(434, '2019-11-14 16:18:48', 'Admin', 'Approved  PanelMember:PPRA01', 'Approval', 0),
(435, '2019-11-14 16:30:51', 'Admin', 'Booked Venue:6', 'Add', 0),
(436, '2019-11-14 16:33:49', 'Admin', 'Booked Venue:6', 'Add', 0),
(437, '2019-11-14 16:34:34', 'Admin', 'Generated hearing Notice for Application: 17 OF 2019', 'Add', 0),
(438, '2019-11-14 16:40:38', 'Admin', 'Registered hearing for Application:17 OF 2019', 'Add', 0),
(439, '2019-11-14 16:45:36', 'Admin', 'Attended hearing for Application:17 OF 2019', 'Add', 0),
(440, '2019-11-14 16:49:26', 'Admin', 'Attended hearing for Application:17 OF 2019', 'Add', 0),
(441, '2019-11-14 17:05:20', 'Admin', 'Uploaded hearing attachment for application:17 OF 2019', 'Add', 0),
(442, '2019-11-14 17:06:16', 'Admin', 'Uploaded hearing attachment for application:17 OF 2019', 'Add', 0),
(443, '2019-11-14 17:07:50', 'Admin', 'Uploaded hearing attachment for application:17 OF 2019', 'Add', 0),
(444, '2019-11-14 17:10:54', 'Admin', 'Deleted hearing attachment:1573751119773-6 OF 2019.pdf', 'Delete', 0),
(445, '2019-11-15 10:24:58', 'Admin', 'Added new User with username:SOdhiambo', 'Add', 0),
(446, '2019-11-15 10:26:26', 'Admin', 'Updated  User with username: SOdhiambo', 'Update', 0),
(447, '2019-11-15 10:28:49', 'Admin', 'Added new User with username:Pokumu', 'Add', 0),
(448, '2019-11-15 10:29:46', 'Admin', 'Updated  User with username: Pokumu', 'Update', 0),
(449, '2019-11-15 10:29:58', 'SOdhiambo', 'Updated  User with username: Sodhiambo', 'Update', 0),
(450, '2019-11-15 10:30:18', 'SOdhiambo', 'Updated  User with username: Sodhiambo', 'Update', 0),
(451, '2019-11-15 10:38:19', 'SOdhiambo', 'Added new User with username:pkiprop', 'Add', 0),
(452, '2019-11-15 10:39:06', 'P123456879Q', 'Added new applicant with Name: CMC MOTORS CORPORATION', 'Add', 0),
(453, '2019-11-15 10:51:14', 'admin', 'Added new PE with Name: STATE DEPARTMENT OF INTERIOR ', 'Add', 0),
(454, '2019-11-15 10:55:16', 'P123456879Q', 'Added new Tender with TenderNo:SDI/MISNG/004/2019-2020', 'Add', 0),
(455, '2019-11-15 10:55:17', 'P123456879Q', 'Added new Application with ApplicationNo:17', 'Add', 0),
(456, '2019-11-15 10:55:18', 'P123456879Q', 'Added Fee for Application: 17', 'Add', 0),
(457, '2019-11-15 10:55:18', 'P123456879Q', 'Added Fee for Application: 17', 'Add', 0),
(458, '2019-11-15 10:55:18', 'P123456879Q', 'Added Fee for Application: 17', 'Add', 0),
(459, '2019-11-15 10:55:18', 'P123456879Q', 'Added Fee for Application: 17', 'Add', 0),
(460, '2019-11-15 10:58:03', 'P123456879Q', 'Added new Ground/Request for Application:17', 'Add', 0),
(461, '2019-11-15 10:58:48', 'P123456879Q', 'Added new Ground/Request for Application:17', 'Add', 0),
(462, '2019-11-15 10:59:33', 'P123456879Q', 'Added new Ground/Request for Application:17', 'Add', 0),
(463, '2019-11-15 11:00:22', 'P123456879Q', 'Added new Ground/Request for Application:17', 'Add', 0),
(464, '2019-11-15 11:01:04', 'P123456879Q', 'Added new Ground/Request for Application:17', 'Add', 0),
(465, '2019-11-15 11:02:08', 'P123456879Q', 'Added new Document for application: 17', 'Add', 0),
(466, '2019-11-15 11:02:38', 'P123456879Q', 'Added new Document for application: 17', 'Add', 0),
(467, '2019-11-15 11:09:53', 'P123456879Q', 'Added new bank slip for application: 17', 'Add', 0),
(468, '2019-11-15 11:10:01', 'P123456879Q', 'Added new payment details for application: 17', 'Add', 0),
(469, '2019-11-15 11:12:42', 'Admin', '0', 'Add', 0),
(470, '2019-11-15 11:12:43', 'Admin', '0', 'Add', 0),
(471, '2019-11-15 11:12:44', 'Admin', '0', 'Add', 0),
(472, '2019-11-15 11:12:47', 'Admin', '0', 'Add', 0),
(473, '2019-11-15 11:13:41', 'Admin', 'Updated Maximum Approvals for ModuleAPFRE', 'Add', 0),
(474, '2019-11-15 11:13:45', 'Admin', 'Updated Maximum Approvals for ModuleAPFRE', 'Add', 0),
(475, '2019-11-15 11:14:18', 'Admin', '0', 'Add', 0),
(476, '2019-11-15 11:14:19', 'Admin', '0', 'Add', 0),
(477, '2019-11-15 11:14:19', 'Admin', '0', 'Add', 0),
(478, '2019-11-15 11:14:21', 'Admin', '0', 'Add', 0),
(479, '2019-11-15 11:14:23', 'Admin', '0', 'Add', 0),
(480, '2019-11-15 11:14:26', 'Admin', '0', 'Add', 0),
(481, '2019-11-15 11:14:32', 'Admin', 'Updated Maximum Approvals for ModulePAYMT', 'Add', 0),
(482, '2019-11-15 11:29:56', 'Admin', '0', 'Add', 0),
(483, '2019-11-15 11:29:57', 'Admin', '0', 'Add', 0),
(484, '2019-11-15 11:30:06', 'Admin', 'Updated Maximum Approvals for ModuleAPFRE', 'Add', 0),
(485, '2019-11-15 11:30:09', 'Admin', 'Updated Maximum Approvals for ModuleAPFRE', 'Add', 0),
(486, '2019-11-15 11:30:09', 'Admin', 'Updated Maximum Approvals for ModuleAPFRE', 'Add', 0),
(487, '2019-11-15 11:36:02', 'Admin', ' Approved Application: 17', 'Approval', 0),
(488, '2019-11-15 11:49:58', 'P0123456788X', 'Added new Tender with TenderNo:TNDE/0001/2019', 'Add', 0),
(489, '2019-11-15 11:49:58', 'P0123456788X', 'Added new Application with ApplicationNo:18', 'Add', 0),
(490, '2019-11-15 11:49:58', 'P0123456788X', 'Added Fee for Application: 18', 'Add', 0),
(491, '2019-11-15 11:49:58', 'P0123456788X', 'Added Fee for Application: 18', 'Add', 0),
(492, '2019-11-15 11:50:05', 'P0123456788X', 'Added new Ground/Request for Application:18', 'Add', 0),
(493, '2019-11-15 11:50:15', 'P0123456788X', 'Added new Ground/Request for Application:18', 'Add', 0),
(494, '2019-11-15 11:50:57', 'P0123456788X', 'Added new payment details for application: 18', 'Add', 0),
(495, '2019-11-15 12:00:02', 'P65498745R', 'Added new PE Response background Information for ApplicationNo:18 OF 2019', 'Add', 0),
(496, '2019-11-15 12:01:35', 'P65498745R', 'PE-418', 'Add', 0),
(497, '2019-11-15 12:01:35', 'P65498745R', 'Updated PE Response for Response ID: 6', 'Add', 0),
(498, '2019-11-15 12:02:04', 'P65498745R', 'Updated PE Response for Response ID: 6', 'Add', 0),
(499, '2019-11-15 12:02:57', 'P65498745R', 'Updated PE Response for Response ID: 6', 'Add', 0),
(500, '2019-11-15 12:03:17', 'P65498745R', 'Updated PE Response for Response ID: 6', 'Add', 0),
(501, '2019-11-15 12:05:39', 'P65498745R', 'Added new interested party for application:17', 'Add', 0),
(502, '2019-11-15 12:19:45', 'Admin', 'Added new Case Officer: Pokumu', 'Add', 0),
(503, '2019-11-15 12:20:43', 'Admin', 'Added new PanelMember for Application 18 OF 2019', 'Add', 0),
(504, '2019-11-15 12:20:54', 'Admin', 'Added new PanelMember for Application 18 OF 2019', 'Add', 0),
(505, '2019-11-15 12:21:37', 'Admin', 'Added new PanelMember for Application 18 OF 2019', 'Add', 0),
(506, '2019-11-15 12:22:42', 'Admin', 'Submited PanelList  for Application: 18 OF 2019', 'Add', 0),
(507, '2019-11-15 12:26:42', 'Admin', 'Approved  PanelMember:SOdhiambo', 'Approval', 0),
(508, '2019-11-15 12:26:54', 'Admin', 'Approved  PanelMember:SOdhiambo', 'Approval', 0),
(509, '2019-11-15 12:27:03', 'Admin', 'Approved  PanelMember:PPRA01', 'Approval', 0),
(510, '2019-11-15 12:27:20', 'Admin', '018 OF 2019', 'Delete', 0),
(511, '2019-11-15 12:27:31', 'Admin', '18Admin', 'Add', 0),
(512, '2019-11-15 12:34:32', 'Admin', 'Booked Venue:6', 'Add', 0),
(513, '2019-11-15 12:34:32', 'Admin', 'Booked Venue:6', 'Add', 0),
(514, '2019-11-15 12:34:32', 'Admin', 'Booked Venue:6', 'Add', 0),
(515, '2019-11-15 12:34:32', 'Admin', 'Booked Venue:6', 'Add', 0),
(516, '2019-11-15 12:34:58', 'Admin', 'Generated hearing Notice for Application: 18 OF 2019', 'Add', 0),
(517, '2019-11-15 12:41:09', 'SOdhiambo', 'Added new User with username:smiheso', 'Add', 0),
(518, '2019-11-15 12:46:03', 'Admin', 'Booked Venue:6', 'Add', 0),
(519, '2019-11-15 12:46:03', 'Admin', 'Booked Venue:6', 'Add', 0),
(520, '2019-11-15 12:46:09', 'Admin', 'Generated hearing Notice for Application: 18 OF 2019', 'Add', 0),
(521, '2019-11-15 12:49:31', 'SOdhiambo', 'Updated  User with username: smiheso', 'Update', 0),
(522, '2019-11-15 12:55:03', 'Admin', 'Added new PanelMember for Application 18 OF 2019', 'Add', 0),
(523, '2019-11-15 12:55:22', 'Admin', '018 OF 2019', 'Delete', 0),
(524, '2019-11-15 12:55:38', 'Admin', '18smiheso', 'Add', 0),
(525, '2019-11-15 12:57:55', 'Admin', 'Unbooked Booked Venue:6', 'Update', 0),
(526, '2019-11-15 12:58:22', 'Admin', 'Booked Venue:6', 'Add', 0),
(527, '2019-11-15 12:58:22', 'Admin', 'Booked Venue:6', 'Add', 0),
(528, '2019-11-15 12:58:23', 'Admin', 'Booked Venue:6', 'Add', 0),
(529, '2019-11-15 12:58:29', 'Admin', 'Generated hearing Notice for Application: 18 OF 2019', 'Add', 0),
(530, '2019-11-15 13:05:22', 'Admin', 'Registered hearing for Application:18 OF 2019', 'Add', 0),
(531, '2019-11-15 13:11:50', 'Admin', 'Attended hearing for Application:18 OF 2019', 'Add', 0),
(532, '2019-11-15 13:50:02', 'Admin', 'Added new Background Information for decision for Application: 18 OF 2019', 'Add', 0),
(533, '2019-11-15 13:51:54', 'Admin', 'Added new issue for dertermination application: 18 OF 2019', 'Add', 0),
(534, '2019-11-15 13:52:20', 'Admin', 'Added new findings on issues for Application: 18 OF 2019', 'Add', 0),
(535, '2019-11-15 14:00:00', 'Admin', 'Added new Background Information for decision for Application: 18 OF 2019', 'Update', 0),
(536, '2019-11-15 14:00:14', 'Admin', 'Added new issue for dertermination application: 18 OF 2019', 'Add', 0),
(537, '2019-11-15 14:00:23', 'Admin', 'Added new issue for dertermination application: 18 OF 2019', 'Add', 0),
(538, '2019-11-15 14:00:38', 'Admin', 'Added new findings on issues for Application: 18 OF 2019', 'Add', 0),
(539, '2019-11-15 14:00:53', 'Admin', 'Added new decision order for Application: 18 OF 2019', 'Add', 0),
(540, '2019-11-15 14:01:17', 'Admin', 'Added new decision order for Application: 18 OF 2019', 'Add', 0),
(541, '2019-11-15 14:09:49', 'Admin', 'Submited Decision for Application: 18 OF 2019', 'Add', 0),
(542, '2019-11-18 14:27:04', 'Admin', 'Added new User with username:kelvin', 'Add', 0),
(543, '2019-11-18 14:46:32', 'Admin', 'Deleted User with Username: kelvin', 'Delete', 0),
(544, '2019-11-18 15:34:16', 'Admin', '0', 'Add', 0),
(545, '2019-11-18 15:34:18', 'Admin', '0', 'Add', 0),
(546, '2019-11-18 15:34:19', 'Admin', '0', 'Add', 0),
(547, '2019-11-18 15:34:20', 'Admin', '0', 'Add', 0),
(548, '2019-11-18 16:25:30', 'Admin', 'Deleted Case Officer: Pokumu', 'Delete', 0),
(549, '2019-11-18 17:13:17', 'A123456789U', 'Updated  User with username: A123456789U', 'Update', 0),
(550, '2019-11-19 12:39:41', 'admin', 'Updated applicant Code: AP-18', 'Update', 0),
(551, '2019-11-19 12:40:06', 'admin', 'Updated applicant Code: AP-18', 'Update', 0),
(552, '2019-11-19 15:02:25', 'P09875345W', 'Added new Tender with TenderNo:3458575/2019', 'Add', 0),
(553, '2019-11-19 15:02:25', 'P09875345W', 'Added new Application with ApplicationNo:19', 'Add', 0),
(554, '2019-11-19 15:02:26', 'P09875345W', 'Added Fee for Application: 19', 'Add', 0),
(555, '2019-11-19 15:02:26', 'P09875345W', 'Added Fee for Application: 19', 'Add', 0),
(556, '2019-11-19 15:06:44', 'P09875345W', 'Added new Ground/Request for Application:19', 'Add', 0),
(557, '2019-11-19 15:06:53', 'P09875345W', 'Added new Ground/Request for Application:19', 'Add', 0);

-- --------------------------------------------------------

--
-- Table structure for table `bankslips`
--

CREATE TABLE `bankslips` (
  `ID` bigint(20) NOT NULL,
  `ApplicationID` bigint(20) NOT NULL,
  `Name` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `path` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(4) DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Category` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=5461 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `bankslips`
--

INSERT INTO `bankslips` (`ID`, `ApplicationID`, `Name`, `path`, `Created_By`, `Created_At`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_At`, `Deleted_By`, `Category`) VALUES
(1, 1, '1573488654509-WHT Certificate (7).pdf', 'uploads/BankSlips', 'P0123456788X', '2019-11-11 16:10:54', NULL, NULL, 0, NULL, NULL, 'ApplicationFees'),
(2, 5, '1573547073305-Capture.PNG', 'uploads/BankSlips', 'P0123456788X', '2019-11-12 11:24:33', NULL, NULL, 0, NULL, NULL, 'ApplicationFees'),
(3, 6, '1573573894355-MERU NP- PAYMENT SLIP.jpg', 'uploads/BankSlips', 'P0123456788X', '2019-11-12 15:51:34', NULL, NULL, 0, NULL, NULL, 'ApplicationFees'),
(4, 7, '1573577544506-KCPE CERTIFICATE.jpg', 'uploads/BankSlips', 'P0123456788X', '2019-11-12 16:52:24', NULL, NULL, 0, NULL, NULL, 'ApplicationFees'),
(5, 7, '1573579471376-CD Label.jpg', 'uploads/BankSlips', 'A123456789X', '2019-11-12 17:24:31', NULL, NULL, 0, NULL, NULL, 'PreliminaryObjection'),
(6, 10, '1573633207292-Capture.PNG', 'uploads/BankSlips', 'P0123456788X', '2019-11-13 11:20:07', NULL, NULL, 0, NULL, NULL, 'ApplicationFees'),
(7, 10, '1573635354868-Capture.PNG', 'uploads/BankSlips', 'A123456789U', '2019-11-13 11:55:55', NULL, NULL, 0, NULL, NULL, 'PreliminaryObjection'),
(8, 15, '1573665533807-Capture.PNG', 'uploads/BankSlips', 'P09875345W', '2019-11-13 17:18:54', NULL, NULL, 0, NULL, NULL, 'ApplicationFees'),
(9, 14, '1573667360757-6 OF 2019.pdf', 'uploads/BankSlips', 'P09875345W', '2019-11-13 17:49:21', NULL, NULL, 0, NULL, NULL, 'ApplicationFees'),
(10, 15, '1573669842870-6 OF 2019.pdf', 'uploads/BankSlips', 'A123456789X', '2019-11-13 18:30:43', NULL, NULL, 0, NULL, NULL, 'PreliminaryObjection'),
(11, 16, '1573731987873-6 OF 2019.pdf', 'uploads/BankSlips', 'P0123456788X', '2019-11-14 14:46:28', NULL, NULL, 0, NULL, NULL, 'ApplicationFees'),
(12, 17, '1573816192637-Price List - DEC 2015.pdf', 'uploads/BankSlips', 'P123456879Q', '2019-11-15 11:09:53', NULL, NULL, 0, NULL, NULL, 'ApplicationFees');

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `ID` bigint(20) NOT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=2730 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`ID`, `Description`, `Created_At`, `Created_By`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_By`) VALUES
(12, 'Mombasa', '2019-09-18 10:25:17', 'Admin', '2019-09-18 10:25:17', 'Admin', 0, NULL),
(13, 'Head office,National bank Building', '2019-09-18 10:25:26', 'Admin', '2019-09-18 10:25:44', 'Admin', 1, 'Admin'),
(14, 'Kisumu', '2019-09-18 10:29:11', 'Admin', '2019-09-18 10:29:11', 'Admin', 0, NULL),
(15, 'Head office', '2019-09-18 10:29:21', 'Admin', '2019-09-18 10:29:21', 'Admin', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `casedetails`
--

CREATE TABLE `casedetails` (
  `ID` int(11) NOT NULL,
  `UserName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DateAsigned` datetime NOT NULL,
  `Status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PrimaryOfficer` tinyint(1) NOT NULL,
  `ReassignedTo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DateReasigned` datetime DEFAULT NULL,
  `Reason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=2340 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `casedetails`
--

INSERT INTO `casedetails` (`ID`, `UserName`, `ApplicationNo`, `DateAsigned`, `Status`, `PrimaryOfficer`, `ReassignedTo`, `DateReasigned`, `Reason`, `Created_At`, `Created_By`, `Updated_By`, `Deleted_At`, `Deleted`) VALUES
(1, 'Admin', '12 OF 2019', '2019-11-11 16:20:11', 'Open', 1, NULL, NULL, NULL, '2019-11-11 16:20:11', 'Admin', NULL, NULL, 0),
(2, 'CASEOFFICER01', '13 OF 2019', '2019-11-12 11:51:53', 'Open', 1, NULL, NULL, NULL, '2019-11-12 11:51:53', 'PPRA01', NULL, NULL, 0),
(3, 'Admin', '14 OF 2019', '2019-11-12 15:56:41', 'Open', 1, NULL, NULL, NULL, '2019-11-12 15:56:41', 'PPRA01', NULL, NULL, 0),
(4, 'CASEOFFICER01', '15 OF 2019', '2019-11-12 17:02:36', 'Open', 1, NULL, NULL, NULL, '2019-11-12 17:02:36', 'Admin', NULL, NULL, 0),
(5, 'Admin', '16 OF 2019', '2019-11-13 11:42:41', 'Open', 1, NULL, NULL, NULL, '2019-11-13 11:42:41', 'Admin', NULL, NULL, 0),
(6, 'Admin', '17 OF 2019', '2019-11-13 17:40:43', 'Open', 1, NULL, NULL, NULL, '2019-11-13 17:40:43', 'Admin', NULL, NULL, 0),
(7, 'PPRA01', '18 OF 2019', '2019-11-15 11:36:02', 'Open', 1, NULL, NULL, NULL, '2019-11-15 11:36:02', 'Admin', NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `caseofficers`
--

CREATE TABLE `caseofficers` (
  `ID` int(5) NOT NULL,
  `Username` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MinValue` float DEFAULT NULL,
  `MaximumValue` float DEFAULT NULL,
  `Active` tinyint(1) DEFAULT NULL,
  `NotAvailableFrom` datetime DEFAULT NULL,
  `NotAvailableTo` datetime DEFAULT NULL,
  `OngoingCases` int(11) DEFAULT 0,
  `CumulativeCases` int(11) DEFAULT 0,
  `Create_at` datetime NOT NULL,
  `Update_at` datetime DEFAULT NULL,
  `CreatedBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `UpdatedBy` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `DeletedBY` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted_At` datetime(6) DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=2340 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `caseofficers`
--

INSERT INTO `caseofficers` (`ID`, `Username`, `MinValue`, `MaximumValue`, `Active`, `NotAvailableFrom`, `NotAvailableTo`, `OngoingCases`, `CumulativeCases`, `Create_at`, `Update_at`, `CreatedBy`, `UpdatedBy`, `Deleted`, `DeletedBY`, `Deleted_At`) VALUES
(1, 'Admin', 1, 100000000, 1, '2019-09-06 00:00:00', '2019-09-06 00:00:00', 2, 2, '2019-09-13 17:05:06', '2019-09-13 17:05:12', 'Admin', 'Admin', 0, NULL, NULL),
(4, 'PPRA01', NULL, NULL, 1, '2019-11-13 00:00:00', '2019-11-14 00:00:00', 2, 2, '2019-11-13 17:01:59', '2019-11-14 07:56:52', 'Admin', 'Admin', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `casesittingsregister`
--

CREATE TABLE `casesittingsregister` (
  `ID` int(11) NOT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `VenueID` int(11) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `SittingNo` int(11) DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Open` tinyint(1) DEFAULT 1
) ENGINE=InnoDB AVG_ROW_LENGTH=8192 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `casesittingsregister`
--

INSERT INTO `casesittingsregister` (`ID`, `ApplicationNo`, `VenueID`, `Date`, `SittingNo`, `Created_At`, `Created_By`, `Open`) VALUES
(1, '17 OF 2019', 6, '2019-11-14', 1, '2019-11-14 16:40:38', 'Admin', 0),
(2, '18 OF 2019', 6, '2019-11-15', 1, '2019-11-15 13:05:22', 'Admin', 0);

-- --------------------------------------------------------

--
-- Table structure for table `casewithdrawal`
--

CREATE TABLE `casewithdrawal` (
  `ID` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  `Applicant` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Reason` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DecisionDate` date DEFAULT NULL,
  `Status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `RejectionReason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Frivolous` tinyint(1) DEFAULT NULL,
  `Created_At` date NOT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Approver` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `casewithdrawal`
--

INSERT INTO `casewithdrawal` (`ID`, `Date`, `Applicant`, `ApplicationNo`, `Reason`, `DecisionDate`, `Status`, `RejectionReason`, `Frivolous`, `Created_At`, `Created_By`, `Approver`) VALUES
(1, '2019-11-12 15:58:30', 'AP-17', '14 OF 2019', 'WILL TRY AGAIN LATER', '2019-11-12', 'Approved', 'Approved', 0, '2019-11-12', 'P0123456788X', NULL);

-- --------------------------------------------------------

--
-- Table structure for table `casewithdrawalapprovalworkflow`
--

CREATE TABLE `casewithdrawalapprovalworkflow` (
  `ID` int(11) NOT NULL,
  `Date` datetime NOT NULL,
  `Applicant` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Reason` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DecisionDate` date DEFAULT NULL,
  `Status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `RejectionReason` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Frivolous` tinyint(1) DEFAULT NULL,
  `Created_At` date NOT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Approver` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=2730 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `casewithdrawalapprovalworkflow`
--

INSERT INTO `casewithdrawalapprovalworkflow` (`ID`, `Date`, `Applicant`, `ApplicationNo`, `Reason`, `DecisionDate`, `Status`, `RejectionReason`, `Frivolous`, `Created_At`, `Created_By`, `Approver`) VALUES
(1, '2019-10-28 16:53:43', 'AP-11', '10 OF 2019', 'Approved', '2019-10-28', 'Approved', NULL, 0, '2019-10-28', 'Admin', 'Admin'),
(2, '2019-10-28 16:55:01', 'AP-11', '10 OF 2019', 'Approved', '2019-10-28', 'Approved', NULL, 0, '2019-10-28', 'Admin', 'Admin'),
(3, '2019-11-01 12:32:50', 'AP-11', '6 OF 2019', 'Approved', '2019-11-01', 'Approved', NULL, 0, '2019-11-01', 'Admin', 'Admin'),
(4, '2019-11-01 12:33:37', 'AP-11', '6 OF 2019', '561064', '2019-11-01', 'Approved', NULL, 0, '2019-11-01', 'Admin2', 'Admin2'),
(5, '2019-11-12 16:00:13', 'AP-17', '14 OF 2019', 'Approved', '2019-11-12', 'Approved', NULL, 0, '2019-11-12', 'PPRA01', 'PPRA01'),
(6, '2019-11-12 16:04:21', 'AP-17', '14 OF 2019', 'Approved', '2019-11-12', 'Approved', NULL, 0, '2019-11-12', 'Admin', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `casewithdrawalcontacts`
--

CREATE TABLE `casewithdrawalcontacts` (
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mobile` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=1820 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `casewithdrawalcontacts`
--

INSERT INTO `casewithdrawalcontacts` (`Name`, `Email`, `Mobile`) VALUES
('Elvis kimutai', 'elviskcheruiyot@gmail.com', '0705555285'),
('WILSON B. KEREBEI', 'wkerebei@gmail.com', '07227194121'),
('Stanley Miheso', 'mihesosc@yahoo.com', '0722607127'),
('Samson Odhiambo', 'x2press@gmail.com', '0721382630'),
('WILSON B. KEREBEI', 'wkerebei@gmail.com', '07227194121'),
('STATE DEPARTMENT OF INTERIOR ', 'judyjay879@gmail.com', '0733299665'),
('STATE DEPARTMENT OF INTERIOR ', 'judyjay879@gmail.com', '0733299665'),
('CMC MOTORS CORPORATION', 'judiejuma@gmail.com', '0705128595'),
('CMC MOTORS CORPORATION', 'judiejuma@gmail.com', '0705128595');

-- --------------------------------------------------------

--
-- Table structure for table `committeetypes`
--

CREATE TABLE `committeetypes` (
  `ID` bigint(20) NOT NULL,
  `Code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=2730 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `committeetypes`
--

INSERT INTO `committeetypes` (`ID`, `Code`, `Description`, `Created_At`, `Created_By`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_By`) VALUES
(6, 'COMT-1', 'Tender Opening Committee Updated', '2019-08-01 10:23:03', 'Admin', '2019-08-01 10:23:42', 'Admin', 1, 'Admin'),
(7, 'COMT-2', 'Disposal Committee', '2019-08-01 11:10:39', 'Admin', '2019-10-04 09:51:37', 'Admin', 0, NULL),
(8, 'COMT-3', 'Disposal Committee', '2019-08-01 11:11:30', 'Admin', '2019-08-01 11:11:30', 'Admin', 1, 'Admin'),
(9, 'COMT-4', 'Accounting Officer', '2019-08-01 11:11:47', 'Admin', '2019-08-27 17:40:15', 'Admin', 0, NULL),
(10, 'COMT-5', 'Special committees', '2019-08-08 12:30:36', 'Admin', '2019-08-08 12:30:36', 'Admin', 0, NULL),
(11, 'COMT-6', 'Test', '2019-08-27 17:35:10', 'Admin', '2019-08-27 17:40:18', 'Admin', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `configurations`
--

CREATE TABLE `configurations` (
  `ID` bigint(20) NOT NULL,
  `Code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PhysicalAdress` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Street` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PoBox` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PostalCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Town` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Telephone1` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Telephone2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mobile` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Fax` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Website` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PIN` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Logo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NextPE` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `NextComm` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `NextSupplier` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '1',
  `NextMember` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `NextProcMeth` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `NextStdDoc` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `NextApplication` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `NextRev` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `Created_At` datetime DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Deleted` tinyint(4) NOT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NextPEType` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `NextMemberType` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `NextFeeCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `NextTenderType` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `Year` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PeResponseDays` int(11) DEFAULT 5,
  `CaseClosingDate` int(11) DEFAULT 21
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `configurations`
--

INSERT INTO `configurations` (`ID`, `Code`, `Name`, `PhysicalAdress`, `Street`, `PoBox`, `PostalCode`, `Town`, `Telephone1`, `Telephone2`, `Mobile`, `Fax`, `Email`, `Website`, `PIN`, `Logo`, `NextPE`, `NextComm`, `NextSupplier`, `NextMember`, `NextProcMeth`, `NextStdDoc`, `NextApplication`, `NextRev`, `Created_At`, `Updated_At`, `Created_By`, `Updated_By`, `Deleted`, `Deleted_By`, `NextPEType`, `NextMemberType`, `NextFeeCode`, `NextTenderType`, `Year`, `PeResponseDays`, `CaseClosingDate`) VALUES
(3, 'PPARB', 'PUBLIC PROCUREMENT ADMINISTRATIVE REVIEW BOARD', 'National Bank Building', 'Harambee Avenue', '58535', '00200', 'Nairobi', '0203244214', '0203244241', '0724562264', 'fax', 'pparb@ppra.go.ke', 'https://www.ppra.go.ke', '123456789098', '1573813146501-Wilcom Logo.gif', '5', '7', '20', '1', '1', '1', '19', '1', '2019-07-29 14:14:38', '2019-11-15 10:21:19', 'Admin', 'Admin', 0, ' ', '1', '1', '1', '3', '2019', NULL, 21);

-- --------------------------------------------------------

--
-- Table structure for table `counties`
--

CREATE TABLE `counties` (
  `ID` bigint(20) NOT NULL,
  `Code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=348 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `counties`
--

INSERT INTO `counties` (`ID`, `Code`, `Name`, `Created_At`, `Created_By`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_By`) VALUES
(1, '001', 'MOMBASA', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(2, '002', 'KWALE', '0000-00-00 00:00:00', 'Admin', '2019-10-04 10:07:32', 'Admin', 0, 'Admin'),
(3, '003', 'KILIFI', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(4, '004', 'TANARIVER', '0000-00-00 00:00:00', 'Admin', '2019-08-27 17:17:05', 'Admin', 0, 'Admin'),
(5, '005', 'LAMU', '0000-00-00 00:00:00', 'Admin', '2019-08-27 17:11:58', NULL, 0, 'Admin'),
(6, '006', 'TAITA TAVETA', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(7, '007', 'GARISSA', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(8, '008', 'WAJIR', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(9, '009', 'MANDERA', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(10, '010', 'MARSABIT', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(11, '011', 'ISIOLO', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(12, '012', 'MERU', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(13, '013', 'THARAKA', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(14, '014', 'EMBU', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(15, '015', 'KITUI', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(16, '016', 'MACHAKOS', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(17, '017', 'MAKUENI', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(18, '018', 'NYANDARUA', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(19, '019', 'NYERI', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(20, '020', 'KIRINYAGA', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(21, '021', 'MURANGA', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(22, '022', 'KIAMBU', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(23, '023', 'TURKANA', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(24, '024', 'WEST POKOT', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(25, '025', 'SAMBURU', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(26, '026', 'TRANS-NZOIA', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(27, '027', 'UASIN GISHU', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(28, '028', 'ELGEYO MARAKWET', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(29, '029', 'NANDI', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(30, '030', 'BARINGO', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(31, '031', 'LAIKIPIA', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(32, '032', 'NAKURU', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(33, '033', 'NAROK', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(34, '034', 'KAJIADO', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(35, '035', 'BOMET', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(36, '036', 'KERICHO', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(37, '037', 'KAKAMEGA', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(38, '038', 'VIHIGA', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(39, '039', 'BUNGOMA', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(40, '040', 'BUSIA', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(41, '041', 'SIAYA', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(42, '042', 'KISUMU', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(43, '043', 'HOMA BAY', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(44, '044', 'MIGORI', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(45, '045', 'KISII', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(46, '046', 'NYAMIRA', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin'),
(47, '047', 'NAIROBI', '0000-00-00 00:00:00', 'Admin', '0000-00-00 00:00:00', 'Admin', 0, 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `deadlineapprovalworkflow`
--

CREATE TABLE `deadlineapprovalworkflow` (
  `ID` int(11) NOT NULL,
  `PEID` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Reason` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RequestedDate` datetime DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_By` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Approver` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Remarks` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Approved_At` datetime DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=8192 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `deadlineapprovalworkflow`
--

INSERT INTO `deadlineapprovalworkflow` (`ID`, `PEID`, `ApplicationNo`, `Reason`, `RequestedDate`, `Created_At`, `Created_By`, `Status`, `Approver`, `Remarks`, `Approved_At`) VALUES
(1, 'PE-2', '12 OF 2019', '<p>New Request 2</p>\n', '2019-11-15 00:00:00', '2019-11-11 17:31:46', 'A123456789X', 'Pending Approval', 'Admin', 'Rejected ', '2019-11-11 17:35:16'),
(2, 'PE-2', '15 OF 2019', '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,</p>\n', '2019-11-13 00:00:00', '2019-11-12 17:15:50', 'A123456789X', 'DECLINED', 'Admin', 'Rejected', '2019-11-12 17:17:51');

-- --------------------------------------------------------

--
-- Table structure for table `decisiondocuments`
--

CREATE TABLE `decisiondocuments` (
  `ID` int(11) NOT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Name` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Path` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Confidential` tinyint(1) DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=4096 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `decisiondocuments`
--

INSERT INTO `decisiondocuments` (`ID`, `ApplicationNo`, `Name`, `Description`, `Path`, `Created_At`, `Deleted`, `Confidential`, `Created_By`, `Deleted_By`, `Deleted_At`) VALUES
(6, '7 OF 2019', '1572957522072-EFT.docx', 'Does Not Exceed 2M', 'http://localhost:3001/HearingAttachments/Documents', '2019-11-05 15:38:43', 1, 0, 'Admin', 'Admin', '2019-11-05 16:13:19'),
(7, '7 OF 2019', '1572957788405-EFT.docx', 'Does Not Exceed 2M', 'http://localhost:3001/HearingAttachments/Documents', '2019-11-05 15:43:10', 1, 0, 'Admin', 'Admin', '2019-11-05 16:14:12'),
(8, '7 OF 2019', '1572958662011-6 OF 2019.pdf', 'Does Not Exceed 2M', 'http://localhost:3001/HearingAttachments/Documents', '2019-11-05 15:57:43', 1, 0, 'Admin', 'Admin', '2019-11-05 16:14:57'),
(9, '7 OF 2019', '1572959891503-6 OF 2019.pdf', 'Does Not Exceed 2M', 'http://localhost:3001/HearingAttachments/Documents', '2019-11-05 16:18:11', 1, 1, 'Admin', 'Admin', '2019-11-06 09:51:49');

-- --------------------------------------------------------

--
-- Table structure for table `decisionorders`
--

CREATE TABLE `decisionorders` (
  `ID` int(11) NOT NULL,
  `NO` int(11) DEFAULT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=4096 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `decisionorders`
--

INSERT INTO `decisionorders` (`ID`, `NO`, `ApplicationNo`, `Description`, `Created_At`, `Deleted`, `Created_By`, `Deleted_By`, `Deleted_At`, `Updated_At`, `Updated_By`) VALUES
(1, 1, '7 OF 2019', '<p>sss updated</p>\n', '2019-11-06 10:17:36', 1, 'Admin', 'Admin', '2019-11-06 10:34:46', '2019-11-06 10:29:49', 'Admin'),
(2, 1, '7 OF 2019', '<p>sss updated</p>\n', '2019-11-06 10:18:23', 1, 'Admin', 'Admin', '2019-11-06 10:34:46', '2019-11-06 10:29:49', 'Admin'),
(3, 1, '7 OF 2019', '<p>sss updated</p>\n', '2019-11-06 10:23:05', 1, 'Admin', 'Admin', '2019-11-06 10:34:46', '2019-11-06 10:29:49', 'Admin'),
(4, 1, '7 OF 2019', '<p>sss updated</p>\n', '2019-11-06 10:29:31', 1, 'Admin', 'Admin', '2019-11-06 10:34:46', '2019-11-06 10:29:49', 'Admin'),
(5, 2, '7 OF 2019', '<p>sss fff</p>\n', '2019-11-06 10:29:38', 1, 'Admin', 'Admin', '2019-11-06 15:11:05', '2019-11-06 10:31:23', 'Admin'),
(6, 1, '7 OF 2019', '<p>1</p>\n', '2019-11-06 10:31:35', 1, 'Admin', 'Admin', '2019-11-06 10:34:46', NULL, NULL),
(7, 1, '7 OF 2019', '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n', '2019-11-06 15:10:54', 0, 'Admin', NULL, NULL, NULL, NULL),
(8, 2, '7 OF 2019', '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n', '2019-11-06 15:11:00', 1, 'Admin', 'Admin', '2019-11-06 15:11:05', NULL, NULL),
(9, 1, '11 OF 2019', '<p>Whereas Wilcom Systems the applicant herein has instituted a complaint against MINISTRY OF<br />\nEDUCATION (Procuring Entity or Director General) on 2019-11-11 (Date) particulars of which<br />\nwere set out in a Request for Review served upon you on 2019-11-11 .<br />\nYou are hereby required to appear on the 2019-11-11 at 8.00AM . when the complaint against you<br />\nwill be heard by this Board sitting at Mombasa,Room 1 .<br />\nIf you fail to appear,the Applicant may proceed with the complaint and determination by order of the<br />\nBoard may be made in your absence.</p>\n', '2019-11-11 11:58:13', 0, 'Admin', NULL, NULL, NULL, NULL),
(10, 1, '18 OF 2019', '<p>dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nib</p>\n', '2019-11-15 14:00:53', 0, 'Admin', NULL, NULL, NULL, NULL),
(11, 1, '18 OF 2019', '<p>dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nib</p>\n', '2019-11-15 14:01:17', 0, 'Admin', NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `decisions`
--

CREATE TABLE `decisions` (
  `ID` int(11) NOT NULL,
  `Status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Backgroundinformation` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=4096 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `decisions`
--

INSERT INTO `decisions` (`ID`, `Status`, `ApplicationNo`, `Backgroundinformation`, `Created_At`, `Created_By`, `Deleted_By`, `Deleted_At`, `Updated_At`, `Updated_By`) VALUES
(9, 'Submited', '7 OF 2019', '<p>Cool Text is a&nbsp;<strong>FREE</strong>&nbsp;graphics generator for web pages and anywhere else you need an impressive logo without a lot of design work. Simply choose what kind of image you would like. Then fill out a form and you&#39;ll have your own custom image created on the fly.</p>\n', '2019-11-06 16:31:57', 'Admin', NULL, NULL, '2019-11-06 17:14:21', 'Admin'),
(10, 'Submited', '11 OF 2019', '<p>Whereas Wilcom Systems the applicant herein has instituted a complaint against MINISTRY OF<br />\nEDUCATION (Procuring Entity or Director General) on 2019-11-11 (Date) particulars of which<br />\nwere set out in a Request for Review served upon you on 2019-11-11 .<br />\nYou are hereby required to appear on the 2019-11-11 at 8.00AM . when the complaint against you<br />\nwill be heard by this Board sitting at Mombasa,Room 1 .<br />\nIf you fail to appear,the Applicant may proceed with the complaint and determination by order of the<br />\nBoard may be made in your absence.</p>\n', '2019-11-11 11:57:37', 'Admin', NULL, NULL, NULL, NULL),
(11, 'Submited', '18 OF 2019', '<p>dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nib</p>\n', '2019-11-15 13:50:02', 'Admin', NULL, NULL, '2019-11-15 14:00:00', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `feesapprovalworkflow`
--

CREATE TABLE `feesapprovalworkflow` (
  `ID` bigint(20) NOT NULL,
  `ApplicationID` bigint(20) NOT NULL,
  `Amount` float NOT NULL,
  `RefNo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ApprovedBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `DateApproved` datetime NOT NULL,
  `Category` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=910 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `feesapprovalworkflow`
--

INSERT INTO `feesapprovalworkflow` (`ID`, `ApplicationID`, `Amount`, `RefNo`, `Status`, `ApprovedBy`, `DateApproved`, `Category`) VALUES
(1, 1, 28800, '12344545', 'Approved', 'Admin', '2019-11-11 16:12:40', 'ApplicationFees'),
(2, 1, 28800, '12334444', 'Approved', 'CASEOFFICER01', '2019-11-11 16:15:44', 'ApplicationFees'),
(3, 5, 15000, '12344545', 'Approved', 'Admin', '2019-11-12 11:39:40', 'ApplicationFees'),
(4, 5, 15000, '12344545', 'Approved', 'PPRA01', '2019-11-12 11:42:37', 'ApplicationFees'),
(5, 6, 26000, '12344545', 'Approved', 'Admin', '2019-11-12 15:54:11', 'ApplicationFees'),
(6, 6, 26000, '12344545', 'Approved', 'PPRA01', '2019-11-12 15:55:25', 'ApplicationFees'),
(7, 7, 45000, '12344545', 'Approved', 'Admin', '2019-11-12 17:00:55', 'ApplicationFees'),
(8, 7, 5000, '5000', 'Approved', 'Admin', '2019-11-12 17:32:57', 'PreliminaryObjectionFees'),
(9, 10, 75000, '12344545', 'Approved', 'Admin', '2019-11-13 11:28:09', 'ApplicationFees'),
(10, 10, 75000, '12344545', 'Approved', 'Admin', '2019-11-13 11:32:12', 'ApplicationFees'),
(11, 10, 5000, '12344545', 'Approved', 'Admin', '2019-11-13 12:26:37', 'PreliminaryObjectionFees'),
(12, 15, 5000, 'Reff123', 'Approved', 'Admin', '2019-11-13 17:31:36', 'ApplicationFees'),
(13, 14, 5000, 'Reff123', 'Approved', 'Admin', '2019-11-13 17:49:50', 'ApplicationFees'),
(14, 15, 10000, 'Reff123', 'Approved', 'Admin', '2019-11-13 18:38:25', 'PreliminaryObjectionFees'),
(15, 16, 25000, 'Reff123', 'Approved', 'Admin', '2019-11-14 14:48:40', 'ApplicationFees'),
(16, 16, 25000, 'Reff123', 'Approved', 'Admin', '2019-11-14 14:48:40', 'ApplicationFees'),
(17, 17, 310500, 'ARB0001/19', 'Approved', 'Pokumu', '2019-11-15 11:17:24', 'ApplicationFees'),
(18, 18, 15000, 'Reff123', 'Approved', 'Admin', '2019-11-15 11:51:56', 'ApplicationFees');

-- --------------------------------------------------------

--
-- Table structure for table `feescomputations`
--

CREATE TABLE `feescomputations` (
  `ID` int(11) NOT NULL,
  `ApplicationID` int(11) DEFAULT NULL,
  `EntryDecsription` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AmountComputed` float DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Computed_At` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `feesstructure`
--

CREATE TABLE `feesstructure` (
  `ID` bigint(20) NOT NULL,
  `TenderType` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `MinAmount` float NOT NULL DEFAULT 0,
  `MaxAmount` float NOT NULL DEFAULT 0,
  `Rate1` float NOT NULL DEFAULT 1,
  `MinFee` float NOT NULL DEFAULT 0,
  `MaxFee` float NOT NULL DEFAULT 0,
  `Refundable` tinyint(1) DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=5461 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `feesstructure`
--

INSERT INTO `feesstructure` (`ID`, `TenderType`, `Name`, `Description`, `MinAmount`, `MaxAmount`, `Rate1`, `MinFee`, `MaxFee`, `Refundable`, `Created_At`, `Created_By`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_By`) VALUES
(1, 'A', 'Does Not Exceed 2M', 'Tender Amount Does Not Exceed 2M\r\n', 0, 2000000, 1, 10000, 0, 0, '2019-10-23 00:00:00', 'Admin', '2019-10-23 00:00:00', 'Admin', 0, NULL),
(2, 'A', 'Exceeds 2M but not over 50M', 'Exceeds 2M but not over 50M\r\n', 2000000, 50000000, 0.1, 0, 0, 0, '2019-10-23 00:00:00', 'Admin', '2019-10-23 00:00:00', 'Admin', 0, NULL),
(3, 'A', 'Exceeds 50M', 'Exceeds 50M\r\n', 50000000, 0, 0.025, 0, 80000, 0, '2019-10-23 00:00:00', 'Admin', '2019-10-23 00:00:00', 'Admin', 0, NULL),
(4, 'B', 'Simple', 'Prequalification/EOI - Simple Tender\r\n', 0, 0, 0, 10000, 10000, 0, '2019-10-23 00:00:00', 'Admin', '2019-10-23 00:00:00', 'Admin', 0, NULL),
(5, 'B', 'Medium', 'Prequalification/EOI - Medium Tender\r\n', 0, 0, 0, 20000, 20000, 0, '2019-10-23 00:00:00', 'Admin', '2019-10-23 00:00:00', 'Admin', 0, NULL),
(6, 'B', 'Complex', 'Prequalification/EOI -  Complex Tender\r\n', 0, 0, 0, 40000, 40000, 0, '2019-10-23 00:00:00', 'Admin', '2019-10-23 00:00:00', 'Admin', 0, NULL),
(7, 'C', 'Complex', 'Unquantified Tender-  Complex Tender\r\n', 0, 0, 0, 40000, 40000, 0, '2019-10-23 00:00:00', 'Admin', '2019-10-23 00:00:00', 'Admin', 0, NULL),
(8, 'C', 'Medium', 'Unquantified Tender - Medium Tender\r\n', 0, 0, 0, 20000, 20000, 0, '2019-10-23 00:00:00', 'Admin', '2019-10-23 00:00:00', 'Admin', 0, NULL),
(9, 'C', 'Simple', 'Unquantified Tender - Simple Tender\r\n', 0, 0, 0, 10000, 10000, 0, '2019-10-23 00:00:00', 'Admin', '2019-10-23 00:00:00', 'Admin', 0, NULL),
(10, 'D', 'Others', 'Any Other Tender\r\n', 0, 0, 0, 10000, 20000, 0, '2019-10-23 00:00:00', 'Admin', '2019-10-23 00:00:00', 'Admin', 0, NULL),
(11, '', 'Adjournment Fee', 'Upon Request of an adjournment\r\n', 0, 0, 1, 0, 5000, 0, '2019-10-23 00:00:00', 'Admin', '2019-10-23 00:00:00', 'Admin', 0, NULL),
(12, '', 'Filling Preliminary Objections', 'Filling Preliminary Objections\r\n', 0, 0, 1, 0, 5000, 0, '2019-10-23 00:00:00', 'Admin', '2019-10-23 00:00:00', 'Admin', 0, NULL),
(13, '', 'Fees to Accompany Review of DG Order', 'Fees to Accompany Review of DG Order\r\n', 0, 0, 1, 0, 40000, 0, '2019-10-23 00:00:00', 'Admin', '2019-10-23 00:00:00', 'Admin', 0, NULL),
(14, '', 'Administrative Fee', 'Administrative Fee\r\n', 0, 0, 1, 0, 5000, 0, '2019-10-23 00:00:00', 'Admin', '2019-10-23 00:00:00', 'Admin', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `financialyear`
--

CREATE TABLE `financialyear` (
  `ID` bigint(20) NOT NULL,
  `Code` int(11) NOT NULL,
  `StartDate` datetime DEFAULT NULL,
  `EndDate` datetime DEFAULT NULL,
  `IsCurrentYear` tinyint(1) DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(0) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=5461 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `financialyear`
--

INSERT INTO `financialyear` (`ID`, `Code`, `StartDate`, `EndDate`, `IsCurrentYear`, `Created_By`, `Created_At`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_By`, `Deleted_At`) VALUES
(1, 2019, '2019-01-01 00:00:00', '2019-12-31 00:00:00', 0, 'Admin', '2019-08-06 12:11:28', '2019-10-04 09:54:28', '', 0, NULL, NULL),
(2, 2020, '2019-08-01 00:00:00', '2020-07-31 00:00:00', 0, 'Admin', '2019-08-06 12:11:55', '2019-08-27 17:13:02', '', 0, NULL, NULL),
(3, 2021, '2019-08-02 00:00:00', '2020-07-31 00:00:00', 1, 'Admin', '2019-08-06 12:12:10', '2019-08-06 12:18:23', '', 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `findingsonissues`
--

CREATE TABLE `findingsonissues` (
  `ID` int(11) NOT NULL,
  `NO` int(11) DEFAULT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Actions` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=4096 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `findingsonissues`
--

INSERT INTO `findingsonissues` (`ID`, `NO`, `ApplicationNo`, `Description`, `Actions`, `Created_At`, `Deleted`, `Created_By`, `Deleted_By`, `Deleted_At`) VALUES
(1, 1, '7 OF 2019', '<p>Updated</p>\n', 'Allowed', '2019-11-05 17:57:49', 1, 'Admin', NULL, NULL),
(2, 1, '7 OF 2019', '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n', 'Allowed', '2019-11-06 15:10:41', 0, 'Admin', NULL, NULL),
(3, 2, '7 OF 2019', '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n', 'Not Allowed', '2019-11-06 15:10:46', 0, 'Admin', NULL, NULL),
(4, 1, '11 OF 2019', '<p>Whereas Wilcom Systems the applicant herein has instituted a complaint against MINISTRY OF<br />\nEDUCATION (Procuring Entity or Director General) on 2019-11-11 (Date) particulars of which<br />\nwere set out in a Request for Review served upon you on 2019-11-11 .<br />\nYou are hereby required to appear on the 2019-11-11 at 8.00AM . when the complaint against you<br />\nwill be heard by this Board sitting at Mombasa,Room 1 .<br />\nIf you fail to appear,the Applicant may proceed with the complaint and determination by order of the<br />\nBoard may be made in your absence.</p>\n', 'Allowed', '2019-11-11 11:58:00', 0, 'Admin', NULL, NULL),
(5, 2, '11 OF 2019', '<p>Whereas Wilcom Systems the applicant herein has instituted a complaint against MINISTRY OF<br />\nEDUCATION (Procuring Entity or Director General) on 2019-11-11 (Date) particulars of which<br />\nwere set out in a Request for Review served upon you on 2019-11-11 .<br />\nYou are hereby required to appear on the 2019-11-11 at 8.00AM . when the complaint against you<br />\nwill be heard by this Board sitting at Mombasa,Room 1 .<br />\nIf you fail to appear,the Applicant may proceed with the complaint and determination by order of the<br />\nBoard may be made in your absence.</p>\n', 'Not Allowed', '2019-11-11 11:58:05', 0, 'Admin', NULL, NULL),
(6, 1, '18 OF 2019', '<p>Alowed</p>\n', 'Allowed', '2019-11-15 13:52:20', 0, 'Admin', NULL, NULL),
(7, 1, '18 OF 2019', '<p>dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nib</p>\n', 'Allowed', '2019-11-15 14:00:38', 0, 'Admin', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `groundsandrequestedorders`
--

CREATE TABLE `groundsandrequestedorders` (
  `ID` bigint(20) NOT NULL,
  `ApplicationID` int(100) NOT NULL,
  `Description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `EntryType` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(4) DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GroundNO` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=442 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `groundsandrequestedorders`
--

INSERT INTO `groundsandrequestedorders` (`ID`, `ApplicationID`, `Description`, `EntryType`, `Status`, `Created_By`, `Created_At`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_At`, `Deleted_By`, `GroundNO`) VALUES
(1, 1, '<p>The Applicant was only awarded a score of 20 out of 30 on relevant experience despite having provided evidence of experience of a similar nature related to the subject tender</p>\n', 'Grounds for Appeal', 'Pending Review', 'P0123456788X', '2019-11-11 15:51:31', NULL, NULL, 0, NULL, NULL, '1'),
(2, 1, '<p>The Applicant provide equipment to demonstrate that it is ready to execute the works of the subject tender. Mr. Njuguna submitted that the Applicant demonstrated the equipments that it owns and those that were leased but only managed to score 6 out of 15 marks</p>\n', 'Grounds for Appeal', 'Pending Review', 'P0123456788X', '2019-11-11 15:51:50', NULL, NULL, 0, NULL, NULL, '2'),
(3, 1, '<p>The Applicant was awarded 23 out of 24 marks on its Key personnel despite them being qualified on the criteria for Key Personnel provided for in the Tender Document</p>\n', 'Grounds for Appeal', 'Pending Review', 'P0123456788X', '2019-11-11 15:52:05', NULL, NULL, 0, NULL, NULL, '3'),
(4, 1, '<p>On financial capacity, the Applicant satisfied the sub-criteria of; audited accounts, line of credit of over 20 million and Annual turnover but was still not awarded the full marks for this criterion</p>\n', 'Grounds for Appeal', 'Pending Review', 'P0123456788X', '2019-11-11 15:52:22', NULL, NULL, 0, NULL, NULL, '4'),
(5, 1, '<p>An order setting aside the Procuring Entity&rsquo;s award</p>\n', 'Requested Orders', 'Pending Review', 'P0123456788X', '2019-11-11 15:52:42', NULL, NULL, 0, NULL, NULL, '1'),
(6, 1, '<p>An order awarding the tender to the Applicant at its Bid Price of Kshs. 70,027,204.50</p>\n', 'Requested Orders', 'Pending Review', 'P0123456788X', '2019-11-11 15:52:55', NULL, NULL, 0, NULL, NULL, '2'),
(7, 1, '<p>A further order or direction as the Board may deem appropriate in the circumstances</p>\n', 'Requested Orders', 'Pending Review', 'P0123456788X', '2019-11-11 15:53:11', NULL, NULL, 0, NULL, NULL, '3'),
(8, 1, '<p>An order awarding costs of the proceedings to the Applicant</p>\n', 'Requested Orders', 'Pending Review', 'P0123456788X', '2019-11-11 15:53:28', NULL, NULL, 0, NULL, NULL, '4'),
(9, 5, '<p>That the Procuring Entity declined to furnish the Applicant with a summary of the due diligence report as the same was part of confidential documents which remain in the custody of the Procuring Entity pursuant to section 67 of the Act</p>\n', 'Grounds for Appeal', 'Pending Review', 'P0123456788X', '2019-11-12 11:00:15', NULL, NULL, 0, NULL, NULL, '1'),
(10, 5, '<p>That the Procuring Entity conducted a fresh due diligence process as directed in the decision of the Board in Request for Review No. 149/2018 and a report of the process was submitted to the Board as part of the Procuring Entity&rsquo;s confidential file pursuant to section 67 (3) (e) of the Act;</p>\n', 'Grounds for Appeal', 'Pending Review', 'P0123456788X', '2019-11-12 11:00:36', NULL, NULL, 0, NULL, NULL, '2'),
(11, 5, '<p>Grounds&nbsp;for&nbsp;appeal</p>\n', 'Grounds for Appeal', 'Pending Review', 'P0123456788X', '2019-11-12 11:11:33', NULL, NULL, 1, '2019-11-12 11:11:39', 'P0123456788X', '3'),
(12, 5, '<p>That the Procuring Entity conducted a fresh due diligence process as directed in the decision of the Board in Request for Review No. 149/2018 and a report of the process was submitted to the Board as part of the Procuring Entity&rsquo;s confidential file pursuant to section 67 (3) (e) of the Act;</p>\n', 'Grounds for Appeal', 'Pending Review', 'P0123456788X', '2019-11-12 11:11:47', NULL, NULL, 0, NULL, NULL, '3'),
(13, 5, '<p>An order cancelling the award of tender and/or contract made to Kenya Airports Parking Services;</p>\n', 'Requested Orders', 'Pending Review', 'P0123456788X', '2019-11-12 11:14:40', NULL, NULL, 0, NULL, NULL, '1'),
(14, 5, '<p>An order substituting the award of the Respondent of the tender with an award of tender by the Board to M/s Mason Services Limited &amp; Qntra Technology Limited (JV);</p>\n', 'Requested Orders', 'Pending Review', 'P0123456788X', '2019-11-12 11:14:53', NULL, NULL, 0, NULL, NULL, '2'),
(15, 6, '<p><strong>Post-conditions: </strong></p>\n\n<p>User is validated with database and successfully login to account. The account session details are logged in database</p>\n', 'Grounds for Appeal', 'Pending Review', 'P0123456788X', '2019-11-12 15:47:31', NULL, NULL, 0, NULL, NULL, '1'),
(16, 6, '<p><strong>Post-conditions: </strong></p>\n\n<p>User is validated with database and successfully login to account. The account session details are logged in database</p>\n', 'Grounds for Appeal', 'Pending Review', 'P0123456788X', '2019-11-12 15:47:39', NULL, NULL, 0, NULL, NULL, '2'),
(17, 6, '<p><strong>Post-conditions: </strong></p>\n\n<p>User is validated with database and successfully login to account. The account session details are logged in database</p>\n', 'Requested Orders', 'Pending Review', 'P0123456788X', '2019-11-12 15:47:47', NULL, NULL, 0, NULL, NULL, '1'),
(18, 7, '<p>The Applicant was only awarded a score of 20 out of 30 on relevant experience despite having provided evidence of experience of a similar nature related to the subject tender;</p>\n', 'Grounds for Appeal', 'Pending Review', 'P0123456788X', '2019-11-12 16:45:19', NULL, NULL, 0, NULL, NULL, '1'),
(19, 7, '<p>The Applicant provide equipment to demonstrate that it is ready to execute the works of the subject tender. Mr. Njuguna submitted that the Applicant demonstrated the equipments that it owns and those that were leased but only managed to score 6 out of 15 marks</p>\n', 'Grounds for Appeal', 'Pending Review', 'P0123456788X', '2019-11-12 16:45:33', NULL, NULL, 0, NULL, NULL, '2'),
(20, 7, '<p>The Applicant was awarded 23 out of 24 marks on its Key personnel despite them being qualified on the criteria for Key Personnel provided for in the Tender Document</p>\n', 'Grounds for Appeal', 'Pending Review', 'P0123456788X', '2019-11-12 16:45:48', NULL, NULL, 0, NULL, NULL, '3'),
(21, 7, '<p>An order setting aside the Procuring Entity&rsquo;s award</p>\n', 'Requested Orders', 'Pending Review', 'P0123456788X', '2019-11-12 16:46:08', NULL, NULL, 0, NULL, NULL, '1'),
(22, 7, '<p>An order awarding the tender to the Applicant at its Bid Price of Kshs. 70,027,204.50</p>\n', 'Requested Orders', 'Pending Review', 'P0123456788X', '2019-11-12 16:46:39', NULL, NULL, 1, '2019-11-12 16:46:44', 'P0123456788X', '3'),
(23, 7, '<p>An order awarding the tender to the Applicant at its Bid Price of Kshs. 70,027,204.50</p>\n', 'Requested Orders', 'Pending Review', 'P0123456788X', '2019-11-12 16:46:51', NULL, NULL, 0, NULL, NULL, '2'),
(24, 7, '<p>A further order or direction as the Board may deem appropriate in the circumstances</p>\n', 'Requested Orders', 'Pending Review', 'P0123456788X', '2019-11-12 16:47:08', NULL, NULL, 0, NULL, NULL, '3'),
(25, 10, '<p><em>Preparation</em>&nbsp;definition is - the action or process of making something ready for use or service or of getting ready for some occasion, test, or duty. How to use&nbsp;.</p>\n', 'Grounds for Appeal', 'Pending Review', 'P0123456788X', '2019-11-13 11:14:42', NULL, NULL, 0, NULL, NULL, '1'),
(26, 10, '<p><em>Preparation</em>&nbsp;definition is - the action or process of making something ready for use or service or of getting ready for some occasion, test, or duty. How to use&nbsp;.</p>\n', 'Requested Orders', 'Pending Review', 'P0123456788X', '2019-11-13 11:14:46', NULL, NULL, 0, NULL, NULL, '1'),
(27, 15, '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Don</p>\n', 'Grounds for Appeal', 'Pending Review', 'P09875345W', '2019-11-13 17:17:02', NULL, NULL, 0, NULL, NULL, '1'),
(28, 15, '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Don</p>\n', 'Requested Orders', 'Pending Review', 'P09875345W', '2019-11-13 17:17:09', NULL, NULL, 0, NULL, NULL, '2'),
(29, 16, '<p><em>he applicant risks losing his deposit, and in addition to this if found to be corrupt/ fraudulent, the DG of PPRA may initiate case proceedings against the applicant in a court of law.</em></p>\n', 'Grounds for Appeal', 'Pending Review', 'P0123456788X', '2019-11-14 14:45:16', NULL, NULL, 0, NULL, NULL, '1'),
(30, 16, '<p><em>he applicant risks losing his deposit, and in addition to this if found to be corrupt/ fraudulent, the DG of PPRA may initiate case proceedings against the applicant in a court of law.</em></p>\n', 'Requested Orders', 'Pending Review', 'P0123456788X', '2019-11-14 14:45:20', NULL, NULL, 0, NULL, NULL, '1'),
(31, 17, '<p>&nbsp;Challanging the Content of Tender documents</p>\n', 'Grounds for Appeal', 'Pending Review', 'P123456879Q', '2019-11-15 10:58:03', NULL, NULL, 0, NULL, NULL, '1'),
(32, 17, '<p>Challanging termination of process</p>\n', 'Grounds for Appeal', 'Pending Review', 'P123456879Q', '2019-11-15 10:58:48', NULL, NULL, 0, NULL, NULL, '2'),
(33, 17, '<p>Termination to be anuled</p>\n', 'Requested Orders', 'Pending Review', 'P123456879Q', '2019-11-15 10:59:33', NULL, NULL, 0, NULL, NULL, '1'),
(34, 17, '<p>Cancellation of the tender documentt</p>\n', 'Requested Orders', 'Pending Review', 'P123456879Q', '2019-11-15 11:00:22', NULL, NULL, 0, NULL, NULL, '2'),
(35, 17, '<p>&nbsp; Cost of the review Application</p>\n', 'Requested Orders', 'Pending Review', 'P123456879Q', '2019-11-15 11:01:04', NULL, NULL, 0, NULL, NULL, '2'),
(36, 18, '<p>P0123456788X</p>\n', 'Grounds for Appeal', 'Pending Review', 'P0123456788X', '2019-11-15 11:50:05', NULL, NULL, 0, NULL, NULL, '1'),
(37, 18, '<p>P0123456788X</p>\n', 'Requested Orders', 'Pending Review', 'P0123456788X', '2019-11-15 11:50:15', NULL, NULL, 0, NULL, NULL, '3'),
(38, 19, '<p><em>Whitespace &ndash;</em>&nbsp;Polygon&rsquo;s articles feature long-scrolling, untraditional layouts that break up the dense bodies of text into digestible chunks with&nbsp;<a href=\"https://www.polygon.com/game/halo-4/2204\" target=\"_blank\">huge, beautiful imagery</a>, akin to custom-designed magazine spreads. Here, the content in each article has been intentionally laid out, instead of simply &ldquo;pasted &amp; posted&rdquo; into a one-size-fits-all template.</p>\n', 'Grounds for Appeal', 'Pending Review', 'P09875345W', '2019-11-19 15:06:44', NULL, NULL, 0, NULL, NULL, '3435'),
(39, 19, '<p><em>Whitespace &ndash;</em>&nbsp;Polygon&rsquo;s articles feature long-scrolling, untraditional layouts that break up the dense bodies of text into digestible chunks with&nbsp;<a href=\"https://www.polygon.com/game/halo-4/2204\" target=\"_blank\">huge, beautiful imagery</a>, akin to custom-designed magazine spreads. Here, the content in each article has been intentionally laid out, instead of simply &ldquo;pasted &amp; posted&rdquo; into a one-size-fits-all template.</p>\n', 'Requested Orders', 'Pending Review', 'P09875345W', '2019-11-19 15:06:53', NULL, NULL, 0, NULL, NULL, '3049494');

-- --------------------------------------------------------

--
-- Table structure for table `groundsandrequestedordershistory`
--

CREATE TABLE `groundsandrequestedordershistory` (
  `ID` bigint(20) NOT NULL,
  `ApplicationID` int(100) NOT NULL,
  `EntryType` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(4) DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `groupaccess`
--

CREATE TABLE `groupaccess` (
  `UserGroupID` bigint(20) NOT NULL,
  `RoleID` bigint(20) NOT NULL,
  `Edit` tinyint(1) NOT NULL,
  `Remove` tinyint(1) NOT NULL,
  `AddNew` tinyint(1) NOT NULL,
  `View` tinyint(1) NOT NULL,
  `Export` tinyint(1) NOT NULL,
  `UpdateBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreateBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `Deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=142 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `groupaccess`
--

INSERT INTO `groupaccess` (`UserGroupID`, `RoleID`, `Edit`, `Remove`, `AddNew`, `View`, `Export`, `UpdateBy`, `CreateBy`, `CreatedAt`, `UpdatedAt`, `Deleted`) VALUES
(1, 17, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-20 14:34:39', '2019-07-20 14:36:43', 0),
(1, 18, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-20 14:36:13', '2019-07-20 14:36:44', 0),
(1, 19, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-20 14:36:14', '2019-07-20 14:36:44', 0),
(1, 20, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-20 14:36:17', '2019-07-20 14:36:45', 0),
(1, 21, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-20 14:35:08', '2019-07-20 14:36:46', 0),
(1, 22, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 12:05:11', '2019-09-06 16:41:10', 0),
(1, 23, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-07-26 12:05:12', '2019-07-26 12:05:12', 0),
(1, 24, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 12:05:13', '2019-09-11 11:12:56', 0),
(1, 25, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 12:05:14', '2019-09-11 11:12:56', 0),
(1, 26, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 12:05:14', '2019-09-11 11:12:57', 0),
(1, 27, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 12:05:14', '2019-09-11 11:12:57', 0),
(1, 28, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 12:05:15', '2019-11-13 13:45:47', 0),
(1, 29, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-07-29 09:48:18', '2019-07-29 09:48:20', 0),
(1, 30, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-09 11:42:39', '2019-09-06 16:41:08', 0),
(1, 31, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-07-29 14:07:57', '2019-07-29 14:08:04', 0),
(1, 32, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-31 16:59:31', '2019-09-06 16:41:14', 0),
(1, 33, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-01 10:22:15', '2019-09-06 16:41:18', 0),
(1, 34, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-08-01 10:25:32', '2019-09-06 16:41:30', 0),
(1, 35, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-01 10:49:22', '2019-11-13 13:45:49', 0),
(1, 36, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-08-01 11:41:41', '2019-09-06 16:41:31', 0),
(1, 37, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-08-01 13:32:59', '2019-09-06 16:41:32', 0),
(1, 38, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-08-05 14:07:05', '2019-09-06 16:41:33', 0),
(1, 39, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-05 14:44:42', '2019-09-11 11:13:06', 0),
(1, 40, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-06 14:20:38', '2019-09-11 11:13:06', 0),
(1, 41, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-06 14:34:37', '2019-09-11 11:13:07', 0),
(1, 42, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-09 11:42:39', '2019-09-11 11:13:13', 0),
(1, 43, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-14 10:23:35', '2019-09-11 11:13:12', 0),
(1, 44, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-14 15:57:42', '2019-09-11 11:13:11', 0),
(1, 45, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-14 15:57:43', '2019-09-11 11:13:10', 0),
(1, 46, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-21 18:01:27', '2019-09-06 16:41:08', 0),
(1, 47, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-23 12:01:49', '2019-09-11 11:13:00', 0),
(1, 48, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-23 12:01:50', '2019-09-11 11:12:51', 0),
(1, 49, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-09 09:47:19', '2019-09-09 09:47:50', 0),
(1, 50, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-11 10:46:42', '2019-09-11 10:46:45', 0),
(1, 51, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-11 11:12:47', '2019-09-11 11:12:50', 0),
(1, 52, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-12 09:47:41', '2019-09-12 09:47:44', 0),
(1, 53, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-13 10:05:09', '2019-09-13 10:05:13', 0),
(1, 54, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-17 09:41:39', '2019-09-17 09:41:43', 0),
(1, 55, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-18 10:04:16', '2019-09-18 10:04:20', 0),
(1, 56, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-23 14:28:51', '2019-09-23 14:28:57', 0),
(1, 57, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-24 11:09:37', '2019-09-24 11:09:41', 0),
(1, 58, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-27 12:21:03', '2019-09-27 12:21:06', 0),
(1, 59, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-10-01 11:03:32', '2019-10-01 11:03:36', 0),
(1, 60, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-10-09 10:57:15', '2019-10-09 10:57:20', 0),
(1, 61, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-10-15 17:09:17', '2019-10-15 17:09:21', 0),
(1, 62, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-10-22 14:57:23', '2019-10-22 14:57:25', 0),
(1, 63, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-07 15:55:53', '2019-11-07 15:55:57', 0),
(1, 64, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-07 15:53:55', '2019-11-07 15:53:59', 0),
(7, 20, 0, 0, 1, 0, 0, 'Admin', 'Admin', '2019-07-26 15:20:23', '2019-07-26 15:20:23', 0),
(7, 21, 0, 0, 0, 0, 0, 'Admin', 'Admin', '2019-07-20 14:35:36', '2019-07-26 15:20:21', 0),
(7, 27, 0, 0, 1, 0, 0, 'Admin', 'Admin', '2019-07-26 15:20:27', '2019-07-26 15:20:27', 0),
(7, 29, 0, 0, 1, 0, 0, 'Admin', 'Admin', '2019-07-26 15:20:25', '2019-07-26 15:20:25', 0),
(7, 36, 0, 0, 1, 0, 0, 'Admin', 'Admin', '2019-08-08 10:07:07', '2019-08-08 10:07:07', 0),
(7, 37, 0, 0, 1, 0, 0, 'Admin', 'Admin', '2019-08-08 10:07:08', '2019-08-08 10:07:08', 0),
(7, 38, 0, 0, 1, 0, 0, 'Admin', 'Admin', '2019-08-08 10:07:09', '2019-08-08 10:07:09', 0),
(7, 39, 0, 0, 1, 0, 0, 'Admin', 'Admin', '2019-08-08 10:07:10', '2019-08-08 10:07:10', 0),
(7, 40, 0, 0, 1, 0, 0, 'Admin', 'Admin', '2019-08-08 10:07:10', '2019-08-08 10:07:10', 0),
(8, 26, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-11-07 13:54:55', '2019-11-07 13:54:55', 0),
(8, 32, 1, 1, 0, 1, 1, 'Admin', 'Admin', '2019-08-16 17:21:00', '2019-08-16 17:22:55', 0),
(8, 33, 0, 0, 0, 0, 0, 'Admin', 'Admin', '2019-10-29 10:55:41', '2019-10-29 10:55:42', 0),
(8, 36, 1, 1, 0, 1, 1, 'Admin', 'Admin', '2019-08-16 17:22:19', '2019-08-16 17:22:57', 0),
(8, 38, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-08-16 17:22:31', '2019-08-16 17:22:34', 0),
(8, 40, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-08-16 17:22:40', '2019-08-16 17:22:40', 0),
(8, 41, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-08-16 17:22:42', '2019-08-16 17:22:42', 0),
(8, 42, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-08-16 17:22:45', '2019-08-16 17:22:45', 0),
(8, 43, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-08-16 17:22:49', '2019-08-16 17:22:49', 0),
(8, 44, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-16 17:02:21', '2019-08-16 17:02:29', 0),
(8, 45, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-16 17:02:20', '2019-08-16 17:02:29', 0),
(8, 47, 1, 0, 1, 1, 1, 'Admin', 'Admin', '2019-10-29 10:56:15', '2019-10-29 10:56:20', 0),
(8, 50, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-11-07 14:01:08', '2019-11-07 14:01:08', 0),
(8, 51, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-11-07 14:01:20', '2019-11-07 14:01:20', 0),
(8, 55, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-11-07 14:01:09', '2019-11-07 14:01:09', 0),
(8, 56, 1, 0, 1, 1, 1, 'Admin', 'Admin', '2019-09-23 11:59:42', '2019-09-23 11:59:48', 0),
(8, 57, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-24 11:10:20', '2019-09-24 11:10:25', 0),
(8, 58, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-10-22 14:57:57', '2019-10-22 14:58:00', 0),
(8, 62, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-10-22 14:57:51', '2019-10-22 14:57:54', 0),
(9, 24, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:28:34', '2019-11-11 15:28:38', 0),
(9, 25, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:28:39', '2019-11-11 15:28:45', 0),
(9, 26, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:28:46', '2019-11-11 15:28:49', 0),
(9, 27, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:28:52', '2019-11-11 15:28:57', 0),
(9, 28, 0, 0, 1, 1, 0, 'Admin', 'Admin', '2019-11-13 14:30:21', '2019-11-13 14:30:22', 0),
(9, 33, 0, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:27:05', '2019-11-11 15:27:07', 0),
(9, 35, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:27:18', '2019-11-11 15:27:20', 0),
(9, 36, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:27:25', '2019-11-11 15:27:27', 0),
(9, 37, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:27:29', '2019-11-11 15:27:32', 0),
(9, 38, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:27:33', '2019-11-11 15:27:37', 0),
(9, 39, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:27:39', '2019-11-11 15:27:41', 0),
(9, 40, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:27:42', '2019-11-11 15:27:45', 0),
(9, 42, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:27:55', '2019-11-11 15:27:58', 0),
(9, 43, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-11-11 15:28:04', '2019-11-11 15:28:04', 0),
(9, 44, 0, 1, 0, 1, 0, 'Admin', 'Admin', '2019-11-11 15:28:11', '2019-11-11 15:28:18', 0),
(9, 45, 0, 1, 0, 1, 0, 'Admin', 'Admin', '2019-11-11 15:28:14', '2019-11-11 15:28:17', 0),
(9, 46, 1, 1, 0, 0, 1, 'Admin', 'Admin', '2019-11-11 15:26:18', '2019-11-11 15:26:33', 0),
(9, 47, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:28:58', '2019-11-11 15:29:02', 0),
(9, 48, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:29:03', '2019-11-11 15:29:07', 0),
(9, 49, 0, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:26:35', '2019-11-11 15:26:38', 0),
(9, 50, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:28:20', '2019-11-11 15:28:24', 0),
(9, 51, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:29:10', '2019-11-11 15:29:15', 0),
(9, 52, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:29:17', '2019-11-11 15:29:21', 0),
(9, 53, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:26:43', '2019-11-11 15:26:45', 0),
(9, 54, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:29:23', '2019-11-11 15:29:28', 0),
(9, 55, 0, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:28:29', '2019-11-11 15:28:31', 0),
(9, 56, 0, 1, 0, 1, 0, 'Admin', 'Admin', '2019-11-11 15:29:34', '2019-11-11 15:29:41', 0),
(9, 57, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:29:36', '2019-11-11 15:29:39', 0),
(9, 58, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:30:22', '2019-11-11 15:30:25', 0),
(9, 59, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:29:43', '2019-11-11 15:29:45', 0),
(9, 60, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:26:54', '2019-11-11 15:26:57', 0),
(9, 61, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:29:49', '2019-11-11 15:29:56', 0),
(9, 62, 0, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:30:07', '2019-11-11 15:30:08', 0),
(9, 63, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:30:10', '2019-11-11 15:30:13', 0),
(9, 64, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:30:14', '2019-11-11 15:30:18', 0),
(11, 24, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-11-13 14:33:50', '2019-11-13 14:33:50', 0),
(11, 25, 0, 0, 0, 0, 0, 'Admin', 'Admin', '2019-11-13 14:33:48', '2019-11-13 14:33:49', 0),
(11, 28, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-11-13 14:34:25', '2019-11-13 14:34:27', 0),
(11, 61, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-13 14:34:10', '2019-11-13 14:34:14', 0);

-- --------------------------------------------------------

--
-- Table structure for table `hearingattachments`
--

CREATE TABLE `hearingattachments` (
  `ID` int(11) NOT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Name` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Path` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `UploadedOn` datetime NOT NULL,
  `UploadedBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `DeletedBy` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=5461 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hearingattachments`
--

INSERT INTO `hearingattachments` (`ID`, `ApplicationNo`, `Name`, `Description`, `Path`, `Category`, `UploadedOn`, `UploadedBy`, `Deleted`, `DeletedBy`) VALUES
(1, '17 OF 2019', '1573751119773-6 OF 2019.pdf', 'REPORT', 'http://74.208.157.60:3001/HearingAttachments/Documents', 'Documents', '2019-11-14 17:05:20', 'Admin', 1, 'Admin'),
(2, '17 OF 2019', '1573751176263-Kanye West - -128.mp3', 'AUDIO', 'http://74.208.157.60:3001/HearingAttachments/Audios', 'Audio', '2019-11-14 17:06:16', 'Admin', 0, NULL),
(3, '17 OF 2019', '1573751270229-Short video clip-nature.mp4-SD.mp4', 'VIDEO', 'http://74.208.157.60:3001/HearingAttachments/Vedios', 'Vedio', '2019-11-14 17:07:50', 'Admin', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `hearingnotices`
--

CREATE TABLE `hearingnotices` (
  `ID` int(11) NOT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DateGenerated` datetime DEFAULT NULL,
  `DateSent` datetime DEFAULT NULL,
  `Path` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Filename` varchar(105) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=4096 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `hearingnotices`
--

INSERT INTO `hearingnotices` (`ID`, `ApplicationNo`, `DateGenerated`, `DateSent`, `Path`, `Filename`, `Created_By`) VALUES
(1, '17 OF 2019', '2019-11-14 16:34:34', '2019-11-14 16:36:36', 'HearingNotices/', '17 OF 2019.pdf', 'Admin'),
(2, '18 OF 2019', '2019-11-15 12:34:58', '2019-11-15 12:58:37', 'HearingNotices/', '18 OF 2019.pdf', 'Admin'),
(3, '18 OF 2019', '2019-11-15 12:46:09', '2019-11-15 12:58:37', 'HearingNotices/', '18 OF 2019.pdf', 'Admin'),
(4, '18 OF 2019', '2019-11-15 12:58:29', '2019-11-15 12:58:37', 'HearingNotices/', '18 OF 2019.pdf', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `interestedparties`
--

CREATE TABLE `interestedparties` (
  `ID` int(11) NOT NULL,
  `Name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ApplicationID` int(11) DEFAULT NULL,
  `ContactName` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `TelePhone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Mobile` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PhysicalAddress` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PostalCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Town` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `POBox` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Create_at` datetime NOT NULL,
  `Update_at` datetime DEFAULT NULL,
  `Deleted` tinyint(1) NOT NULL,
  `CreatedBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `UpdatedBy` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Designation` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=4096 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `interestedparties`
--

INSERT INTO `interestedparties` (`ID`, `Name`, `ApplicationID`, `ContactName`, `Email`, `TelePhone`, `Mobile`, `PhysicalAddress`, `PostalCode`, `Town`, `POBox`, `Create_at`, `Update_at`, `Deleted`, `CreatedBy`, `UpdatedBy`, `Designation`) VALUES
(1, 'INTERESTED PARTY LTD', 1, 'WILSON K', 'wkerebei@wilcom.co.ke', '0122718412', '0122718412', '2nd Floor, Elysee Plaza', '00101', 'Nairobi', '10123', '2019-11-11 15:58:40', NULL, 0, 'P0123456788X', NULL, NULL),
(2, 'Wilcom Systems', 5, 'Elvis Kimutai', 'cmkikungu@gmail.com', '0701102928', '0701102928', 'Nairobi', '0701102928', 'Nairobi', '1234', '2019-11-12 11:21:59', NULL, 0, 'P0123456788X', NULL, NULL),
(3, 'WilCom Systems Ltd', 6, 'WILSON K', 'wkerebei@gmail.com', '0722719412', '0722719412', 'P.O BOX 102678', '00101', 'Nairobi', '12', '2019-11-12 15:48:28', NULL, 0, 'P0123456788X', NULL, NULL),
(4, 'WilCom Systems Ltd', 7, 'JAMES MOSH', 'wkerebei@gmail.com', '07227194121', '0722719412', 'P.O BOX 102678', '00101', 'Nairobi', '123', '2019-11-12 16:47:51', NULL, 0, 'P0123456788X', NULL, NULL),
(5, 'WilCom Systems Ltd', 7, 'JAMES MOSH', 'wkerebei@gmail.com', '0722719412', '0722719412', 'P.O BOX 102678', '00101', 'Nairobi', '1233', '2019-11-12 17:21:56', NULL, 0, 'A123456789X', NULL, NULL),
(6, 'Wilcom Systems', 10, 'Elvis Kimutai', 'cmkikungu@gmail.com', '0701102928', '0701102928', 'Nairobi', '0701102928', 'Nairobi', '123', '2019-11-13 11:55:33', NULL, 0, 'A123456789U', NULL, NULL),
(7, 'Wilcom Syustems', 15, 'Elvis', 'ekimutai810@gmail.com', '0705555285', '0705555285', 'Nairobi', '30106', 'Nairobi', '123', '2019-11-13 18:30:00', NULL, 0, 'A123456789X', NULL, NULL),
(8, 'ECTA KENYA LIMITED', 17, '224687', 'pjokumu@hotmail.com', '2389347457', '0734470491', 'Landmawe', '00100', 'Nairobi', '3456', '2019-11-15 12:05:39', NULL, 0, 'P65498745R', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `issuesfordetermination`
--

CREATE TABLE `issuesfordetermination` (
  `ID` int(11) NOT NULL,
  `NO` int(11) DEFAULT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Description` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=4096 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `issuesfordetermination`
--

INSERT INTO `issuesfordetermination` (`ID`, `NO`, `ApplicationNo`, `Description`, `Created_At`, `Deleted`, `Created_By`, `Deleted_By`, `Deleted_At`) VALUES
(6, 1, '7 OF 2019', '<p>Issues:&nbsp;rowsIssues:&nbsp;rowsIssues:&nbsp;rowsIssues:&nbsp;rows</p>\n', '2019-11-05 16:52:26', 1, 'Admin', NULL, NULL),
(7, 1, '7 OF 2019', '<p>Issues:&nbsp;rowsIssues:&nbsp;rowsIssues:&nbsp;rowsIssues:&nbsp;rows</p>\n', '2019-11-05 17:03:04', 1, 'Admin', NULL, NULL),
(8, 2, '7 OF 2019', '<p>Lorem ipsum dolor sit amet,&nbsp;</p>\n', '2019-11-05 17:03:49', 1, 'Admin', NULL, NULL),
(9, 1, '7 OF 2019', '<p>Issues:&nbsp;rowsIssues:&nbsp;rowsIssues:&nbsp;rowsIssues:&nbsp;rows</p>\n', '2019-11-05 17:05:47', 1, 'Admin', NULL, NULL),
(10, 1, '7 OF 2019', '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>\n', '2019-11-06 15:10:12', 0, 'Admin', NULL, NULL),
(11, 2, '7 OF 2019', '<p>Lorem ipsum dolor sit amet,&nbsp;</p>\n', '2019-11-06 15:10:20', 0, 'Admin', NULL, NULL),
(12, 1, '11 OF 2019', '<p>Whereas Wilcom Systems the applicant herein has instituted a complaint against MINISTRY OF<br />\nEDUCATION (Procuring Entity or Director General) on 2019-11-11 (Date) particulars of which<br />\nwere set out in a Request for Review served upon you on 2019-11-11 .<br />\nYou are hereby required to appear on the 2019-11-11 at 8.00AM . when the complaint against you<br />\nwill be heard by this Board sitting at Mombasa,Room 1 .<br />\nIf you fail to appear,the Applicant may proceed with the complaint and determination by order of the<br />\nBoard may be made in your absence.</p>\n', '2019-11-11 11:57:44', 0, 'Admin', NULL, NULL),
(13, 2, '11 OF 2019', '<p>Whereas Wilcom Systems the applicant herein has instituted a complaint against MINISTRY OF<br />\nEDUCATION (Procuring Entity or Director General) on 2019-11-11 (Date) particulars of which<br />\nwere set out in a Request for Review served upon you on 2019-11-11 .<br />\nYou are hereby required to appear on the 2019-11-11 at 8.00AM . when the complaint against you<br />\nwill be heard by this Board sitting at Mombasa,Room 1 .<br />\nIf you fail to appear,the Applicant may proceed with the complaint and determination by order of the<br />\nBoard may be made in your absence.</p>\n', '2019-11-11 11:57:50', 0, 'Admin', NULL, NULL),
(14, 1, '18 OF 2019', '<p>Usue One</p>\n', '2019-11-15 13:51:54', 0, 'Admin', NULL, NULL),
(15, 1, '18 OF 2019', '<p>dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nib</p>\n', '2019-11-15 14:00:14', 0, 'Admin', NULL, NULL),
(16, 2, '18 OF 2019', '<p>dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nib</p>\n', '2019-11-15 14:00:23', 0, 'Admin', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `membertypes`
--

CREATE TABLE `membertypes` (
  `ID` bigint(20) NOT NULL,
  `Code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=8192 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `membertypes`
--

INSERT INTO `membertypes` (`ID`, `Code`, `Description`, `Created_At`, `Created_By`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_By`) VALUES
(1, 'COMT-1', 'Default Member', '2019-08-05 16:11:21', 'Admin', '2019-08-05 16:11:21', 'Admin', 1, 'Admin'),
(2, 'COMT-2', 'Default members', '2019-08-09 17:48:49', 'Admin', '2019-08-27 17:19:25', 'Admin', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `mpesatransactions`
--

CREATE TABLE `mpesatransactions` (
  `TransactionType` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TransID` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TransTime` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TransAmount` float DEFAULT NULL,
  `BusinessShortCode` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `BillRefNumber` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `InvoiceNumber` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `OrgAccountBalance` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ThirdPartyTransID` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MSISDN` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FirstName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `MiddleName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `LastName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Confirmed` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `notifications`
--

CREATE TABLE `notifications` (
  `ID` int(11) NOT NULL,
  `Username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(250) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Created_At` datetime NOT NULL,
  `DueDate` datetime NOT NULL,
  `Status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=309 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `notifications`
--

INSERT INTO `notifications` (`ID`, `Username`, `Category`, `Description`, `Created_At`, `DueDate`, `Status`) VALUES
(1, 'Admin', 'Applications Fees Approval', 'Applications pending fees approval', '2019-11-11 16:10:58', '2019-11-14 16:10:58', 'Resolved'),
(2, 'Admin2', 'Applications Fees Approval', 'Applications pending fees approval', '2019-11-11 16:10:58', '2019-11-14 16:10:58', 'Resolved'),
(3, 'PPRA01', 'Applications Fees Approval', 'Applications pending fees approval', '2019-11-11 16:10:58', '2019-11-14 16:10:58', 'Resolved'),
(4, 'CASEOFFICER01', 'Applications Fees Approval', 'Applications pending fees approval', '2019-11-11 16:10:58', '2019-11-14 16:10:58', 'Resolved'),
(8, 'Admin', 'Applications Approval', 'Applications pending approval', '2019-11-11 16:15:44', '2019-11-14 16:15:44', 'Resolved'),
(9, 'Admin2', 'Applications Approval', 'Applications pending approval', '2019-11-11 16:15:44', '2019-11-14 16:15:44', 'Resolved'),
(10, 'PPRA01', 'Applications Approval', 'Applications pending approval', '2019-11-11 16:15:44', '2019-11-14 16:15:44', 'Resolved'),
(11, 'CASEOFFICER01', 'Applications Approval', 'Applications pending approval', '2019-11-11 16:15:44', '2019-11-14 16:15:44', 'Resolved'),
(15, 'Admin', 'Deadline Approval', 'Deadline Approval Request', '2019-11-11 17:31:46', '2019-11-14 17:31:46', 'Resolved'),
(16, 'Admin2', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-11 17:43:26', '2019-11-14 17:43:26', 'Not Resolved'),
(17, 'Admin', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-11 17:43:26', '2019-11-14 17:43:26', 'Resolved'),
(18, 'CASEOFFICER01', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-11 17:43:26', '2019-11-14 17:43:26', 'Not Resolved'),
(19, 'PPRA01', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-11 17:43:26', '2019-11-14 17:43:26', 'Resolved'),
(23, 'Admin2', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-11 18:01:21', '2019-11-14 18:01:21', 'Not Resolved'),
(24, 'Admin', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-11 18:01:21', '2019-11-14 18:01:21', 'Resolved'),
(25, 'CASEOFFICER01', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-11 18:01:21', '2019-11-14 18:01:21', 'Not Resolved'),
(26, 'PPRA01', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-11 18:01:21', '2019-11-14 18:01:21', 'Not Resolved'),
(30, 'Admin', 'Applications Fees Approval', 'Applications pending fees approval', '2019-11-12 11:24:36', '2019-11-15 11:24:36', 'Resolved'),
(31, 'Admin2', 'Applications Fees Approval', 'Applications pending fees approval', '2019-11-12 11:24:36', '2019-11-15 11:24:36', 'Resolved'),
(32, 'PPRA01', 'Applications Fees Approval', 'Applications pending fees approval', '2019-11-12 11:24:36', '2019-11-15 11:24:36', 'Resolved'),
(33, 'CASEOFFICER01', 'Applications Fees Approval', 'Applications pending fees approval', '2019-11-12 11:24:36', '2019-11-15 11:24:36', 'Resolved'),
(37, 'Admin', 'Applications Approval', 'Applications pending approval', '2019-11-12 11:42:38', '2019-11-15 11:42:38', 'Resolved'),
(38, 'Admin2', 'Applications Approval', 'Applications pending approval', '2019-11-12 11:42:38', '2019-11-15 11:42:38', 'Resolved'),
(39, 'PPRA01', 'Applications Approval', 'Applications pending approval', '2019-11-12 11:42:38', '2019-11-15 11:42:38', 'Resolved'),
(40, 'CASEOFFICER01', 'Applications Approval', 'Applications pending approval', '2019-11-12 11:42:38', '2019-11-15 11:42:38', 'Resolved'),
(44, 'Admin2', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-12 14:57:29', '2019-11-15 14:57:29', 'Not Resolved'),
(45, 'Admin', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-12 14:57:29', '2019-11-15 14:57:29', 'Resolved'),
(46, 'CASEOFFICER01', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-12 14:57:29', '2019-11-15 14:57:29', 'Not Resolved'),
(47, 'PPRA01', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-12 14:57:29', '2019-11-15 14:57:29', 'Not Resolved'),
(51, 'Admin', 'Applications Fees Approval', 'Applications pending fees approval', '2019-11-12 15:51:39', '2019-11-15 15:51:39', 'Resolved'),
(52, 'Admin2', 'Applications Fees Approval', 'Applications pending fees approval', '2019-11-12 15:51:39', '2019-11-15 15:51:39', 'Resolved'),
(53, 'PPRA01', 'Applications Fees Approval', 'Applications pending fees approval', '2019-11-12 15:51:39', '2019-11-15 15:51:39', 'Resolved'),
(54, 'CASEOFFICER01', 'Applications Fees Approval', 'Applications pending fees approval', '2019-11-12 15:51:39', '2019-11-15 15:51:39', 'Resolved'),
(58, 'Admin', 'Applications Approval', 'Applications pending approval', '2019-11-12 15:55:25', '2019-11-15 15:55:25', 'Resolved'),
(59, 'Admin2', 'Applications Approval', 'Applications pending approval', '2019-11-12 15:55:25', '2019-11-15 15:55:25', 'Resolved'),
(60, 'PPRA01', 'Applications Approval', 'Applications pending approval', '2019-11-12 15:55:25', '2019-11-15 15:55:25', 'Resolved'),
(61, 'CASEOFFICER01', 'Applications Approval', 'Applications pending approval', '2019-11-12 15:55:25', '2019-11-15 15:55:25', 'Resolved'),
(65, 'Admin', 'Case withdrawal Approval', 'Case withdrawal pending approval', '2019-11-12 15:58:30', '2019-11-15 15:58:30', 'Resolved'),
(66, 'Admin2', 'Case withdrawal Approval', 'Case withdrawal pending approval', '2019-11-12 15:58:30', '2019-11-15 15:58:30', 'Not Resolved'),
(67, 'CASEOFFICER01', 'Case withdrawal Approval', 'Case withdrawal pending approval', '2019-11-12 15:58:30', '2019-11-15 15:58:30', 'Not Resolved'),
(68, 'PPRA01', 'Case withdrawal Approval', 'Case withdrawal pending approval', '2019-11-12 15:58:30', '2019-11-15 15:58:30', 'Not Resolved'),
(72, 'Admin', 'Applications Fees Approval', 'Applications pending fees approval', '2019-11-12 16:52:41', '2019-11-15 16:52:41', 'Resolved'),
(73, 'Admin2', 'Applications Fees Approval', 'Applications pending fees approval', '2019-11-12 16:52:41', '2019-11-15 16:52:41', 'Resolved'),
(74, 'PPRA01', 'Applications Fees Approval', 'Applications pending fees approval', '2019-11-12 16:52:41', '2019-11-15 16:52:41', 'Resolved'),
(75, 'CASEOFFICER01', 'Applications Fees Approval', 'Applications pending fees approval', '2019-11-12 16:52:41', '2019-11-15 16:52:41', 'Resolved'),
(79, 'Admin', 'Applications Approval', 'Applications pending approval', '2019-11-12 17:00:55', '2019-11-15 17:00:55', 'Resolved'),
(80, 'Admin2', 'Applications Approval', 'Applications pending approval', '2019-11-12 17:00:55', '2019-11-15 17:00:55', 'Resolved'),
(81, 'PPRA01', 'Applications Approval', 'Applications pending approval', '2019-11-12 17:00:55', '2019-11-15 17:00:55', 'Resolved'),
(82, 'CASEOFFICER01', 'Applications Approval', 'Applications pending approval', '2019-11-12 17:00:55', '2019-11-15 17:00:55', 'Resolved'),
(86, 'Admin', 'Deadline Approval', 'Deadline Approval Request', '2019-11-12 17:15:50', '2019-11-15 17:15:50', 'Resolved'),
(87, 'Admin', 'Applications Fees Approval', 'Applications pending fees approval', '2019-11-12 17:25:08', '2019-11-15 17:25:08', 'Resolved'),
(88, 'Admin2', 'Applications Fees Approval', 'Applications pending fees approval', '2019-11-12 17:25:08', '2019-11-15 17:25:08', 'Resolved'),
(89, 'PPRA01', 'Applications Fees Approval', 'Applications pending fees approval', '2019-11-12 17:25:08', '2019-11-15 17:25:08', 'Resolved'),
(90, 'CASEOFFICER01', 'Applications Fees Approval', 'Applications pending fees approval', '2019-11-12 17:25:08', '2019-11-15 17:25:08', 'Resolved'),
(94, 'Admin', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-13 11:24:41', '2019-11-16 11:24:41', 'Resolved'),
(95, 'Admin2', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-13 11:24:41', '2019-11-16 11:24:41', 'Resolved'),
(96, 'PPRA01', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-13 11:24:41', '2019-11-16 11:24:41', 'Resolved'),
(97, 'CASEOFFICER01', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-13 11:24:41', '2019-11-16 11:24:41', 'Resolved'),
(101, 'Admin', 'Applications Approval', 'Applications pending approval', '2019-11-13 11:28:09', '2019-11-16 11:28:09', 'Resolved'),
(102, 'Admin2', 'Applications Approval', 'Applications pending approval', '2019-11-13 11:28:09', '2019-11-16 11:28:09', 'Resolved'),
(103, 'PPRA01', 'Applications Approval', 'Applications pending approval', '2019-11-13 11:28:09', '2019-11-16 11:28:09', 'Resolved'),
(104, 'CASEOFFICER01', 'Applications Approval', 'Applications pending approval', '2019-11-13 11:28:09', '2019-11-16 11:28:09', 'Resolved'),
(108, 'Admin', 'Applications Approval', 'Applications pending approval', '2019-11-13 11:32:12', '2019-11-16 11:32:12', 'Resolved'),
(109, 'Admin2', 'Applications Approval', 'Applications pending approval', '2019-11-13 11:32:12', '2019-11-16 11:32:12', 'Resolved'),
(110, 'PPRA01', 'Applications Approval', 'Applications pending approval', '2019-11-13 11:32:12', '2019-11-16 11:32:12', 'Resolved'),
(111, 'CASEOFFICER01', 'Applications Approval', 'Applications pending approval', '2019-11-13 11:32:12', '2019-11-16 11:32:12', 'Resolved'),
(115, 'Admin', 'Preliminary Objecions Fees Approval', 'Preliminary objection fees pending confirmation', '2019-11-13 11:56:03', '2019-11-16 11:56:03', 'Resolved'),
(116, 'Admin2', 'Preliminary Objecions Fees Approval', 'Preliminary objection fees pending confirmation', '2019-11-13 11:56:03', '2019-11-16 11:56:03', 'Resolved'),
(117, 'PPRA01', 'Preliminary Objecions Fees Approval', 'Preliminary objection fees pending confirmation', '2019-11-13 11:56:03', '2019-11-16 11:56:03', 'Resolved'),
(118, 'CASEOFFICER01', 'Preliminary Objecions Fees Approval', 'Preliminary objection fees pending confirmation', '2019-11-13 11:56:03', '2019-11-16 11:56:03', 'Resolved'),
(122, 'Admin2', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-13 12:26:37', '2019-11-16 12:26:37', 'Not Resolved'),
(123, 'Admin', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-13 12:26:37', '2019-11-16 12:26:37', 'Not Resolved'),
(124, 'CASEOFFICER01', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-13 12:26:37', '2019-11-16 12:26:37', 'Not Resolved'),
(125, 'PPRA01', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-13 12:26:37', '2019-11-16 12:26:37', 'Not Resolved'),
(129, 'Admin', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-13 17:19:00', '2019-11-16 17:19:00', 'Resolved'),
(130, 'Admin2', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-13 17:19:00', '2019-11-16 17:19:00', 'Resolved'),
(131, 'PPRA01', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-13 17:19:00', '2019-11-16 17:19:00', 'Resolved'),
(132, 'CASEOFFICER01', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-13 17:19:00', '2019-11-16 17:19:00', 'Resolved'),
(136, 'Admin', 'Applications Approval', 'Applications pending approval', '2019-11-13 17:31:36', '2019-11-16 17:31:36', 'Resolved'),
(137, 'Admin2', 'Applications Approval', 'Applications pending approval', '2019-11-13 17:31:36', '2019-11-16 17:31:36', 'Resolved'),
(138, 'PPRA01', 'Applications Approval', 'Applications pending approval', '2019-11-13 17:31:36', '2019-11-16 17:31:36', 'Resolved'),
(139, 'CASEOFFICER01', 'Applications Approval', 'Applications pending approval', '2019-11-13 17:31:36', '2019-11-16 17:31:36', 'Resolved'),
(143, 'Admin', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-13 17:49:22', '2019-11-16 17:49:22', 'Resolved'),
(144, 'Admin2', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-13 17:49:22', '2019-11-16 17:49:22', 'Resolved'),
(145, 'PPRA01', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-13 17:49:22', '2019-11-16 17:49:22', 'Resolved'),
(146, 'CASEOFFICER01', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-13 17:49:22', '2019-11-16 17:49:22', 'Resolved'),
(150, 'Admin', 'Applications Approval', 'Applications pending approval', '2019-11-13 17:49:51', '2019-11-16 17:49:51', 'Resolved'),
(151, 'Admin2', 'Applications Approval', 'Applications pending approval', '2019-11-13 17:49:51', '2019-11-16 17:49:51', 'Resolved'),
(152, 'PPRA01', 'Applications Approval', 'Applications pending approval', '2019-11-13 17:49:51', '2019-11-16 17:49:51', 'Resolved'),
(153, 'CASEOFFICER01', 'Applications Approval', 'Applications pending approval', '2019-11-13 17:49:51', '2019-11-16 17:49:51', 'Resolved'),
(157, 'Admin', 'Preliminary Objecions Fees Approval', 'Preliminary objection fees pending confirmation', '2019-11-13 18:30:45', '2019-11-16 18:30:45', 'Resolved'),
(158, 'Admin2', 'Preliminary Objecions Fees Approval', 'Preliminary objection fees pending confirmation', '2019-11-13 18:30:45', '2019-11-16 18:30:45', 'Resolved'),
(159, 'PPRA01', 'Preliminary Objecions Fees Approval', 'Preliminary objection fees pending confirmation', '2019-11-13 18:30:45', '2019-11-16 18:30:45', 'Resolved'),
(160, 'CASEOFFICER01', 'Preliminary Objecions Fees Approval', 'Preliminary objection fees pending confirmation', '2019-11-13 18:30:45', '2019-11-16 18:30:45', 'Resolved'),
(164, 'Admin', 'Preliminary Objecions Fees Approval', 'Preliminary objection fees pending confirmation', '2019-11-13 18:34:00', '2019-11-16 18:34:00', 'Resolved'),
(165, 'Admin2', 'Preliminary Objecions Fees Approval', 'Preliminary objection fees pending confirmation', '2019-11-13 18:34:00', '2019-11-16 18:34:00', 'Resolved'),
(166, 'PPRA01', 'Preliminary Objecions Fees Approval', 'Preliminary objection fees pending confirmation', '2019-11-13 18:34:00', '2019-11-16 18:34:00', 'Resolved'),
(167, 'CASEOFFICER01', 'Preliminary Objecions Fees Approval', 'Preliminary objection fees pending confirmation', '2019-11-13 18:34:00', '2019-11-16 18:34:00', 'Resolved'),
(171, 'Admin2', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-13 18:38:25', '2019-11-16 18:38:25', 'Not Resolved'),
(172, 'Admin', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-13 18:38:25', '2019-11-16 18:38:25', 'Not Resolved'),
(173, 'CASEOFFICER01', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-13 18:38:25', '2019-11-16 18:38:25', 'Not Resolved'),
(174, 'PPRA01', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-13 18:38:25', '2019-11-16 18:38:25', 'Not Resolved'),
(178, 'Admin2', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-14 07:37:50', '2019-11-17 07:37:50', 'Not Resolved'),
(179, 'Admin', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-14 07:37:50', '2019-11-17 07:37:50', 'Not Resolved'),
(180, 'CASEOFFICER01', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-14 07:37:50', '2019-11-17 07:37:50', 'Not Resolved'),
(181, 'PPRA01', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-14 07:37:50', '2019-11-17 07:37:50', 'Not Resolved'),
(185, 'Admin', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-14 14:46:35', '2019-11-17 14:46:35', 'Resolved'),
(186, 'Admin2', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-14 14:46:35', '2019-11-17 14:46:35', 'Resolved'),
(187, 'PPRA01', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-14 14:46:35', '2019-11-17 14:46:35', 'Resolved'),
(188, 'CASEOFFICER01', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-14 14:46:35', '2019-11-17 14:46:35', 'Resolved'),
(192, 'Admin', 'Applications Approval', 'Applications pending approval', '2019-11-14 14:48:40', '2019-11-17 14:48:40', 'Resolved'),
(193, 'Admin2', 'Applications Approval', 'Applications pending approval', '2019-11-14 14:48:40', '2019-11-17 14:48:40', 'Resolved'),
(194, 'PPRA01', 'Applications Approval', 'Applications pending approval', '2019-11-14 14:48:40', '2019-11-17 14:48:40', 'Resolved'),
(195, 'CASEOFFICER01', 'Applications Approval', 'Applications pending approval', '2019-11-14 14:48:40', '2019-11-17 14:48:40', 'Resolved'),
(199, 'Admin', 'Applications Approval', 'Applications pending approval', '2019-11-14 14:48:41', '2019-11-17 14:48:41', 'Resolved'),
(200, 'Admin2', 'Applications Approval', 'Applications pending approval', '2019-11-14 14:48:41', '2019-11-17 14:48:41', 'Resolved'),
(201, 'PPRA01', 'Applications Approval', 'Applications pending approval', '2019-11-14 14:48:41', '2019-11-17 14:48:41', 'Resolved'),
(202, 'CASEOFFICER01', 'Applications Approval', 'Applications pending approval', '2019-11-14 14:48:41', '2019-11-17 14:48:41', 'Resolved'),
(206, 'Admin2', 'Panel Approval', 'Panel Lists Awiting Approval', '2019-11-14 15:52:11', '2019-11-17 15:52:11', 'Not Resolved'),
(207, 'Admin', 'Panel Approval', 'Panel Lists Awiting Approval', '2019-11-14 15:52:11', '2019-11-17 15:52:11', 'Resolved'),
(208, 'CASEOFFICER01', 'Panel Approval', 'Panel Lists Awiting Approval', '2019-11-14 15:52:11', '2019-11-17 15:52:11', 'Not Resolved'),
(209, 'PPRA01', 'Panel Approval', 'Panel Lists Awiting Approval', '2019-11-14 15:52:11', '2019-11-17 15:52:11', 'Resolved'),
(213, 'Admin', 'Case Scheduling', 'Applications Hearing date scheduling', '2019-11-14 16:07:38', '2019-11-17 16:07:38', 'Resolved'),
(214, 'PPRA01', 'Panel Approval', 'Panel Lists Awiting Approval', '2019-11-14 16:14:13', '2019-11-17 16:14:13', 'Not Resolved'),
(215, 'Admin', 'Panel Approval', 'Panel Lists Awiting Approval', '2019-11-14 16:14:13', '2019-11-17 16:14:13', 'Resolved'),
(216, 'CASEOFFICER01', 'Panel Approval', 'Panel Lists Awiting Approval', '2019-11-14 16:14:13', '2019-11-17 16:14:13', 'Not Resolved'),
(217, 'PPRA01', 'Panel Approval', 'Panel Lists Awiting Approval', '2019-11-14 16:14:13', '2019-11-17 16:14:13', 'Not Resolved'),
(221, 'PPRA01', 'Panel Approval', 'Panel Lists Awiting Approval', '2019-11-14 16:16:43', '2019-11-17 16:16:43', 'Not Resolved'),
(222, 'Admin', 'Panel Approval', 'Panel Lists Awiting Approval', '2019-11-14 16:16:43', '2019-11-17 16:16:43', 'Resolved'),
(223, 'CASEOFFICER01', 'Panel Approval', 'Panel Lists Awiting Approval', '2019-11-14 16:16:43', '2019-11-17 16:16:43', 'Not Resolved'),
(224, 'PPRA01', 'Panel Approval', 'Panel Lists Awiting Approval', '2019-11-14 16:16:43', '2019-11-17 16:16:43', 'Not Resolved'),
(228, 'Admin', 'Case Scheduling', 'Applications Hearing date scheduling', '2019-11-14 16:18:53', '2019-11-17 16:18:53', 'Resolved'),
(229, 'Admin', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-15 11:10:01', '2019-11-18 11:10:01', 'Resolved'),
(230, 'PPRA01', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-15 11:10:01', '2019-11-18 11:10:01', 'Resolved'),
(231, 'CASEOFFICER01', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-15 11:10:01', '2019-11-18 11:10:01', 'Resolved'),
(232, 'Admin', 'Applications Approval', 'Applications pending approval', '2019-11-15 11:17:24', '2019-11-18 11:17:24', 'Resolved'),
(233, 'PPRA01', 'Applications Approval', 'Applications pending approval', '2019-11-15 11:17:24', '2019-11-18 11:17:24', 'Resolved'),
(234, 'CASEOFFICER01', 'Applications Approval', 'Applications pending approval', '2019-11-15 11:17:24', '2019-11-18 11:17:24', 'Resolved'),
(235, 'SOdhiambo', 'Applications Approval', 'Applications pending approval', '2019-11-15 11:17:24', '2019-11-18 11:17:24', 'Resolved'),
(239, 'Admin', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-15 11:50:57', '2019-11-18 11:50:57', 'Resolved'),
(240, 'PPRA01', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-15 11:50:57', '2019-11-18 11:50:57', 'Resolved'),
(241, 'CASEOFFICER01', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-15 11:50:57', '2019-11-18 11:50:57', 'Resolved'),
(242, 'pkiprop', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-15 11:50:57', '2019-11-18 11:50:57', 'Resolved'),
(243, 'Pokumu', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-15 11:50:57', '2019-11-18 11:50:57', 'Resolved'),
(244, 'SOdhiambo', 'Applications Fees Approval', 'Applications pending fees confirmaion', '2019-11-15 11:50:57', '2019-11-18 11:50:57', 'Resolved'),
(246, 'Admin', 'Applications Approval', 'Applications pending approval', '2019-11-15 11:51:56', '2019-11-18 11:51:56', 'Not Resolved'),
(247, 'PPRA01', 'Applications Approval', 'Applications pending approval', '2019-11-15 11:51:56', '2019-11-18 11:51:56', 'Not Resolved'),
(248, 'CASEOFFICER01', 'Applications Approval', 'Applications pending approval', '2019-11-15 11:51:56', '2019-11-18 11:51:56', 'Not Resolved'),
(249, 'SOdhiambo', 'Applications Approval', 'Applications pending approval', '2019-11-15 11:51:56', '2019-11-18 11:51:56', 'Not Resolved'),
(253, 'PPRA01', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-15 12:06:43', '2019-11-18 12:06:43', 'Not Resolved'),
(254, 'Admin', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-15 12:06:43', '2019-11-18 12:06:43', 'Not Resolved'),
(255, 'CASEOFFICER01', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-15 12:06:43', '2019-11-18 12:06:43', 'Not Resolved'),
(256, 'PPRA01', 'Panel Formation', 'Applications Awating Panel Formation', '2019-11-15 12:06:43', '2019-11-18 12:06:43', 'Not Resolved'),
(260, 'PPRA01', 'Panel Approval', 'Panel Lists Awiting Approval', '2019-11-15 12:22:42', '2019-11-18 12:22:42', 'Not Resolved'),
(261, 'Admin', 'Panel Approval', 'Panel Lists Awiting Approval', '2019-11-15 12:22:42', '2019-11-18 12:22:42', 'Resolved'),
(262, 'CASEOFFICER01', 'Panel Approval', 'Panel Lists Awiting Approval', '2019-11-15 12:22:42', '2019-11-18 12:22:42', 'Not Resolved'),
(263, 'PPRA01', 'Panel Approval', 'Panel Lists Awiting Approval', '2019-11-15 12:22:42', '2019-11-18 12:22:42', 'Not Resolved'),
(267, 'PPRA01', 'Case Scheduling', 'Applications Hearing date scheduling', '2019-11-15 12:28:47', '2019-11-18 12:28:47', 'Not Resolved'),
(268, 'PPRA01', 'Case Scheduling', 'Applications Hearing date scheduling', '2019-11-15 12:55:41', '2019-11-18 12:55:41', 'Not Resolved');

-- --------------------------------------------------------

--
-- Table structure for table `panelapprovalcontacts`
--

CREATE TABLE `panelapprovalcontacts` (
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mobile` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Msg` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=3276 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `panelapprovalcontacts`
--

INSERT INTO `panelapprovalcontacts` (`Name`, `Email`, `Mobile`, `Msg`, `ApplicationNo`) VALUES
('WILSON B. KEREBEI', 'wkerebei@gmail.com', '07227194121', 'Case Officer', '18 OF 2019'),
('Samson Odhiambo', 'x2press@gmail.com', '0721382630', 'Panel', '18 OF 2019'),
('WILSON B. KEREBEI', 'wkerebei@gmail.com', '07227194121', 'Panel', '18 OF 2019'),
('Elvis kimutai', 'elviskcheruiyot@gmail.com', '0705555285', 'Panel', '18 OF 2019'),
('Stanley Miheso', 'mihesosc@yahoo.com', '0722607127', 'Panel', '18 OF 2019');

-- --------------------------------------------------------

--
-- Table structure for table `panellist`
--

CREATE TABLE `panellist` (
  `ID` int(11) NOT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FileName` varchar(105) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GeneratedOn` datetime DEFAULT NULL,
  `GeneratedBy` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `panels`
--

CREATE TABLE `panels` (
  `ID` int(11) NOT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UserName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Status` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Role` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=1024 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `panels`
--

INSERT INTO `panels` (`ID`, `ApplicationNo`, `UserName`, `Status`, `Role`, `Deleted`, `Created_At`, `Created_By`, `Updated_At`, `Updated_By`) VALUES
(1, '17 OF 2019', 'Admin', 'Approved', 'Member', 1, '2019-11-14 15:45:45', 'Admin', NULL, NULL),
(2, '17 OF 2019', 'CASEOFFICER01', 'Approved', 'Chairperson', 0, '2019-11-14 15:46:12', 'Admin', NULL, NULL),
(3, '17 OF 2019', 'PPRA01', 'Approved', 'Vice Chairperson', 1, '2019-11-14 15:46:34', 'Admin', NULL, NULL),
(4, '17 OF 2019', 'PPRA01', 'Approved', 'Vice Chairperson', 1, '2019-11-14 15:49:45', 'Admin', NULL, NULL),
(5, '17 OF 2019', 'PPRA01', 'Approved', 'Vice Chairperson', 1, '2019-11-14 15:51:18', 'Admin', NULL, NULL),
(6, '17 OF 2019', 'PPRA01', 'Approved', 'Vice Chairperson', 0, '2019-11-14 15:57:57', 'Admin', NULL, NULL),
(7, '17 OF 2019', 'Admin', 'Approved', 'Member', 0, '2019-11-14 16:01:30', 'Admin', NULL, NULL),
(8, '16 OF 2019', 'Admin', 'Approved', 'Member', 0, '2019-11-14 16:16:32', 'Admin', NULL, NULL),
(9, '16 OF 2019', 'CASEOFFICER01', 'Approved', 'Chairperson', 0, '2019-11-14 16:16:37', 'Admin', NULL, NULL),
(10, '16 OF 2019', 'PPRA01', 'Approved', 'Vice Chairperson', 0, '2019-11-14 16:16:41', 'Admin', NULL, NULL),
(11, '18 OF 2019', 'SOdhiambo', 'Approved', 'Chairperson', 0, '2019-11-15 12:20:43', 'Admin', NULL, NULL),
(12, '18 OF 2019', 'PPRA01', 'Approved', 'Member', 0, '2019-11-15 12:20:54', 'Admin', NULL, NULL),
(13, '18 OF 2019', 'CASEOFFICER01', 'Nominated', 'Member', 1, '2019-11-15 12:21:37', 'Admin', NULL, NULL),
(14, '18 OF 2019', 'Admin', 'Approved', 'Member', 0, '2019-11-15 12:27:31', 'Admin', NULL, NULL),
(15, '18 OF 2019', 'smiheso', 'Nominated', 'Member', 1, '2019-11-15 12:55:03', 'Admin', NULL, NULL),
(16, '18 OF 2019', 'smiheso', 'Approved', 'Member', 0, '2019-11-15 12:55:38', 'Admin', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `panelsapprovalworkflow`
--

CREATE TABLE `panelsapprovalworkflow` (
  `ID` int(11) NOT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UserName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Status` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Role` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Approver` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Approved_At` datetime DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=1638 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `panelsapprovalworkflow`
--

INSERT INTO `panelsapprovalworkflow` (`ID`, `ApplicationNo`, `UserName`, `Status`, `Role`, `Deleted`, `Created_At`, `Created_By`, `Updated_At`, `Updated_By`, `Approver`, `Approved_At`) VALUES
(1, '17 OF 2019', 'Admin', 'Declined', 'Member', 0, '2019-11-14 15:45:45', 'Admin', NULL, NULL, 'Admin', '2019-11-14 16:01:24'),
(2, '17 OF 2019', 'CASEOFFICER01', 'Approved', 'Chairperson', 0, '2019-11-14 15:46:12', 'Admin', NULL, NULL, 'Admin', '2019-11-14 16:02:42'),
(3, '17 OF 2019', 'PPRA01', 'Approved', 'Vice Chairperson', 0, '2019-11-14 15:51:18', 'Admin', NULL, NULL, 'PPRA01', '2019-11-14 16:07:33'),
(4, '17 OF 2019', 'PPRA01', 'Approved', 'Vice Chairperson', 0, '2019-11-14 15:57:57', 'Admin', NULL, NULL, 'Admin', '2019-11-14 15:57:57'),
(5, '17 OF 2019', 'Admin', 'Approved', 'Member', 0, '2019-11-14 16:01:30', 'Admin', NULL, NULL, 'Admin', '2019-11-14 16:01:30'),
(6, '17 OF 2019', 'CASEOFFICER01', 'Approved', 'Chairperson', 0, '2019-11-14 15:46:12', 'Admin', NULL, NULL, 'PPRA01', '2019-11-14 16:07:31'),
(7, '17 OF 2019', 'PPRA01', 'Approved', 'Vice Chairperson', 0, '2019-11-14 15:57:57', 'Admin', NULL, NULL, 'PPRA01', '2019-11-14 16:07:33'),
(8, '17 OF 2019', 'Admin', 'Approved', 'Member', 0, '2019-11-14 16:01:30', 'Admin', NULL, NULL, 'PPRA01', '2019-11-14 16:07:36'),
(9, '16 OF 2019', 'Admin', 'Approved', 'Member', 0, '2019-11-14 16:16:32', 'Admin', NULL, NULL, 'Admin', '2019-11-14 16:17:06'),
(10, '16 OF 2019', 'CASEOFFICER01', 'Approved', 'Chairperson', 0, '2019-11-14 16:16:37', 'Admin', NULL, NULL, 'Admin', '2019-11-14 16:17:08'),
(11, '16 OF 2019', 'PPRA01', 'Approved', 'Vice Chairperson', 0, '2019-11-14 16:16:41', 'Admin', NULL, NULL, 'Admin', '2019-11-14 16:17:10'),
(12, '16 OF 2019', 'Admin', 'Approved', 'Member', 0, '2019-11-14 16:16:32', 'Admin', NULL, NULL, 'Admin', '2019-11-14 16:18:43'),
(13, '16 OF 2019', 'CASEOFFICER01', 'Approved', 'Chairperson', 0, '2019-11-14 16:16:37', 'Admin', NULL, NULL, 'Admin', '2019-11-14 16:18:46'),
(14, '16 OF 2019', 'PPRA01', 'Approved', 'Vice Chairperson', 0, '2019-11-14 16:16:41', 'Admin', NULL, NULL, 'Admin', '2019-11-14 16:18:48'),
(15, '18 OF 2019', 'SOdhiambo', 'Approved', 'Chairperson', 0, '2019-11-15 12:20:43', 'Admin', NULL, NULL, 'Admin', '2019-11-15 12:26:42'),
(16, '18 OF 2019', 'PPRA01', 'Approved', 'Member', 0, '2019-11-15 12:20:54', 'Admin', NULL, NULL, 'Admin', '2019-11-15 12:27:03'),
(17, '18 OF 2019', 'CASEOFFICER01', 'Pending Approval', 'Member', 0, '2019-11-15 12:21:37', 'Admin', NULL, NULL, NULL, NULL),
(18, '18 OF 2019', 'Admin', 'Approved', 'Member', 0, '2019-11-15 12:27:31', 'Admin', NULL, NULL, 'Admin', '2019-11-15 12:27:31'),
(19, '18 OF 2019', 'smiheso', 'Approved', 'Member', 0, '2019-11-15 12:55:38', 'Admin', NULL, NULL, 'Admin', '2019-11-15 12:55:38');

-- --------------------------------------------------------

--
-- Table structure for table `paymentdetails`
--

CREATE TABLE `paymentdetails` (
  `ID` bigint(20) NOT NULL,
  `ApplicationID` bigint(20) NOT NULL,
  `Paidby` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Refference` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DateOfpayment` date DEFAULT NULL,
  `AmountPaid` float DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Category` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=5461 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `paymentdetails`
--

INSERT INTO `paymentdetails` (`ID`, `ApplicationID`, `Paidby`, `Refference`, `DateOfpayment`, `AmountPaid`, `Created_By`, `Created_At`, `Category`) VALUES
(1, 1, 'wk', 'PYMREF00001', '2019-11-11', 28800, 'P0123456788X', '2019-11-11 16:10:58', 'Applicationfees'),
(2, 5, 'Elvis kimutai', '0987656544322', '2019-11-12', 15000, 'P0123456788X', '2019-11-12 11:24:36', 'Applicationfees'),
(3, 6, 'ALVIN', 'REFD00002', '2019-11-11', 26000, 'P0123456788X', '2019-11-12 15:51:39', 'Applicationfees'),
(4, 7, 'ALVIN', 'REFD00003', '2019-11-12', 45000, 'P0123456788X', '2019-11-12 16:52:41', 'Applicationfees'),
(5, 7, 'wk', 'REFD00004', '2019-11-12', 5000, 'A123456789X', '2019-11-12 17:25:08', 'PreliminaryObjectionsFees'),
(6, 10, 'Elvis kimutai', '0987656544322', '2019-11-13', 25000, 'P0123456788X', '2019-11-13 11:20:13', 'Applicationfees'),
(7, 10, 'Elvis kimutai', '0987656544322', '2019-11-13', 25000, 'P0123456788X', '2019-11-13 11:21:59', 'Applicationfees'),
(8, 10, 'Elvis kimutai', '0987656544322', '2019-11-13', 25000, 'P0123456788X', '2019-11-13 11:24:41', 'Applicationfees'),
(9, 10, 'Elvis kimutai', '0987656544322', '2019-11-13', 5000, 'A123456789U', '2019-11-13 11:56:03', 'PreliminaryObjectionsFees'),
(10, 15, 'Elvis', 'REF124', '2019-11-20', 5000, 'P09875345W', '2019-11-13 17:19:00', 'Applicationfees'),
(11, 14, 'Kim', '123', '2019-11-13', 5000, 'P09875345W', '2019-11-13 17:49:22', 'Applicationfees'),
(12, 15, 'KIM', 'REF123', '2019-11-13', 5000, 'A123456789X', '2019-11-13 18:30:45', 'PreliminaryObjectionsFees'),
(13, 15, 'KIM', 'REF123', '2019-11-13', 5000, 'A123456789X', '2019-11-13 18:34:00', 'PreliminaryObjectionsFees'),
(14, 16, 'Kimutai Elvis', '123344', '2019-11-14', 25000, 'P0123456788X', '2019-11-14 14:46:35', 'Applicationfees'),
(15, 17, 'Judy J', 'REF0000015', '2019-11-15', 310500, 'P123456879Q', '2019-11-15 11:10:01', 'Applicationfees'),
(16, 18, 'Kim', '12344', '2019-11-15', 15000, 'P0123456788X', '2019-11-15 11:50:57', 'Applicationfees');

-- --------------------------------------------------------

--
-- Table structure for table `pedeadlineextensionsrequests`
--

CREATE TABLE `pedeadlineextensionsrequests` (
  `ID` int(11) NOT NULL,
  `PEID` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Reason` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RequestedDate` datetime DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_By` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=8192 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `pedeadlineextensionsrequests`
--

INSERT INTO `pedeadlineextensionsrequests` (`ID`, `PEID`, `ApplicationNo`, `Reason`, `RequestedDate`, `Created_At`, `Created_By`, `Status`) VALUES
(1, 'PE-2', '12 OF 2019', '<p>New Request 2</p>\n', '2019-11-15 00:00:00', '2019-11-11 17:31:46', 'A123456789X', 'Pending Approval'),
(2, 'PE-2', '15 OF 2019', '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,</p>\n', '2019-11-13 00:00:00', '2019-11-12 17:15:50', 'A123456789X', 'DECLINED');

-- --------------------------------------------------------

--
-- Table structure for table `peresponse`
--

CREATE TABLE `peresponse` (
  `ID` int(11) NOT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PEID` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ResponseType` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ResponseDate` datetime NOT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Created_At` datetime NOT NULL,
  `Status` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PanelStatus` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=2730 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `peresponse`
--

INSERT INTO `peresponse` (`ID`, `ApplicationNo`, `PEID`, `ResponseType`, `ResponseDate`, `Created_By`, `Created_At`, `Status`, `PanelStatus`) VALUES
(1, '12 OF 2019', 'PE-2', 'Memorandum of Response', '2019-11-11 17:39:01', 'A123456789X', '2019-11-11 17:39:01', 'Submited', 'Undefined'),
(2, '13 OF 2019', 'PE-3', 'Memorandum of Response', '2019-11-12 14:40:06', 'A123456789U', '2019-11-12 14:40:06', 'Submited', 'Undefined'),
(3, '15 OF 2019', 'PE-2', 'Preliminary Objection', '2019-11-12 17:19:56', 'A123456789X', '2019-11-12 17:19:56', 'Submited', 'Undefined'),
(4, '16 OF 2019', 'PE-3', 'Preliminary Objection', '2019-11-13 11:53:34', 'A123456789U', '2019-11-13 11:53:34', 'Submited', 'Submited'),
(5, '17 OF 2019', 'PE-2', 'Preliminary Objection', '2019-11-13 18:28:46', 'A123456789X', '2019-11-13 18:28:46', 'Fees Pending Confirmation', 'Submited'),
(6, '18 OF 2019', 'PE-4', 'Memorandum of Response', '2019-11-15 12:01:35', 'P65498745R', '2019-11-15 12:01:35', 'Submited', 'Submited');

-- --------------------------------------------------------

--
-- Table structure for table `peresponsebackgroundinformation`
--

CREATE TABLE `peresponsebackgroundinformation` (
  `ID` int(11) NOT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `BackgroundInformation` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ResponseType` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=3276 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `peresponsebackgroundinformation`
--

INSERT INTO `peresponsebackgroundinformation` (`ID`, `ApplicationNo`, `BackgroundInformation`, `ResponseType`, `Created_At`, `Updated_At`, `Updated_By`, `Created_By`) VALUES
(1, '13 OF 2019', '<p><strong>Note:</strong>&nbsp;The INNER JOIN keyword selects all rows from both tables as long as there is a match between the columns. If there are records in the &quot;Orders&quot; table that do not have matches in &quot;Customers&quot;, these orders will not be shown!</p>\n', 'Memorandum of Response', '2019-11-12 14:20:43', '2019-11-12 14:43:37', 'A123456789U', NULL),
(2, '15 OF 2019', '<p>Review against the decision of the Principal Secretary, State Department of Irrigation and the award of Tender No: MALF &amp; I/SDI/OT/04/2018-2019 for Procurement of Construction of Kaigunji Irrigation Project Phase II Section One.</p>\n', 'Preliminary Objection', '2019-11-12 17:19:23', NULL, NULL, 'A123456789X'),
(3, '16 OF 2019', '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo.</p>\n', 'Preliminary Objection', '2019-11-13 11:46:28', NULL, NULL, 'A123456789U'),
(4, '17 OF 2019', '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,</p>\n', 'Preliminary Objection', '2019-11-13 18:28:40', NULL, NULL, 'A123456789X'),
(5, '18 OF 2019', '<p>We procured for motor vehicle for government agencies and ministries</p>\n', 'Memorandum of Response', '2019-11-15 12:00:02', NULL, NULL, 'P65498745R');

-- --------------------------------------------------------

--
-- Table structure for table `peresponsecontacts`
--

CREATE TABLE `peresponsecontacts` (
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mobile` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Role` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=4096 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `peresponsecontacts`
--

INSERT INTO `peresponsecontacts` (`Name`, `Email`, `Mobile`, `Role`) VALUES
('STATE DEPARTMENT OF INTERIOR ', 'judyjay879@gmail.com', '0733299665', 'PE'),
('ECTA KENYA LIMITED', 'pjokumu@hotmail.com', '0734470491', 'Interested Parties'),
('WILSON B. KEREBEI', 'wkerebei@gmail.com', '07227194121', 'Case officer'),
('CMC MOTORS CORPORATION', 'judiejuma@gmail.com', '0705128595', 'Applicant');

-- --------------------------------------------------------

--
-- Table structure for table `peresponsedetails`
--

CREATE TABLE `peresponsedetails` (
  `ID` int(11) NOT NULL,
  `PEResponseID` int(11) DEFAULT NULL,
  `GroundNO` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GroundType` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Response` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `BackgrounInformation` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB AVG_ROW_LENGTH=910 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `peresponsedetails`
--

INSERT INTO `peresponsedetails` (`ID`, `PEResponseID`, `GroundNO`, `GroundType`, `Response`, `Created_At`, `Created_By`, `Updated_At`, `Updated_By`, `BackgrounInformation`, `Deleted`) VALUES
(11, 2, '1', 'Grounds', '<p>That the Procuring Entity declined to furnish the Applicant with a summary of the due diligence report as the same was part of confidential documents which remain in the custody of the Procuring Entity pursuant to section 67 of the Act</p>\n', '2019-11-12 14:55:01', 'A123456789U', NULL, NULL, NULL, 0),
(12, 2, '2', 'Grounds', '<p>That the Procuring Entity declined to furnish the Applicant with a summary of the due diligence report as the same was part of confidential documents which remain in the custody of the Procuring Entity pursuant to section 67 of the Act</p>\n', '2019-11-12 14:55:07', 'A123456789U', NULL, NULL, NULL, 0),
(13, 2, '1', 'Prayers', '<p>An order cancelling the award of tender and/or contract made to Kenya Airports Parking Services;</p>\n', '2019-11-12 14:56:55', 'A123456789U', NULL, NULL, NULL, 0),
(14, 2, '2', 'Prayers', '<p>An order cancelling the award of tender and/or contract made to Kenya Airports Parking Services;</p>\n', '2019-11-12 14:57:01', 'A123456789U', NULL, NULL, NULL, 0),
(15, 3, '1', 'Grounds', '<p>Review against the decision of the Principal Secretary, State Department of Irrigation and the award of Tender No: MALF &amp; I/SDI/OT/04/2018-2019 for Procurement of Construction of Kaigunji Irrigation Project Phase II Section One.</p>\n', '2019-11-12 17:19:56', 'A123456789X', NULL, NULL, NULL, 0),
(16, 3, '2', 'Grounds', '<p>Review against the decision of the Principal Secretary, State Department of Irrigation and the award of Tender No: MALF &amp; I/SDI/OT/04/2018-2019 for Procurement of Construction of Kaigunji Irrigation Project Phase II Section One.</p>\n', '2019-11-12 17:20:06', 'A123456789X', NULL, NULL, NULL, 0),
(17, 3, '3', 'Grounds', '<p>Review against the decision of the Principal Secretary, State Department of Irrigation and the award of Tender No: MALF &amp; I/SDI/OT/04/2018-2019 for Procurement of Construction of Kaigunji Irrigation Project Phase II Section One.</p>\n', '2019-11-12 17:20:14', 'A123456789X', NULL, NULL, NULL, 0),
(18, 3, '1', 'Prayers', '<p>Review against the decision of the Principal Secretary, State Department of Irrigation and the award of Tender No: MALF &amp; I/SDI/OT/04/2018-2019 for Procurement of Construction of Kaigunji Irrigation Project Phase II Section One.</p>\n', '2019-11-12 17:20:49', 'A123456789X', NULL, NULL, NULL, 0),
(19, 3, '2', 'Prayers', '<p>Review against the decision of the Principal Secretary, State Department of Irrigation and the award of Tender No: MALF &amp; I/SDI/OT/04/2018-2019 for Procurement of Construction of Kaigunji Irrigation Project Phase II Section One.</p>\n', '2019-11-12 17:21:03', 'A123456789X', NULL, NULL, NULL, 0),
(20, 3, '3', 'Prayers', '<p>Review against the decision of the Principal Secretary, State Department of Irrigation and the award of Tender No: MALF &amp; I/SDI/OT/04/2018-2019 for Procurement of Construction of Kaigunji Irrigation Project Phase II Section One.</p>\n', '2019-11-12 17:21:10', 'A123456789X', NULL, NULL, NULL, 0),
(21, 4, '1', 'Grounds', '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo,</p>\n', '2019-11-13 11:53:34', 'A123456789U', NULL, NULL, NULL, 0),
(22, 4, '1', 'Prayers', '<p>ackground Information</p>\n', '2019-11-13 11:55:17', 'A123456789U', NULL, NULL, NULL, 0),
(23, 5, '1', 'Grounds', '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,</p>\n', '2019-11-13 18:28:47', 'A123456789X', NULL, NULL, NULL, 0),
(24, 5, '2', 'Prayers', '<p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut,</p>\n', '2019-11-13 18:28:54', 'A123456789X', NULL, NULL, NULL, 0),
(25, 6, '1', 'Grounds', '<p>The Tender Document was in accordance with standard tender documents issued by PPRA</p>\n', '2019-11-15 12:01:35', 'P65498745R', NULL, NULL, NULL, 0),
(26, 6, '2', 'Grounds', '<p>The termination of the tendering process was done in accordance with section 63 of the Act</p>\n', '2019-11-15 12:02:04', 'P65498745R', NULL, NULL, NULL, 0),
(27, 6, '1', 'Prayers', '<p>The award to the successful bidder was lawful</p>\n', '2019-11-15 12:02:57', 'P65498745R', NULL, NULL, NULL, 0),
(28, 6, '2', 'Prayers', '<p>The Applicant is not entitled to the costs of this application</p>\n', '2019-11-15 12:03:17', 'P65498745R', NULL, NULL, NULL, 0);

-- --------------------------------------------------------

--
-- Table structure for table `peresponsedocuments`
--

CREATE TABLE `peresponsedocuments` (
  `ID` int(11) NOT NULL,
  `PEResponseID` int(11) DEFAULT NULL,
  `Name` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Path` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Confidential` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=2048 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `peresponsedocuments`
--

INSERT INTO `peresponsedocuments` (`ID`, `PEResponseID`, `Name`, `Description`, `Path`, `Created_At`, `Deleted`, `Confidential`) VALUES
(1, 1, '1573494093285-2020190002762066.pdf', 'Evaluation Criteria', 'Documents', '2019-11-11 17:41:33', 0, 0),
(2, 1, '1573494100741-2020190002762066.pdf', 'Evaluation Criteria', 'Documents', '2019-11-11 17:41:41', 1, 0),
(3, 1, '1573494111039-2020190002762066.pdf', 'Evaluation Criteria', 'Documents', '2019-11-11 17:41:51', 1, 0),
(4, 1, '1573494179819-2020190002762066.pdf', 'Evaluation Criteria- Confidential', 'Documents', '2019-11-11 17:43:00', 0, 1),
(5, 1, '1573495250165-2020190002762066.pdf', 'Document', 'Documents', '2019-11-11 18:00:50', 0, 0),
(6, 2, '1573559846237-6 OF 2019.pdf', 'Tender Document', 'Documents', '2019-11-12 14:57:26', 0, 0),
(7, 3, '1573579434053-CD Label.jpg', 'Evidence', 'Documents', '2019-11-12 17:23:54', 0, 0),
(8, 5, '1573669819245-6 OF 2019.pdf', 'Document 1', 'Documents', '2019-11-13 18:30:19', 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `peresponsetimer`
--

CREATE TABLE `peresponsetimer` (
  `ID` int(11) NOT NULL,
  `PEID` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `RegisteredOn` datetime NOT NULL,
  `DueOn` datetime NOT NULL,
  `Status` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=2340 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `peresponsetimer`
--

INSERT INTO `peresponsetimer` (`ID`, `PEID`, `ApplicationNo`, `RegisteredOn`, `DueOn`, `Status`) VALUES
(1, 'PE-2', '12 OF 2019', '2019-11-11 16:20:11', '2019-11-16 16:20:11', 'Awaiting Response'),
(2, 'PE-3', '13 OF 2019', '2019-11-12 11:51:53', '2019-11-17 11:51:53', 'Awaiting Response'),
(3, 'PE-3', '14 OF 2019', '2019-11-12 15:56:41', '2019-11-17 15:56:41', 'Pending Acknowledgement'),
(4, 'PE-2', '15 OF 2019', '2019-11-12 17:02:35', '2019-11-17 17:02:35', 'Submited'),
(5, 'PE-3', '16 OF 2019', '2019-11-13 11:42:41', '2019-11-18 11:42:41', 'Awaiting Response'),
(6, 'PE-2', '17 OF 2019', '2019-11-13 17:40:43', '2019-11-18 17:40:43', 'Submited'),
(7, 'PE-4', '18 OF 2019', '2019-11-15 11:36:02', '2019-11-20 11:36:02', 'Submited');

-- --------------------------------------------------------

--
-- Table structure for table `petypes`
--

CREATE TABLE `petypes` (
  `ID` bigint(20) NOT NULL,
  `Code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=4096 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `petypes`
--

INSERT INTO `petypes` (`ID`, `Code`, `Description`, `Created_At`, `Created_By`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_By`) VALUES
(2, 'PET-2', 'Ministry', '2019-07-31 15:54:08', 'Admin', '2019-08-27 17:40:02', 'Admin', 0, NULL),
(4, 'PET-4', 'State Department', '2019-07-31 15:55:37', 'Admin', '2019-10-04 09:45:06', 'Admin', 0, NULL),
(5, 'PET-5', 'Ministry Updated', '2019-07-31 17:05:28', 'Admin', '2019-07-31 17:06:30', 'Admin', 0, NULL),
(6, 'PET-6', 'Universities', '2019-08-08 12:37:03', 'Admin', '2019-08-08 12:37:03', 'Admin', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `peusers`
--

CREATE TABLE `peusers` (
  `ID` int(11) NOT NULL,
  `UserName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PEID` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_by` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=5461 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `peusers`
--

INSERT INTO `peusers` (`ID`, `UserName`, `PEID`, `Created_At`, `Created_by`) VALUES
(5, 'A123456789X', 'PE-2', '2019-11-11 16:26:50', 'A123456789X'),
(6, 'A123456789U', 'PE-3', '2019-11-12 13:41:59', 'A123456789U'),
(7, 'P65498745R', 'PE-4', '2019-11-15 11:46:49', 'P65498745R');

-- --------------------------------------------------------

--
-- Table structure for table `procuremententity`
--

CREATE TABLE `procuremententity` (
  `ID` bigint(20) NOT NULL,
  `PEID` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PEType` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `County` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Location` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `POBox` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PostalCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Town` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mobile` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Telephone` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Logo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Website` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL,
  `RegistrationDate` datetime DEFAULT NULL,
  `PIN` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `RegistrationNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=4096 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `procuremententity`
--

INSERT INTO `procuremententity` (`ID`, `PEID`, `Name`, `PEType`, `County`, `Location`, `POBox`, `PostalCode`, `Town`, `Mobile`, `Telephone`, `Email`, `Logo`, `Website`, `Created_By`, `Created_At`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_By`, `Deleted_At`, `RegistrationDate`, `PIN`, `RegistrationNo`) VALUES
(1, 'PE-1', 'MMUST', 'PET-4', '027', 'Kakamega', '190', '10001', 'Kakamega', '0705555285', '07055555287', 'elviskimcheruiyot@gmail.com', 'signature.jpg', 'https://www.google.com', 'Admin', '2019-08-09 11:55:00', '2019-09-03 12:21:40', 'Admin', 0, 'Admin', '2019-08-09 12:58:17', '2019-09-04 00:00:00', 'A123456789X', 'TS2345678KS'),
(2, 'PE-2', 'MINISTRY OF EDUCATION', 'PET-2', '027', 'Kakamega', '190', '10001', 'Nairobi', '0705555285', '07055555287', 'elviskimcheruiyot@gmail.com', '1573656137045-citimax14.png', 'https://www.google.com', 'Admin', '2019-08-09 12:11:23', '2019-11-13 14:42:26', 'Admin', 0, NULL, NULL, '1970-01-01 00:00:00', 'A123456789X', 'TS2345678KS'),
(3, 'PE-3', 'University of Nairobi', 'PET-6', '047', 'University of Nairobi', '190', '30106', 'TURBO  ', '0705555285', '1234567890', 'elviskimcheruiyot@gmail.com', '1567502559643-admin.png', 'https://www.google.com', 'Admin', '2019-09-03 12:22:41', NULL, NULL, 0, NULL, NULL, '2019-09-01 00:00:00', 'A123456789X', 'TS2345678KS'),
(4, 'PE-4', 'STATE DEPARTMENT OF INTERIOR ', 'PET-4', '047', 'HARAMBEE HOUSE', '45654', '00200', 'NAIROBI', '0733299665', '0733299665', 'judyjay879@gmail.com', '', 'www.interior.go.ke', 'admin', '2019-11-15 10:51:14', NULL, NULL, 0, NULL, NULL, '1963-12-12 00:00:00', 'P65498745R', 'c1234565');

-- --------------------------------------------------------

--
-- Table structure for table `procurementmethods`
--

CREATE TABLE `procurementmethods` (
  `ID` bigint(20) NOT NULL,
  `Code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=3276 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `procurementmethods`
--

INSERT INTO `procurementmethods` (`ID`, `Code`, `Description`, `Created_At`, `Created_By`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_By`) VALUES
(6, 'PROGM-1', 'Direct Procurement Updated', '2019-08-01 10:26:17', 'Admin', '2019-08-01 10:26:55', 'Admin', 1, 'Admin'),
(7, 'PROGM-2', 'Single-Source ', '2019-08-01 10:41:25', 'Admin', '2019-08-01 10:45:24', 'Admin', 1, 'Admin'),
(8, 'PROGM-3', 'Request for Quotations', '2019-08-01 10:55:31', 'Admin', '2019-08-27 17:40:07', 'Admin', 0, NULL),
(9, 'PROGM-4', 'Restricted Tendering', '2019-08-01 10:55:45', 'Admin', '2019-10-04 09:47:39', 'Admin', 0, NULL),
(10, 'PROGM-5', 'Open Tendering', '2019-08-01 10:55:53', 'Admin', '2019-08-27 17:19:41', 'Admin', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rb1forms`
--

CREATE TABLE `rb1forms` (
  `ID` int(11) NOT NULL,
  `ApplicationNo` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Path` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `FileName` varchar(105) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `GeneratedOn` datetime DEFAULT NULL,
  `GeneratedBy` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=2730 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `rb1forms`
--

INSERT INTO `rb1forms` (`ID`, `ApplicationNo`, `Path`, `FileName`, `GeneratedOn`, `GeneratedBy`) VALUES
(1, '12 OF 2019', 'RB1FORMS/', '12 OF 2019.pdf', '2019-11-11 16:20:15', 'Admin'),
(2, '13 OF 2019', 'RB1FORMS/', '13 OF 2019.pdf', '2019-11-12 11:52:00', 'PPRA01'),
(3, '14 OF 2019', 'RB1FORMS/', '14 OF 2019.pdf', '2019-11-12 15:56:44', 'PPRA01'),
(4, '15 OF 2019', 'RB1FORMS/', '15 OF 2019.pdf', '2019-11-12 17:02:38', 'Admin'),
(5, '16 OF 2019', 'RB1FORMS/', '16 OF 2019.pdf', '2019-11-13 11:42:48', 'Admin'),
(6, '17 OF 2019', 'RB1FORMS/', '17 OF 2019.pdf', '2019-11-13 17:40:46', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `requesthandledbuffer`
--

CREATE TABLE `requesthandledbuffer` (
  `Applicationno` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ApplicationDate` date DEFAULT NULL,
  `Status` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=1260 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `requesthandledbuffer`
--

INSERT INTO `requesthandledbuffer` (`Applicationno`, `ApplicationDate`, `Status`) VALUES
('18 OF 2019', '2019-11-15', 'Unsuccessful'),
('14 OF 2019', '2019-11-12', 'Withdrawn'),
('12 OF 2019', '2019-11-11', 'Pending Determination'),
('13 OF 2019', '2019-11-12', 'Pending Determination'),
('15 OF 2019', '2019-11-12', 'Pending Determination'),
('16 OF 2019', '2019-11-13', 'Pending Determination'),
('11', '2019-11-13', 'Pending Determination'),
('12', '2019-11-13', 'Pending Determination'),
('13', '2019-11-13', 'Pending Determination'),
('14', '2019-11-13', 'Pending Determination'),
('17 OF 2019', '2019-11-13', 'Pending Determination'),
('16', '2019-11-14', 'Pending Determination'),
('18', '2019-11-15', 'Pending Determination');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `RoleID` bigint(20) NOT NULL,
  `RoleName` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `RoleDescription` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `UpdateBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreateBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `Deleted` tinyint(1) NOT NULL,
  `Category` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=341 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`RoleID`, `RoleName`, `RoleDescription`, `UpdateBy`, `CreateBy`, `CreatedAt`, `UpdatedAt`, `Deleted`, `Category`) VALUES
(17, 'System Users', 'System Users ', 'Admin', 'user', '2019-06-27 17:30:15', '2019-10-04 10:27:44', 0, 'Admin'),
(18, 'Roles', 'Security roles', 'user', 'user', '2019-06-27 17:30:36', '2019-06-27 17:30:36', 0, 'Admin'),
(19, 'Security Groups', 'Security groups', 'user', 'user', '2019-06-27 17:31:08', '2019-06-27 17:31:08', 0, 'Admin'),
(20, 'Assign Group Access', 'Assign Group Access', 'user', 'user', '2019-06-27 17:31:29', '2019-06-27 17:31:29', 0, 'Admin'),
(21, 'Audit Trails', 'Audit Trails', 'user', 'user', '2019-06-27 17:31:57', '2019-06-27 17:31:57', 0, 'Admin'),
(22, 'System Administration', 'System Administration', 'Admin', 'Admin', '2019-07-26 12:02:56', '2019-07-26 12:02:56', 0, 'Menus'),
(23, 'Fees Settings', 'Fees Settings', 'Admin', 'Admin', '2019-07-26 12:03:16', '2019-07-26 12:03:16', 0, NULL),
(24, 'Case Management', 'Case Management', 'Admin', 'Admin', '2019-07-26 12:03:33', '2019-07-26 12:03:33', 0, 'Menus'),
(25, 'Case Hearing', 'Case Hearing', 'Admin', 'Admin', '2019-07-26 12:03:57', '2019-07-26 12:03:57', 0, 'Menus'),
(26, 'Decision', 'Decision', 'Admin', 'Admin', '2019-07-26 12:04:10', '2019-07-26 12:04:10', 0, 'CaseManagement'),
(27, 'Board Management', 'Board Management', 'Admin', 'Admin', '2019-07-26 12:04:23', '2019-07-26 12:04:23', 0, 'CaseManagement'),
(28, 'Reports', 'Reports', 'Admin', 'Admin', '2019-07-26 12:04:36', '2019-07-26 12:04:36', 0, 'Menus'),
(29, 'DashBoards', 'DashBoards', 'Admin', 'Admin', '2019-07-26 15:19:29', '2019-07-26 15:19:29', 0, NULL),
(30, 'Assign User Access', 'Assign User Access', 'Admin', 'Admin', '2019-07-29 11:03:54', '2019-07-29 11:03:57', 0, 'Admin'),
(31, 'System Configurations', 'System Configurations', 'Admin', 'Admin', '2019-07-29 14:07:47', '2019-07-29 14:07:47', 0, NULL),
(32, 'PeTypes', 'PeTypes', 'Admin', 'Admin', '2019-07-31 16:59:11', '2019-07-31 16:59:11', 0, 'Systemparameteres'),
(33, 'Committee Types', 'Committee Types', 'Admin', 'Admin', '2019-08-01 10:21:59', '2019-08-01 10:21:59', 0, 'Systemparameteres'),
(34, 'Procurement Methods', 'Procurement Methods', 'Admin', 'Admin', '2019-08-01 10:25:18', '2019-08-01 10:25:18', 0, 'Systemparameteres'),
(35, 'System parameteres', 'System parameteres', 'Admin', 'Admin', '2019-08-01 10:49:11', '2019-08-01 10:49:11', 0, 'Menus'),
(36, 'Standard Tender Documents', 'Standard Tender Documents', 'Admin', 'Admin', '2019-08-01 11:41:30', '2019-08-01 11:41:30', 0, 'Systemparameteres'),
(37, 'Financial Year', 'Financial Year', 'Admin', 'Admin', '2019-08-01 13:32:48', '2019-08-01 13:32:48', 0, 'Systemparameteres'),
(38, 'Fees structure', 'Fees structure', 'Admin', 'Admin', '2019-08-05 14:06:38', '2019-08-05 14:06:38', 0, 'Systemparameteres'),
(39, 'Member types', 'Member types', 'Admin', 'Admin', '2019-08-05 14:44:33', '2019-08-05 14:44:33', 0, 'Systemparameteres'),
(40, 'Tender Types', 'Tender Types', 'Admin', 'Admin', '2019-08-06 14:20:29', '2019-08-06 14:20:29', 0, 'Systemparameteres'),
(41, 'Counties', 'Counties', 'Admin', 'Admin', '2019-08-06 14:34:26', '2019-08-06 14:34:26', 0, 'Systemparameteres'),
(42, 'Procurement Entities', 'Procurement Entities', 'Admin', 'Admin', '2019-08-06 14:34:26', '2019-08-06 14:34:26', 0, 'Systemparameteres'),
(43, 'Applicants', 'Applicants', 'Admin', 'Admin', '2019-08-06 14:34:26', '2019-08-06 14:34:26', 0, 'Systemparameteres'),
(44, 'Tenders', 'Tenders', 'Admin', 'Admin', '2019-08-06 14:34:26', '2019-08-06 14:34:26', 0, 'Systemparameteres'),
(45, 'Applications', 'Applications', 'Admin', 'Admin', '2019-08-14 15:55:53', '2019-08-14 15:55:53', 0, 'Systemparameteres'),
(46, 'Approvers', 'Approvers', 'user', 'user', '2019-06-27 17:31:57', '2019-06-27 17:31:57', 0, 'Admin'),
(47, 'Applications', 'Applications', 'Admin', 'Admin', '2019-07-26 12:03:33', '2019-07-26 12:03:33', 0, 'CaseManagement'),
(48, 'Applications Approval', 'Applications Approval', 'Admin', 'Admin', '2019-07-26 12:03:33', '2019-07-26 12:03:33', 0, 'CaseManagement'),
(49, 'Deadline Extension Approval', 'Deadline Extension Approval', 'user', 'user', '2019-06-27 17:30:15', '2019-06-27 17:30:15', 0, 'Admin'),
(50, 'Venues', 'Venues', 'Admin', 'Admin', '2019-07-31 16:59:11', '2019-07-31 16:59:11', 0, 'Systemparameteres'),
(51, 'Panel', 'Panel', 'Admin', 'Admin', '2019-07-26 12:03:33', '2019-07-26 12:03:33', 0, 'CaseManagement'),
(52, 'Panels Approval', 'Panels Approval', 'Admin', 'Admin', '2019-07-26 12:03:33', '2019-07-26 12:03:33', 0, 'CaseManagement'),
(53, 'Case officers', 'Case officers', 'user', 'user', '2019-06-27 17:30:36', '2019-06-27 17:30:36', 0, 'Admin'),
(54, 'Case Scheduling', 'Case Scheduling', 'Admin', 'Admin', '2019-07-26 12:03:33', '2019-07-26 12:03:33', 0, 'CaseManagement'),
(55, 'Branches', 'Branches', 'Admin', 'Admin', '2019-08-06 14:20:29', '2019-08-06 14:20:29', 0, 'Systemparameteres'),
(56, 'Case Withdrawal', 'Case Withdrawal', 'Admin', 'Admin', '2019-07-26 12:03:33', '2019-07-26 12:03:33', 0, 'CaseManagement'),
(57, 'Case Adjournment', 'Case Adjournment', 'Admin', 'Admin', '2019-07-26 12:03:33', '2019-07-26 12:03:33', 0, 'CaseManagement'),
(58, 'Hearing Notices', 'Hearing Notices', 'user', 'user', '2019-06-27 17:31:29', '2019-06-27 17:31:29', 0, 'Reports'),
(59, 'Hearing In Progress', 'Hearing In Progress', 'Admin', 'Admin', '2019-07-26 12:03:33', '2019-07-26 12:03:33', 0, 'CaseManagement'),
(60, 'Close Registrations', 'Close Registrations', 'user', 'user', '2019-06-27 17:30:36', '2019-06-27 17:30:36', 0, 'Admin'),
(61, 'Fees Approval', 'Fees Approval', 'Admin', 'Admin', '2019-07-26 12:04:23', '2019-07-26 12:04:23', 0, 'CaseManagement'),
(62, 'Interested Parties', 'Interested Parties', 'Admin', 'Admin', '2019-07-26 12:03:33', '2019-07-26 12:03:33', 0, 'CaseManagement'),
(63, 'Case FollowUp', 'Case FollowUp', 'Admin', 'Admin', '2019-07-26 12:03:16', '2019-07-26 12:03:16', 0, 'CaseManagement'),
(64, 'Case Referrals', 'Case Referrals', 'Admin', 'Admin', '2019-07-26 12:03:33', '2019-07-26 12:03:33', 0, 'CaseManagement');

-- --------------------------------------------------------

--
-- Table structure for table `schedules`
--

CREATE TABLE `schedules` (
  `ID` bigint(20) NOT NULL,
  `UserName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `start` datetime DEFAULT NULL,
  `end` datetime DEFAULT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `sentsms`
--

CREATE TABLE `sentsms` (
  `ID` int(11) NOT NULL,
  `Recepient` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SenderID` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Message` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `SentTime` datetime DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=298 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `sentsms`
--

INSERT INTO `sentsms` (`ID`, `Recepient`, `SenderID`, `Message`, `SentTime`) VALUES
(1, '0705555285', 'WILCOM-TVET', '838700', '2019-10-17 09:54:15'),
(2, '07087654322456', 'WILCOM-TVET', '296872', '2019-10-17 17:26:42'),
(3, '0705555285', 'WILCOM-TVET', '949523', '2019-10-17 17:27:42'),
(4, '07055552851', 'WILCOM-TVET', '287515', '2019-10-17 17:42:41'),
(5, '0705555285', 'WILCOM-TVET', '757241', '2019-10-17 17:45:46'),
(6, '070555528512', 'WILCOM-TVET', '461574', '2019-10-17 18:12:28'),
(7, '070555528512', 'WILCOM-TVET', '438717', '2019-10-17 18:14:35'),
(8, '0705555285', 'WILCOM-TVET', '946583', '2019-10-17 18:15:25'),
(9, '0722114567', 'WILCOM-TVET', 'Your Application with ApplicationNO: has been Received', '2019-10-23 11:39:25'),
(10, '07221145671', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:15 has been submited and is awaiting your review', '2019-10-24 14:40:01'),
(11, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:15 has been submited and is awaiting your review', '2019-10-24 14:40:01'),
(12, '0722114567', 'WILCOM-TVET', 'Your Application with ApplicationNO:15 has been Received', '2019-10-24 14:40:01'),
(13, '0722114567', 'WILCOM-TVET', 'Your Application with ApplicationNO:15 has been Received', '2019-10-25 09:23:53'),
(14, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:15 has been submited and is awaiting your review', '2019-10-25 09:23:53'),
(15, '07221145671', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:15 has been submited and is awaiting your review', '2019-10-25 09:23:54'),
(16, '0722114567', 'WILCOM-TVET', 'Your Application with ApplicationNO:15 has been Received', '2019-10-25 09:24:29'),
(17, '07221145671', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:15 has been submited and is awaiting your review', '2019-10-25 09:24:30'),
(18, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:15 has been submited and is awaiting your review', '2019-10-25 09:24:30'),
(19, '0722114567', 'WILCOM-TVET', 'Your Application with ApplicationNO:15 has been Received', '2019-10-25 09:25:45'),
(20, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:15 has been submited and is awaiting your review', '2019-10-25 09:25:46'),
(21, '07221145671', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:15 has been submited and is awaiting your review', '2019-10-25 09:25:46'),
(22, '0722114567', 'WILCOM-TVET', 'Your Application with ApplicationNO:15 has been Received', '2019-10-25 09:27:43'),
(23, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:15 has been submited and is awaiting your review', '2019-10-25 09:27:44'),
(24, '07221145671', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:15 has been submited and is awaiting your review', '2019-10-25 09:27:44'),
(25, '0722114567', 'WILCOM-TVET', 'Your Application with ApplicationNO:15 has been Received', '2019-10-25 09:28:30'),
(26, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:15 has been submited and is awaiting your review', '2019-10-25 09:28:30'),
(27, '07221145671', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:15 has been submited and is awaiting your review', '2019-10-25 09:28:30'),
(28, '0722114567', 'WILCOM-TVET', 'Your Application with ApplicationNO:15 has been Received', '2019-10-25 09:32:59'),
(29, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:15 has been submited and is awaiting your review', '2019-10-25 09:32:59'),
(30, '07221145671', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:15 has been submited and is awaiting your review', '2019-10-25 09:32:59'),
(31, '0722114567', 'WILCOM-TVET', 'Your Application with ApplicationNO:15 has been Received', '2019-10-25 09:37:36'),
(32, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:15 has been submited and is awaiting your review', '2019-10-25 09:37:36'),
(33, '07221145671', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:15 has been submited and is awaiting your review', '2019-10-25 09:37:36'),
(34, '0722114567', 'WILCOM-TVET', 'Your Application with Reference:15 has been Received', '2019-10-25 10:22:14'),
(35, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:15 has been submited and is awaiting your review', '2019-10-25 10:22:14'),
(36, '07221145671', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:15 has been submited and is awaiting your review', '2019-10-25 10:22:14'),
(37, '0722114567', 'WILCOM-TVET', 'Your Application with Reference:12 has been Received', '2019-10-25 11:28:47'),
(38, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:12 has been submited and is awaiting your review', '2019-10-25 11:28:47'),
(39, '07221145671', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:12 has been submited and is awaiting your review', '2019-10-25 11:28:47'),
(40, '0722114567', 'WILCOM-TVET', 'Your Application with Reference:6 has been Received', '2019-10-25 11:33:31'),
(41, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:6 has been submited and is awaiting your review', '2019-10-25 11:33:31'),
(42, '07221145671', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:6 has been submited and is awaiting your review', '2019-10-25 11:33:31'),
(43, '0722114567', 'WILCOM-TVET', 'Your Application with Reference:10 has been Received', '2019-10-25 11:35:26'),
(44, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:10 has been submited and is awaiting your review', '2019-10-25 11:35:26'),
(45, '07221145671', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:10 has been submited and is awaiting your review', '2019-10-25 11:35:26'),
(46, '0722114567', 'WILCOM-TVET', 'Your Application with Reference:16 has been Received', '2019-10-25 11:36:43'),
(47, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:16 has been submited and is awaiting your review', '2019-10-25 11:36:43'),
(48, '07221145671', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:16 has been submited and is awaiting your review', '2019-10-25 11:36:43'),
(49, '0705555285', 'WILCOM-TVET', 'Dear Elvis kimutai.PE has submited payment details for Filling Preliminary Objection for application:1 OF 2019.You are required confirm the payment.', '2019-10-30 15:39:50'),
(50, '07221145671', 'WILCOM-TVET', 'Dear Admin2.PE has submited payment details for Filling Preliminary Objection for application:1 OF 2019.You are required confirm the payment.', '2019-10-30 15:39:50'),
(51, '0122719412', 'WILCOM-TVET', 'Your Application with Reference:1 has been Received', '2019-11-11 16:07:49'),
(52, '0122719412', 'WILCOM-TVET', 'Your Application with Reference:1 has been Received', '2019-11-11 16:10:59'),
(53, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:1 has been submited and is awaiting your review', '2019-11-11 16:10:59'),
(54, '0701102928', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:1 has been submited and is awaiting your review', '2019-11-11 16:11:00'),
(55, '0722719412', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:1 has been submited and is awaiting your review', '2019-11-11 16:11:00'),
(56, '0701102928', 'WILCOM-TVET', 'New request to approve application fees with Reference No:12344545 has been submited and is awaiting your review', '2019-11-11 16:12:40'),
(57, '0722719412', 'WILCOM-TVET', 'New request to approve application fees with Reference No:12344545 has been submited and is awaiting your review', '2019-11-11 16:12:40'),
(58, '0122719412', 'WILCOM-TVET', 'Fees amount of: 28800 paid for application with Reference 12334444 has been confirmed.Application is now marked as paid.', '2019-11-11 16:15:44'),
(59, '0122719412', 'WILCOM-TVET', 'Fees amount of: 28800 paid for application with Reference 12334444 has been confirmed.Application is now marked as paid.', '2019-11-11 16:15:44'),
(60, '0705555285', 'WILCOM-TVET', 'New application with Reference 12334444 has been submited and it\'s awaiting your review.', '2019-11-11 16:15:44'),
(61, '0722719412', 'WILCOM-TVET', 'New application with Reference 12334444 has been submited and it\'s awaiting your review.', '2019-11-11 16:15:45'),
(62, '0701102928', 'WILCOM-TVET', 'New application with Reference 12334444 has been submited and it\'s awaiting your review.', '2019-11-11 16:15:45'),
(63, '0705555285', 'WILCOM-TVET', 'New Application 12 OF 2019 has been submited. You are required to Login to ARCMS and respond to it before: 2019-11-16T16:20:11.000Z', '2019-11-11 16:20:12'),
(64, '0705555285', 'WILCOM-TVET', 'You have been selected as case officer for  Application:12 OF 2019.', '2019-11-11 16:20:13'),
(65, '0705555285', 'WILCOM-TVET', 'New deadline extension request has been submited and it\'s awaiting your review.', '2019-11-11 17:31:46'),
(66, '0705555285', 'WILCOM-TVET', 'Your request for deadline extension has been DECLINED.You are expected to submit your response before 2019-11-16 16:20:11.', '2019-11-11 17:35:16'),
(67, '0105555285', 'WILCOM-TVET', 'Dear MINISTRY OF EDUCATION.Your response for Application12 OF 2019has been received.You will be notified when hearing date will be set.', '2019-11-11 17:43:27'),
(68, '0122718412', 'WILCOM-TVET', 'Dear INTERESTED PARTY LTD.A response for Application12 OF 2019has been sent by the Procuring Entity.', '2019-11-11 17:43:27'),
(69, '0705555285', 'WILCOM-TVET', 'Dear Elvis kimutai.PE has submited a response for Application12 OF 2019.You are required to form a panel and submit it for review.', '2019-11-11 17:43:27'),
(70, '0122719412', 'WILCOM-TVET', 'Dear JAMES SUPPLIERS LTD.A response for Application12 OF 2019has been sent by the Procuring Entity.', '2019-11-11 17:43:27'),
(71, '0105555285', 'WILCOM-TVET', 'Dear MINISTRY OF EDUCATION.Your response for Application12 OF 2019has been received.You will be notified when hearing date will be set.', '2019-11-11 18:01:22'),
(72, '0122718412', 'WILCOM-TVET', 'Dear INTERESTED PARTY LTD.A response for Application12 OF 2019has been sent by the Procuring Entity.', '2019-11-11 18:01:22'),
(73, '0705555285', 'WILCOM-TVET', 'Dear Elvis kimutai.PE has submited a response for Application12 OF 2019.You are required to form a panel and submit it for review.', '2019-11-11 18:01:22'),
(74, '0122719412', 'WILCOM-TVET', 'Dear JAMES SUPPLIERS LTD.A response for Application12 OF 2019has been sent by the Procuring Entity.', '2019-11-11 18:01:23'),
(75, '0122719412', 'WILCOM-TVET', 'Your Application with Reference:5 has been Received', '2019-11-12 11:22:11'),
(76, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:5 has been submited and is awaiting your review', '2019-11-12 11:24:37'),
(77, '0701102928', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:5 has been submited and is awaiting your review', '2019-11-12 11:24:37'),
(78, '0722719412', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:5 has been submited and is awaiting your review', '2019-11-12 11:24:38'),
(79, '0701102928', 'WILCOM-TVET', 'New request to approve application fees with Reference No:12344545 has been submited and is awaiting your review', '2019-11-12 11:39:41'),
(80, '0722719412', 'WILCOM-TVET', 'New request to approve application fees with Reference No:12344545 has been submited and is awaiting your review', '2019-11-12 11:39:41'),
(81, '0705555285', 'WILCOM-TVET', 'New application with Reference 12344545 has been submited and it\'s awaiting your review.', '2019-11-12 11:42:39'),
(82, '0122719412', 'WILCOM-TVET', 'Fees amount of: 15000 paid for application with Reference 12344545 has been confirmed.Application is now marked as paid.', '2019-11-12 11:42:39'),
(83, '0122719412', 'WILCOM-TVET', 'Fees amount of: 15000 paid for application with Reference 12344545 has been confirmed.Application is now marked as paid.', '2019-11-12 11:42:39'),
(84, '0701102928', 'WILCOM-TVET', 'New application with Reference 12344545 has been submited and it\'s awaiting your review.', '2019-11-12 11:42:39'),
(85, '0722719412', 'WILCOM-TVET', 'New application with Reference 12344545 has been submited and it\'s awaiting your review.', '2019-11-12 11:42:39'),
(86, '0705555285', 'WILCOM-TVET', 'New Application 13 OF 2019 has been submited. You are required to Login to ARCMS and respond to it before: 2019-11-17T08:51:54.000Z', '2019-11-12 11:51:54'),
(87, '0700392599', 'WILCOM-TVET', 'Dear University of Nairobi.Your response for Application13 OF 2019has been received.You will be notified when hearing date will be set.', '2019-11-12 14:57:30'),
(88, '0701102928', 'WILCOM-TVET', 'Dear CASE OFFICER.PE has submited a response for Application13 OF 2019.You are required to form a panel and submit it for review.', '2019-11-12 14:57:30'),
(89, '0701102928', 'WILCOM-TVET', 'Dear Wilcom Systems.A response for Application13 OF 2019has been sent by the Procuring Entity.', '2019-11-12 14:57:30'),
(90, '0122719412', 'WILCOM-TVET', 'Dear JAMES SUPPLIERS LTD.A response for Application13 OF 2019has been sent by the Procuring Entity.', '2019-11-12 14:57:31'),
(91, '0122719412', 'WILCOM-TVET', 'Your Application with Reference:6 has been Received', '2019-11-12 15:50:06'),
(92, '0122719412', 'WILCOM-TVET', 'Your Application with Reference:6 has been Received', '2019-11-12 15:51:40'),
(93, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:6 has been submited and is awaiting your review', '2019-11-12 15:51:40'),
(94, '0701102928', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:6 has been submited and is awaiting your review', '2019-11-12 15:51:40'),
(95, '0722719412', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:6 has been submited and is awaiting your review', '2019-11-12 15:51:41'),
(96, '0722719412', 'WILCOM-TVET', 'New request to approve application fees with Reference No:12344545 has been submited and is awaiting your review', '2019-11-12 15:54:12'),
(97, '0701102928', 'WILCOM-TVET', 'New request to approve application fees with Reference No:12344545 has been submited and is awaiting your review', '2019-11-12 15:54:12'),
(98, '0122719412', 'WILCOM-TVET', 'Fees amount of: 26000 paid for application with Reference 12344545 has been confirmed.Application is now marked as paid.', '2019-11-12 15:55:26'),
(99, '0122719412', 'WILCOM-TVET', 'Fees amount of: 26000 paid for application with Reference 12344545 has been confirmed.Application is now marked as paid.', '2019-11-12 15:55:26'),
(100, '0705555285', 'WILCOM-TVET', 'New application with Reference 12344545 has been submited and it\'s awaiting your review.', '2019-11-12 15:55:26'),
(101, '0722719412', 'WILCOM-TVET', 'New application with Reference 12344545 has been submited and it\'s awaiting your review.', '2019-11-12 15:55:26'),
(102, '0701102928', 'WILCOM-TVET', 'New application with Reference 12344545 has been submited and it\'s awaiting your review.', '2019-11-12 15:55:26'),
(103, '0705555285', 'WILCOM-TVET', 'New Application 14 OF 2019 has been submited. You are required to Login to ARCMS and respond to it before: 2019-11-17T15:56:41.000Z', '2019-11-12 15:56:42'),
(104, '0705555285', 'WILCOM-TVET', 'You have been selected as case officer for  Application:14 OF 2019.', '2019-11-12 15:56:42'),
(105, '0122719412', 'WILCOM-TVET', 'Your request to withdrawal appeal :14 OF 2019 has been received and is awaiting approval.', '2019-11-12 15:58:30'),
(106, '0705555285', 'WILCOM-TVET', 'New request to withdrawal appeal:14 OF 2019 has been submited and is awaiting your review.', '2019-11-12 15:58:31'),
(107, '0122719412', 'WILCOM-TVET', 'Your request to withdrawal appeal :14 OF 2019 has been received and is awaiting approval.', '2019-11-12 15:58:31'),
(108, '0701102928', 'WILCOM-TVET', 'New request to withdrawal appeal:14 OF 2019 has been submited and is awaiting your review.', '2019-11-12 15:58:31'),
(109, '0122719412', 'WILCOM-TVET', 'Your request to withdrawal appeal :14 OF 2019 has been received and is awaiting approval.', '2019-11-12 15:58:31'),
(110, '0722719412', 'WILCOM-TVET', 'New request to withdrawal appeal:14 OF 2019 has been submited and is awaiting your review.', '2019-11-12 15:58:31'),
(111, '0701102928', 'WILCOM-TVET', 'New request to withdrawal appeal:14 OF 2019 has been submited and is awaiting your review.', '2019-11-12 16:00:13'),
(112, '0705555285', 'WILCOM-TVET', 'New request to withdrawal appeal:14 OF 2019 has been submited and is awaiting your review.', '2019-11-12 16:00:13'),
(113, '0705555285', 'WILCOM-TVET', 'Dear Elvis kimutai. A request to withdraw application 14 OF 2019 has been Accepted. The Appeal is now marked withdrawn.', '2019-11-12 16:04:21'),
(114, '0700392599', 'WILCOM-TVET', 'Dear University of Nairobi. A request to withdraw application 14 OF 2019 has been Accepted. The Appeal is now marked withdrawn.', '2019-11-12 16:04:21'),
(115, '0705555285', 'WILCOM-TVET', 'Dear University of Nairobi. A request to withdraw application 14 OF 2019 has been Accepted. The Appeal is now marked withdrawn.', '2019-11-12 16:04:22'),
(116, '0122719412', 'WILCOM-TVET', 'Dear JAMES SUPPLIERS LTD. A request to withdraw application 14 OF 2019 has been Accepted. The Appeal is now marked withdrawn.', '2019-11-12 16:04:22'),
(117, '0122719412', 'WILCOM-TVET', 'Dear JAMES SUPPLIERS LTD. A request to withdraw application 14 OF 2019 has been Accepted. The Appeal is now marked withdrawn.', '2019-11-12 16:04:22'),
(118, '0722719412', 'WILCOM-TVET', 'Dear WilCom Systems Ltd. A request to withdraw application 14 OF 2019 has been Accepted. The Appeal is now marked withdrawn.', '2019-11-12 16:04:23'),
(119, '0122719412', 'WILCOM-TVET', 'Your Application with Reference:7 has been Received', '2019-11-12 16:48:05'),
(120, '0122719412', 'WILCOM-TVET', 'Your Application with Reference:7 has been Received', '2019-11-12 16:52:42'),
(121, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:7 has been submited and is awaiting your review', '2019-11-12 16:52:42'),
(122, '0701102928', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:7 has been submited and is awaiting your review', '2019-11-12 16:52:42'),
(123, '0722719412', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:7 has been submited and is awaiting your review', '2019-11-12 16:52:43'),
(124, '0122719412', 'WILCOM-TVET', 'Fees amount of: 45000 paid for application with Reference 12344545 has been confirmed.Application is now marked as paid.', '2019-11-12 17:00:56'),
(125, '0705555285', 'WILCOM-TVET', 'New application with Reference 12344545 has been submited and it\'s awaiting your review.', '2019-11-12 17:00:56'),
(126, '0122719412', 'WILCOM-TVET', 'Fees amount of: 45000 paid for application with Reference 12344545 has been confirmed.Application is now marked as paid.', '2019-11-12 17:00:56'),
(127, '0722719412', 'WILCOM-TVET', 'New application with Reference 12344545 has been submited and it\'s awaiting your review.', '2019-11-12 17:00:57'),
(128, '0701102928', 'WILCOM-TVET', 'New application with Reference 12344545 has been submited and it\'s awaiting your review.', '2019-11-12 17:00:57'),
(129, '0705555285', 'WILCOM-TVET', 'New Application 15 OF 2019 has been submited. You are required to Login to ARCMS and respond to it before: 2019-11-17T17:02:36.000Z', '2019-11-12 17:02:36'),
(130, '0701102928', 'WILCOM-TVET', 'You have been selected as case officer for  Application:15 OF 2019.', '2019-11-12 17:02:36'),
(131, '0705555285', 'WILCOM-TVET', 'New deadline extension request has been submited and it\'s awaiting your review.', '2019-11-12 17:15:50'),
(132, '0705555285', 'WILCOM-TVET', 'Your request for deadline extension has been DECLINED.You are expected to submit your response before 2019-11-17 17:02:35.', '2019-11-12 17:17:51'),
(133, '0705555285', 'WILCOM-TVET', 'Dear Elvis kimutai.PE has submited payment details for Filling Preliminary Objection for application:15 OF 2019.You are required confirm the payment.', '2019-11-12 17:25:24'),
(134, '0701102928', 'WILCOM-TVET', 'Dear CASE OFFICER.PE has submited payment details for Filling Preliminary Objection for application:15 OF 2019.You are required confirm the payment.', '2019-11-12 17:25:24'),
(135, '0722719412', 'WILCOM-TVET', 'Dear WILSON B. KEREBEI.PE has submited payment details for Filling Preliminary Objection for application:15 OF 2019.You are required confirm the payment.', '2019-11-12 17:25:24'),
(136, '0105555285', 'WILCOM-TVET', 'Fees amount of: 5000 paid for filing Preliminary Objection  has been confirmed.Your response is now marked as paid and submited.', '2019-11-12 17:32:57'),
(137, '0122719412', 'WILCOM-TVET', 'Your Application with Reference:8 has been Received', '2019-11-13 11:24:43'),
(138, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:8 has been submited and is awaiting your review', '2019-11-13 11:24:43'),
(139, '0701102928', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:8 has been submited and is awaiting your review', '2019-11-13 11:24:43'),
(140, '0722719412', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:8 has been submited and is awaiting your review', '2019-11-13 11:24:43'),
(141, '0122719412', 'WILCOM-TVET', 'Fees amount of: 75000 paid for application with Reference 12344545 has been confirmed.Application is now marked as paid.', '2019-11-13 11:32:12'),
(142, '0122719412', 'WILCOM-TVET', 'Fees amount of: 75000 paid for application with Reference 12344545 has been confirmed.Application is now marked as paid.', '2019-11-13 11:32:13'),
(143, '0705555285', 'WILCOM-TVET', 'New application with Reference 12344545 has been submited and it\'s awaiting your review.', '2019-11-13 11:32:13'),
(144, '0722719412', 'WILCOM-TVET', 'New application with Reference 12344545 has been submited and it\'s awaiting your review.', '2019-11-13 11:32:13'),
(145, '0701102928', 'WILCOM-TVET', 'New application with Reference 12344545 has been submited and it\'s awaiting your review.', '2019-11-13 11:32:13'),
(146, '0705555285', 'WILCOM-TVET', 'New Application 16 OF 2019 has been submited. You are required to Login to ARCMS and respond to it before: 2019-11-18T08:42:42.000Z', '2019-11-13 11:42:42'),
(147, '0705555285', 'WILCOM-TVET', 'You have been selected as case officer for  Application:16 OF 2019.', '2019-11-13 11:42:43'),
(148, '0705555285', 'WILCOM-TVET', 'Dear Elvis kimutai.PE has submited payment details for Filling Preliminary Objection for application:16 OF 2019.You are required confirm the payment.', '2019-11-13 11:56:15'),
(149, '0701102928', 'WILCOM-TVET', 'Dear CASE OFFICER.PE has submited payment details for Filling Preliminary Objection for application:16 OF 2019.You are required confirm the payment.', '2019-11-13 11:56:15'),
(150, '0722719412', 'WILCOM-TVET', 'Dear WILSON B. KEREBEI.PE has submited payment details for Filling Preliminary Objection for application:16 OF 2019.You are required confirm the payment.', '2019-11-13 11:56:15'),
(151, '0700392599', 'WILCOM-TVET', 'Fees amount of: 5000 paid for filing Preliminary Objection  has been confirmed.Your response is now marked as paid and submited.', '2019-11-13 12:26:38'),
(152, '0705555285', 'WILCOM-TVET', 'Your Activation Code is: 438956 Use this to activate your account.', '2019-11-13 14:08:20'),
(153, '0705555285', 'WILCOM-TVET', 'Your Activation Code is: 402248 Use this to activate your account.', '2019-11-13 14:36:03'),
(154, '0722114567', 'WILCOM-TVET', 'Your Activation Code is: 821525 Use this to activate your account.', '2019-11-13 15:01:29'),
(155, '0722114567', 'WILCOM-TVET', 'Your Activation Code is: 121630 Use this to activate your account.', '2019-11-13 15:14:40'),
(156, '0722114567', 'WILCOM-TVET', 'Your Activation Code is: 242481 Use this to activate your account.', '2019-11-13 15:24:33'),
(157, '0722114567', 'WILCOM-TVET', 'Your Application with Reference:15 has been Received', '2019-11-13 17:19:01'),
(158, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:15 has been submited and is awaiting your review', '2019-11-13 17:19:01'),
(159, '0701102928', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:15 has been submited and is awaiting your review', '2019-11-13 17:19:01'),
(160, '0722719412', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:15 has been submited and is awaiting your review', '2019-11-13 17:19:02'),
(161, '0722114567', 'WILCOM-TVET', 'Fees amount of: 5000 paid for application with Reference Reff123 has been confirmed.Application is now marked as paid.', '2019-11-13 17:31:37'),
(162, '0722114567', 'WILCOM-TVET', 'Fees amount of: 5000 paid for application with Reference Reff123 has been confirmed.Application is now marked as paid.', '2019-11-13 17:31:37'),
(163, '0705555285', 'WILCOM-TVET', 'New application with Reference Reff123 has been submited and it\'s awaiting your review.', '2019-11-13 17:31:37'),
(164, '0722719412', 'WILCOM-TVET', 'New application with Reference Reff123 has been submited and it\'s awaiting your review.', '2019-11-13 17:31:38'),
(165, '0701102928', 'WILCOM-TVET', 'New application with Reference Reff123 has been submited and it\'s awaiting your review.', '2019-11-13 17:31:38'),
(166, '0705555285', 'WILCOM-TVET', 'New Application 17 OF 2019 has been submited. You are required to Login to ARCMS and respond to it before: 2019-11-18T17:40:43.000Z', '2019-11-13 17:40:44'),
(167, '0705555285', 'WILCOM-TVET', 'You have been selected as case officer for  Application:17 OF 2019.', '2019-11-13 17:40:44'),
(168, '0722114567', 'WILCOM-TVET', 'Your Application with Reference:14 has been Received', '2019-11-13 17:49:23'),
(169, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:14 has been submited and is awaiting your review', '2019-11-13 17:49:23'),
(170, '0701102928', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:14 has been submited and is awaiting your review', '2019-11-13 17:49:23'),
(171, '0722719412', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:14 has been submited and is awaiting your review', '2019-11-13 17:49:24'),
(172, '0722114567', 'WILCOM-TVET', 'Fees amount of: 5000 paid for application with Reference Reff123 has been confirmed.Application is now marked as paid.', '2019-11-13 17:49:51'),
(173, '0722114567', 'WILCOM-TVET', 'Fees amount of: 5000 paid for application with Reference Reff123 has been confirmed.Application is now marked as paid.', '2019-11-13 17:49:51'),
(174, '0705555285', 'WILCOM-TVET', 'New application with Reference Reff123 has been submited and it\'s awaiting your review.', '2019-11-13 17:49:51'),
(175, '0701102928', 'WILCOM-TVET', 'New application with Reference Reff123 has been submited and it\'s awaiting your review.', '2019-11-13 17:49:52'),
(176, '0722719412', 'WILCOM-TVET', 'New application with Reference Reff123 has been submited and it\'s awaiting your review.', '2019-11-13 17:49:52'),
(177, '0705555285', 'WILCOM-TVET', 'Dear Elvis kimutai.PE has submited payment details for Filling Preliminary Objection for application:17 OF 2019.You are required confirm the payment.', '2019-11-13 18:34:07'),
(178, '0701102928', 'WILCOM-TVET', 'Dear CASE OFFICER.PE has submited payment details for Filling Preliminary Objection for application:17 OF 2019.You are required confirm the payment.', '2019-11-13 18:34:07'),
(179, '0722719412', 'WILCOM-TVET', 'Dear WILSON B. KEREBEI.PE has submited payment details for Filling Preliminary Objection for application:17 OF 2019.You are required confirm the payment.', '2019-11-13 18:34:07'),
(180, '0105555285', 'WILCOM-TVET', 'Fees amount of: 10000 paid for filing Preliminary Objection  has been confirmed.Your response is now marked as paid and submited.', '2019-11-13 18:38:25'),
(181, '0705555285', 'WILCOM-TVET', 'New deadline extension request has been submited and it\'s awaiting your review.', '2019-11-13 18:50:06'),
(182, '0705555285', 'WILCOM-TVET', 'New deadline extension request has been submited and it\'s awaiting your review.', '2019-11-14 07:29:45'),
(183, '0705555285', 'WILCOM-TVET', 'New deadline extension request has been submited and it\'s awaiting your review.', '2019-11-14 07:31:37'),
(184, '0722719412', 'WILCOM-TVET', 'Dear WILSON B. KEREBEI.PE has submited payment details for Filling Preliminary Objection for application:17 OF 2019.You are required confirm the payment.', '2019-11-14 07:33:32'),
(185, '0705555285', 'WILCOM-TVET', 'Dear Elvis kimutai.PE has submited payment details for Filling Preliminary Objection for application:17 OF 2019.You are required confirm the payment.', '2019-11-14 07:33:32'),
(186, '0701102928', 'WILCOM-TVET', 'Dear CASE OFFICER.PE has submited payment details for Filling Preliminary Objection for application:17 OF 2019.You are required confirm the payment.', '2019-11-14 07:33:32'),
(187, '0722719412', 'WILCOM-TVET', 'Dear WILSON B. KEREBEI.PE has submited payment details for Filling Preliminary Objection for application:17 OF 2019.You are required confirm the payment.', '2019-11-14 07:37:33'),
(188, '0705555285', 'WILCOM-TVET', 'Dear Elvis kimutai.PE has submited payment details for Filling Preliminary Objection for application:17 OF 2019.You are required confirm the payment.', '2019-11-14 07:37:33'),
(189, '0701102928', 'WILCOM-TVET', 'Dear CASE OFFICER.PE has submited payment details for Filling Preliminary Objection for application:17 OF 2019.You are required confirm the payment.', '2019-11-14 07:37:33'),
(190, '0105555285', 'WILCOM-TVET', 'Dear MINISTRY OF EDUCATION.Your response for Application15 OF 2019has been received.You will be notified when hearing date will be set.', '2019-11-14 07:37:50'),
(191, '0722719412', 'WILCOM-TVET', 'Dear WilCom Systems Ltd.A response for Application15 OF 2019has been sent by the Procuring Entity.', '2019-11-14 07:37:50'),
(192, '0722719412', 'WILCOM-TVET', 'Dear WilCom Systems Ltd.A response for Application15 OF 2019has been sent by the Procuring Entity.', '2019-11-14 07:37:50'),
(193, '0701102928', 'WILCOM-TVET', 'Dear CASE OFFICER.PE has submited a response for Application15 OF 2019.You are required to form a panel and submit it for review.', '2019-11-14 07:37:51'),
(194, '0122719412', 'WILCOM-TVET', 'Dear JAMES SUPPLIERS LTD.A response for Application15 OF 2019has been sent by the Procuring Entity.', '2019-11-14 07:37:51'),
(195, '0705555285', 'WILCOM-TVET', 'Your Activation Code is: 394387 Use this to activate your account.', '2019-11-14 15:31:53'),
(196, '0122719412', 'WILCOM-TVET', 'Application 16 that you had submited to ACRB has been declined.', '2019-11-14 15:35:51'),
(197, '0122719412', 'WILCOM-TVET', 'Application 16 that you had submited to ACRB has been declined.', '2019-11-14 15:35:51'),
(198, '0122719412', 'WILCOM-TVET', 'Application 16 that you had submited to ACRB has been declined.', '2019-11-14 15:40:08'),
(199, '0122719412', 'WILCOM-TVET', 'Application 16 that you had submited to ACRB has been declined.', '2019-11-14 15:40:09'),
(200, '0705555285', 'WILCOM-TVET', 'New Panel List for ApplicationNo:17 OF 2019 has been submited and it\'s awaiting your review.', '2019-11-14 15:52:12'),
(201, '0701102928', 'WILCOM-TVET', 'New Panel List for ApplicationNo:17 OF 2019 has been submited and it\'s awaiting your review.', '2019-11-14 15:52:12'),
(202, '0722719412', 'WILCOM-TVET', 'New Panel List for ApplicationNo:17 OF 2019 has been submited and it\'s awaiting your review.', '2019-11-14 15:52:12'),
(203, '0705555285', 'WILCOM-TVET', 'New Panel List for ApplicationNo:16 OF 2019 has been submited and it\'s awaiting your review.', '2019-11-14 16:14:13'),
(204, '0701102928', 'WILCOM-TVET', 'New Panel List for ApplicationNo:16 OF 2019 has been submited and it\'s awaiting your review.', '2019-11-14 16:14:13'),
(205, '0722719412', 'WILCOM-TVET', 'New Panel List for ApplicationNo:16 OF 2019 has been submited and it\'s awaiting your review.', '2019-11-14 16:14:14'),
(206, '0701102928', 'WILCOM-TVET', 'New Panel List for ApplicationNo:16 OF 2019 has been submited and it\'s awaiting your review.', '2019-11-14 16:16:44'),
(207, '0705555285', 'WILCOM-TVET', 'New Panel List for ApplicationNo:16 OF 2019 has been submited and it\'s awaiting your review.', '2019-11-14 16:16:44'),
(208, '0722719412', 'WILCOM-TVET', 'New Panel List for ApplicationNo:16 OF 2019 has been submited and it\'s awaiting your review.', '2019-11-14 16:16:44'),
(209, '0705555285', 'WILCOM-TVET', 'Your Activation Code is: 848331 Use this to activate your account.', '2019-11-14 20:23:37'),
(210, '0705555285', 'WILCOM-TVET', 'Your Activation Code is: 566835 Use this to activate your account.', '2019-11-15 09:47:21'),
(211, '0721382630', 'WILCOM-TVET', 'Your Activation Code is: 780799 Use this to activate your account.', '2019-11-15 10:28:19'),
(212, '0721382630', 'WILCOM-TVET', 'Your Activation Code is: 918251 Use this to activate your account.', '2019-11-15 10:30:35'),
(213, '0720768894', 'WILCOM-TVET', 'Your Activation Code is: 479438 Use this to activate your account.', '2019-11-15 10:31:47'),
(214, '0721382630', 'WILCOM-TVET', 'Your Activation Code is: 662849 Use this to activate your account.', '2019-11-15 10:32:30'),
(215, '0705128595', 'WILCOM-TVET', 'Your Activation Code is: 587989 Use this to activate your account.', '2019-11-15 10:40:29'),
(216, '0705555285', 'WILCOM-TVET', 'Your Activation Code is: 565124 Use this to activate your account.', '2019-11-15 10:43:35'),
(217, '0720768894', 'WILCOM-TVET', 'Your Activation Code is: 308586 Use this to activate your account.', '2019-11-15 10:51:47'),
(218, '0705128595', 'WILCOM-TVET', 'Your Activation Code is: 365271 Use this to activate your account.', '2019-11-15 10:52:42'),
(219, '0705128595', 'WILCOM-TVET', 'Your Application with Reference:17 has been Received', '2019-11-15 11:10:02'),
(220, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:17 has been submited and is awaiting your review', '2019-11-15 11:10:03'),
(221, '0722719412', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:17 has been submited and is awaiting your review', '2019-11-15 11:10:03'),
(222, '0701102928', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:17 has been submited and is awaiting your review', '2019-11-15 11:10:03'),
(223, '0705555285', 'WILCOM-TVET', 'Your Activation Code is: 823383 Use this to activate your account.', '2019-11-15 11:11:08'),
(224, '0705555285', 'WILCOM-TVET', 'Your Activation Code is: 332303 Use this to activate your account.', '2019-11-15 11:19:00'),
(225, '0722719412', 'WILCOM-TVET', 'Your Activation Code is: 267527 Use this to activate your account.', '2019-11-15 11:27:08'),
(226, '0701102928', 'WILCOM-TVET', 'Your Activation Code is: 915051 Use this to activate your account.', '2019-11-15 11:28:33'),
(227, '0705555285', 'WILCOM-TVET', 'Your Activation Code is: 401882 Use this to activate your account.', '2019-11-15 11:29:27'),
(228, '0721382630', 'WILCOM-TVET', 'Your Activation Code is: 187952 Use this to activate your account.', '2019-11-15 11:33:15'),
(229, '0720768894', 'WILCOM-TVET', 'Your Activation Code is: 428004 Use this to activate your account.', '2019-11-15 11:33:20'),
(230, '0705555285', 'WILCOM-TVET', 'Your Activation Code is: 542677 Use this to activate your account.', '2019-11-15 11:36:19'),
(231, '0705555285', 'WILCOM-TVET', 'Your Activation Code is: 382076 Use this to activate your account.', '2019-11-15 11:38:12'),
(232, '0720768894', 'WILCOM-TVET', 'Your Activation Code is: 652471 Use this to activate your account.', '2019-11-15 11:39:37'),
(233, '0122719412', 'WILCOM-TVET', 'Your Activation Code is: 881353 Use this to activate your account.', '2019-11-15 11:41:48'),
(234, '0122719412', 'WILCOM-TVET', 'Your Activation Code is: 743431 Use this to activate your account.', '2019-11-15 11:42:25'),
(235, '0705555285', 'WILCOM-TVET', 'Your Activation Code is: 886421 Use this to activate your account.', '2019-11-15 11:43:34'),
(236, '0733299665', 'WILCOM-TVET', 'Your Activation Code is: 140454 Use this to activate your account.', '2019-11-15 11:47:49'),
(237, '0722719412', 'WILCOM-TVET', 'Your Activation Code is: 732771 Use this to activate your account.', '2019-11-15 11:48:46'),
(238, '0722719412', 'WILCOM-TVET', 'Your Application with Reference:18 has been Received', '2019-11-15 11:50:58'),
(239, '0705555285', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:18 has been submited and is awaiting your review', '2019-11-15 11:50:59'),
(240, '0701102928', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:18 has been submited and is awaiting your review', '2019-11-15 11:50:59'),
(241, '0722955458', 'WILCOM-TVET', 'New request to approve application fees for Application with Reference No:18 has been submited and is awaiting your review', '2019-11-15 11:50:59'),
(242, '0705555285', 'WILCOM-TVET', 'Your Activation Code is: 894771 Use this to activate your account.', '2019-11-15 11:51:15'),
(243, '0722719412', 'WILCOM-TVET', 'Fees amount of: 15000 paid for application with Reference Reff123 has been confirmed.Application is now marked as paid.', '2019-11-15 11:51:57'),
(244, '0122719412', 'WILCOM-TVET', 'Fees amount of: 15000 paid for application with Reference Reff123 has been confirmed.Application is now marked as paid.', '2019-11-15 11:51:57'),
(245, '0705555285', 'WILCOM-TVET', 'New application with Reference Reff123 has been submited and it\'s awaiting your review.', '2019-11-15 11:51:57'),
(246, '07227194121', 'WILCOM-TVET', 'New application with Reference Reff123 has been submited and it\'s awaiting your review.', '2019-11-15 11:51:57'),
(247, '0701102928', 'WILCOM-TVET', 'New application with Reference Reff123 has been submited and it\'s awaiting your review.', '2019-11-15 11:51:57'),
(248, '0721382630', 'WILCOM-TVET', 'New application with Reference Reff123 has been submited and it\'s awaiting your review.', '2019-11-15 11:51:58'),
(249, '0734470491', 'WILCOM-TVET', 'Dear ECTA KENYA LIMITED.A response for Application18 OF 2019has been sent by the Procuring Entity.', '2019-11-15 12:06:44'),
(250, '0733299665', 'WILCOM-TVET', 'Dear STATE DEPARTMENT OF INTERIOR .Your response for Application18 OF 2019has been received.You will be notified when hearing date will be set.', '2019-11-15 12:06:44'),
(251, '07227194121', 'WILCOM-TVET', 'Dear WILSON B. KEREBEI.PE has submited a response for Application18 OF 2019.You are required to form a panel and submit it for review.', '2019-11-15 12:06:44'),
(252, '0705128595', 'WILCOM-TVET', 'Dear CMC MOTORS CORPORATION.A response for Application18 OF 2019has been sent by the Procuring Entity.', '2019-11-15 12:06:44'),
(253, '0705555285', 'WILCOM-TVET', 'Your Activation Code is: 568004 Use this to activate your account.', '2019-11-15 12:12:04'),
(254, '0720768894', 'WILCOM-TVET', 'Your Activation Code is: 166787 Use this to activate your account.', '2019-11-15 12:20:29'),
(255, '07227194121', 'WILCOM-TVET', 'New Panel List for ApplicationNo:18 OF 2019 has been submited and it\'s awaiting your review.', '2019-11-15 12:22:42'),
(256, '0705555285', 'WILCOM-TVET', 'New Panel List for ApplicationNo:18 OF 2019 has been submited and it\'s awaiting your review.', '2019-11-15 12:22:43'),
(257, '0701102928', 'WILCOM-TVET', 'New Panel List for ApplicationNo:18 OF 2019 has been submited and it\'s awaiting your review.', '2019-11-15 12:22:43'),
(258, '0721382630', 'WILCOM-TVET', 'Your Activation Code is: 833798 Use this to activate your account.', '2019-11-15 12:37:36'),
(259, '0722607128', 'WILCOM-TVET', 'Your Activation Code is: 211789 Use this to activate your account.', '2019-11-15 12:44:23'),
(260, '0721382630', 'WILCOM-TVET', 'Your Activation Code is: 489501 Use this to activate your account.', '2019-11-15 12:45:52'),
(261, '0722607127', 'WILCOM-TVET', 'Your Activation Code is: 290806 Use this to activate your account.', '2019-11-15 12:50:21'),
(262, '0722607127', 'WILCOM-TVET', 'Your Activation Code is: 283751 Use this to activate your account.', '2019-11-15 12:59:07'),
(263, '0722607127', 'WILCOM-TVET', 'Your Activation Code is: 524430 Use this to activate your account.', '2019-11-15 12:59:07'),
(264, '0722607127', 'WILCOM-TVET', 'Your Activation Code is: 500759 Use this to activate your account.', '2019-11-15 12:59:07'),
(265, '0722607127', 'WILCOM-TVET', 'Your Activation Code is: 703165 Use this to activate your account.', '2019-11-15 12:59:09'),
(266, '0722607127', 'WILCOM-TVET', 'Your Activation Code is: 236302 Use this to activate your account.', '2019-11-15 12:59:10'),
(267, '0722607127', 'WILCOM-TVET', 'Your Activation Code is: 605152 Use this to activate your account.', '2019-11-15 12:59:10'),
(268, '0722607127', 'WILCOM-TVET', 'Your Activation Code is: 306684 Use this to activate your account.', '2019-11-15 12:59:11'),
(269, '0722607127', 'WILCOM-TVET', 'Your Activation Code is: 785490 Use this to activate your account.', '2019-11-15 12:59:11'),
(270, '0720768894', 'WILCOM-TVET', 'Your Activation Code is: 665796 Use this to activate your account.', '2019-11-15 12:59:31'),
(271, '0722607127', 'WILCOM-TVET', 'Your Activation Code is: 853895 Use this to activate your account.', '2019-11-15 13:00:47'),
(272, '0720768894', 'WILCOM-TVET', 'Your Activation Code is: 812360 Use this to activate your account.', '2019-11-15 13:00:57'),
(273, '0705555285', 'WILCOM-TVET', 'Your Activation Code is: 666523 Use this to activate your account.', '2019-11-15 13:12:54'),
(274, '0705555285', 'WILCOM-TVET', 'Your Activation Code is: 742549 Use this to activate your account.', '2019-11-15 14:13:25');

-- --------------------------------------------------------

--
-- Table structure for table `smsdetails`
--

CREATE TABLE `smsdetails` (
  `ID` int(11) NOT NULL,
  `SenderID` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UserName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `URL` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Key` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `smsdetails`
--

INSERT INTO `smsdetails` (`ID`, `SenderID`, `UserName`, `URL`, `Key`) VALUES
(1, 'WILCOM-TVET', 'ARCM', 'http://api.mspace.co.ke/mspaceservice/wr/sms/sendtext/', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `smtpdetails`
--

CREATE TABLE `smtpdetails` (
  `ID` int(11) NOT NULL,
  `Host` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Port` int(255) DEFAULT NULL,
  `Sender` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `smtpdetails`
--

INSERT INTO `smtpdetails` (`ID`, `Host`, `Port`, `Sender`, `Password`) VALUES
(1, 'smtp.gmail.com', 465, 'arcmdevelopment@gmail.com\r\n', 'Arcm1234');

-- --------------------------------------------------------

--
-- Table structure for table `stdtenderdocs`
--

CREATE TABLE `stdtenderdocs` (
  `ID` bigint(20) NOT NULL,
  `Code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=5461 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `stdtenderdocs`
--

INSERT INTO `stdtenderdocs` (`ID`, `Code`, `Description`, `Created_At`, `Created_By`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_By`) VALUES
(10, 'STDOC-1', 'Civil Engineering Works', '2019-08-01 11:42:28', 'Admin', '2019-10-04 09:49:43', 'Admin', 0, NULL),
(11, 'STDOC-2', 'Works(Building and associated)', '2019-08-01 11:43:04', 'Admin', '2019-08-01 11:45:21', 'Admin', 0, NULL),
(12, 'STDOC-3', 'Tender Register', '2019-08-01 11:43:32', 'Admin', '2019-08-01 11:44:02', 'Admin', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tempusers`
--

CREATE TABLE `tempusers` (
  `Name` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `OngoingCases` int(11) NOT NULL,
  `CumulativeCases` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `tenderaddendums`
--

CREATE TABLE `tenderaddendums` (
  `ID` bigint(20) NOT NULL,
  `TenderID` bigint(20) NOT NULL,
  `ApplicantID` bigint(20) NOT NULL,
  `Description` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `StartDate` datetime DEFAULT NULL,
  `ClosingDate` datetime DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `AdendumNo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=8192 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tenderaddendums`
--

INSERT INTO `tenderaddendums` (`ID`, `TenderID`, `ApplicantID`, `Description`, `StartDate`, `ClosingDate`, `Created_By`, `Created_At`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_At`, `Deleted_By`, `AdendumNo`) VALUES
(1, 12, 0, 'CLARIFICATION FOLLOWING PRE-BID CONFERENCE', '2019-04-22 00:00:00', '2019-10-21 00:00:00', 'P0123456788X', '2019-11-11 15:48:54', NULL, NULL, 0, NULL, NULL, '1'),
(2, 18, 0, 'CLARIFICATION 02', '2019-11-06 00:00:00', '2019-11-12 00:00:00', 'P0123456788X', '2019-11-12 16:43:21', NULL, NULL, 0, NULL, NULL, '1');

-- --------------------------------------------------------

--
-- Table structure for table `tenders`
--

CREATE TABLE `tenders` (
  `ID` bigint(20) NOT NULL,
  `TenderNo` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Name` varchar(150) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PEID` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TenderValue` float(255,0) DEFAULT 0,
  `StartDate` datetime DEFAULT NULL,
  `ClosingDate` datetime DEFAULT NULL,
  `AwardDate` datetime DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(4) DEFAULT NULL,
  `Deleted_At` datetime DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TenderType` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TenderSubCategory` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `TenderCategory` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Timer` varchar(155) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=1260 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tenders`
--

INSERT INTO `tenders` (`ID`, `TenderNo`, `Name`, `PEID`, `TenderValue`, `StartDate`, `ClosingDate`, `AwardDate`, `Created_By`, `Created_At`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_At`, `Deleted_By`, `TenderType`, `TenderSubCategory`, `TenderCategory`, `Timer`) VALUES
(12, 'MOEST/ICT/02/2018-2019', 'DESIGN, DEVELOPMENT, TRAINING AND COMMISSIONING OF ONLINE EVENT TRACKING SYSTEM', 'PE-2', 5800000, '2019-04-12 00:00:00', '2019-04-12 00:00:00', '2019-11-11 00:00:00', 'P0123456788X', '2019-11-11 15:47:45', '2019-11-11 15:47:45', NULL, 0, NULL, NULL, 'A', NULL, '', 'Submited within 14 days'),
(16, 'CGS/SCM/WENR/OT/18-19/081', 'TENDER FOR PROVISION OF COMPREHENSIVE MAINTENANCE SERVICE OF VARIABLE REFRIGERANT FLOW (VRF) AIR CONDITIONING SYSTEMS AT CENTRAL BANK OF KENYA, MOMBAS', 'PE-3', 0, '2019-10-29 00:00:00', '2019-10-29 00:00:00', '2019-11-12 00:00:00', 'P0123456788X', '2019-11-12 10:58:39', '2019-11-12 10:58:39', NULL, 0, NULL, NULL, 'B', 'Simple', 'Pre-qualification', 'Submited within 14 days'),
(17, 'UON/ICT/2019-2020', 'POS HARDWARE FOR UNES BOKKSHOP', 'PE-3', 2500000, '2019-11-12 00:00:00', '2019-11-12 00:00:00', '2019-11-05 00:00:00', 'P0123456788X', '2019-11-12 15:45:25', '2019-11-12 15:45:25', NULL, 0, NULL, NULL, 'A', 'Complex', 'Pre-qualification', 'Submited within 14 days'),
(18, 'MOE/VTT/ICT/2018-2019', 'TVET MIS SUPPORT', 'PE-2', 0, '2019-11-15 00:00:00', '2019-11-15 00:00:00', '2019-11-11 00:00:00', 'P0123456788X', '2019-11-12 16:42:14', '2019-11-12 16:42:14', NULL, 0, NULL, NULL, 'B', 'Complex', 'Pre-qualification', 'Submited within 14 days'),
(21, 'CGS/SCM/WENR/OT/18-19/081', 'PROPOSED ESTABLISHMENT OF TREE NURSERIES AND TREE SEEDLINGS IN UGUNJA', 'PE-3', 0, '2019-11-21 00:00:00', '2019-11-21 00:00:00', '2019-11-05 00:00:00', 'P0123456788X', '2019-11-13 11:14:12', '2019-11-13 11:14:12', NULL, 0, NULL, NULL, 'B', 'Medium', 'Unquantified Tenders', 'Submited within 14 days'),
(22, 'TNDE/0001/2019', 'and in addition to this if fou', 'PE-2', 1200000, '2019-11-13 00:00:00', '2019-11-13 00:00:00', '2019-11-13 00:00:00', 'P09875345W', '2019-11-13 17:04:41', '2019-11-13 17:04:41', NULL, 0, NULL, NULL, 'A', NULL, '', 'Submited within 14 days'),
(23, 'TNDE/0001/2019', 'and in addition to this if fou', 'PE-2', 42000000, '2019-11-13 00:00:00', '2019-11-13 00:00:00', '2019-11-13 00:00:00', 'P09875345W', '2019-11-13 17:05:22', '2019-11-13 17:05:22', NULL, 0, NULL, NULL, 'A', NULL, '', 'Submited within 14 days'),
(24, 'TNDE/0001/2019', 'and in addition to this if fou', 'PE-2', 102000000, '2019-11-13 00:00:00', '2019-11-13 00:00:00', '2019-11-13 00:00:00', 'P09875345W', '2019-11-13 17:05:54', '2019-11-13 17:05:54', NULL, 0, NULL, NULL, 'A', NULL, '', 'Submited within 14 days'),
(25, 'TNDE/0001/2019', 'and in addition to this if fou', 'PE-2', 0, '2019-11-13 00:00:00', '2019-11-13 00:00:00', '2019-11-13 00:00:00', 'P09875345W', '2019-11-13 17:07:39', '2019-11-13 17:07:39', NULL, 0, NULL, NULL, 'B', 'Simple', 'Other Tenders', 'Submited within 14 days'),
(26, 'TNDE/0001/2019', 'and in addition to this if fou', 'PE-2', 0, '2019-11-13 00:00:00', '2019-11-13 00:00:00', '2019-11-13 00:00:00', 'P09875345W', '2019-11-13 17:08:00', '2019-11-13 17:08:00', NULL, 0, NULL, NULL, 'B', 'Simple', 'Other Tenders', 'Submited within 14 days'),
(27, 'TNDE/0001/2019', 'he applicant risks losing his deposit, and in addition to this if found to be corrupt/ fraudulent', 'PE-3', 0, '2019-11-01 00:00:00', '2019-11-01 00:00:00', '2019-11-14 00:00:00', 'P0123456788X', '2019-11-14 14:45:01', '2019-11-14 14:45:01', NULL, 0, NULL, NULL, 'B', NULL, 'Other Tenders', 'Submited within 14 days'),
(28, 'SDI/MISNG/004/2019-2020', 'LEASE OF MOTOR VEHICLES', 'PE-4', 1000000000, '2019-10-10 00:00:00', '2019-10-10 00:00:00', '2019-11-01 00:00:00', 'P123456879Q', '2019-11-15 10:55:16', '2019-11-15 10:55:16', NULL, 0, NULL, NULL, 'A', NULL, '', 'Submited within 14 days'),
(29, 'TNDE/0001/2019', 'Tender test', 'PE-2', 120000, '2019-11-15 00:00:00', '2019-11-15 00:00:00', '2019-11-15 00:00:00', 'P0123456788X', '2019-11-15 11:49:58', '2019-11-15 11:49:58', NULL, 0, NULL, NULL, 'A', NULL, '', 'Submited within 14 days'),
(30, '3458575/2019', 'Development of data center', 'PE-3', 0, '2019-11-05 00:00:00', '2019-11-05 00:00:00', '2019-11-13 00:00:00', 'P09875345W', '2019-11-19 15:02:25', '2019-11-19 15:02:25', NULL, 0, NULL, NULL, 'B', 'Simple', 'Pre-qualification', 'Submited within 14 days');

-- --------------------------------------------------------

--
-- Table structure for table `tendertypes`
--

CREATE TABLE `tendertypes` (
  `ID` bigint(20) NOT NULL,
  `Code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=8192 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tendertypes`
--

INSERT INTO `tendertypes` (`ID`, `Code`, `Description`, `Created_At`, `Created_By`, `Updated_At`, `Updated_By`, `Deleted`, `Deleted_By`) VALUES
(1, 'A', 'Tenders of Ascertainable Value', '2019-10-22 15:25:51', 'Admin', '2019-10-22 15:25:51', 'Admin', 0, NULL),
(2, 'B', 'Tenders of Unascertainable Value', '2019-10-22 15:26:33', 'Admin', '2019-10-22 15:26:33', 'Admin', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `towns`
--

CREATE TABLE `towns` (
  `PostCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Postoffice` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Town` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=92 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `towns`
--

INSERT INTO `towns` (`PostCode`, `Postoffice`, `Town`) VALUES
('20113', 'BAHATI', 'BAHATI'),
('80101', 'BAMBURI', 'MOMBASA'),
('50316', 'BANJA', 'BANJA'),
('50411', 'BAR OBER', 'BAR OBER'),
('20601', 'BARAGOI', 'BARAGOI'),
('30306', 'BARATON', 'BARATON'),
('10302', 'BARICHO', 'BARICHO'),
('30412', 'BARTOLIMO', 'BARTOLIMO'),
('30412', 'BARWESA', 'BARWESA'),
('01101', 'BISSIL', 'BISSIL'),
('50206', 'BOKOLI', 'BOKOLI'),
('20400', 'BOMET', 'BOMET'),
('20101', 'BONDENI', 'BONDENI'),
('40601', 'BONDO', 'BONDO'),
('50137', 'BOOKER', 'BOOKER'),
('40620', 'BORO', 'BORO'),
('50415', 'BUDALANGI', 'BUDALANGI'),
('30702', 'BUGAR', 'BUGAR'),
('50416', 'BUHUYI', 'BUHUYI'),
('50233', 'BUKEMBE', 'BUKEMBE'),
('50417', 'BUKIRI', 'BUKIRI'),
('50105', 'BUKURA', 'BUKURA'),
('50109', 'BULIMBO', 'BULIMBO'),
('50404', 'BUMALA', 'BUMALA'),
('05041', 'BUMUTIRU', 'BUMUTIRU'),
('50200', 'BUNGOMA', 'BUNGOMA'),
('50301', 'BUNYORE', 'BUNYORE'),
('70104', 'BURATANA', 'BURATANA'),
('30102', 'BURNT FOREST', 'BURNT FOREST'),
('00515', 'BURU BURU', 'NAIROBI'),
('50400', 'BUSIA', 'BUSIA'),
('50101', 'BUTERE', 'BUTERE'),
('50405', 'BUTULA', 'BUTULA'),
('50210', 'BUYOFU', 'BUYOFU'),
('50302', 'CHAMAKANGA', 'CHAMAKANGA'),
('80102', 'CHANGAMWE', 'MOMBASA'),
('50317', 'CHAVAKALI', 'CHAVAKALI'),
('30706', 'CHEBIEMIT', 'CHEBIEMIT'),
('20215', 'CHEBORGE', 'CHEBORGE'),
('30125', 'CHEBORORWA', 'CHEBORORWA'),
('20401', 'CHEBUNYO', 'CHEBUNYO'),
('20222', 'CHEMAMUL', 'CHEMAMUL'),
('20407', 'CHEMANER', 'CHEMANER'),
('40143', 'CHEMASE', 'CHEMASE'),
('40116', 'CHEMELIL', 'CHEMELIL'),
('30206', 'CHEMIRON', 'CHEMIRON'),
('30605', 'CHEPARERIA', 'CHEPARERIA'),
('30129', 'CHEPKORIO', 'CHEPKORIO'),
('30309', 'CHEPSONOI', 'CHEPSONOI'),
('50201', 'CHEPTAIS', 'CHEPTAIS'),
('20410', 'CHEPTALAL', 'CHEPTALAL'),
('30121', 'CHEPTERWAI', 'CHEPTERWAI'),
('30709', 'CHEPTONGEI', 'CHEPTONGEI'),
('20217', 'CHEPSINENDET', 'CHEPSINENDET'),
('30712', 'CHESOI', 'CHESOI'),
('60410', 'CHIAKANYINGA', 'CHIAKANYINGA'),
('60409', 'CHAIKARIGA', 'CHAIKARIGA'),
('60401', 'CHOGORIA', 'CHOGORIA'),
('60400', 'CHUKA', 'CHUKA'),
('90219', 'CHUVULI', 'CHUVULI'),
('90147', 'CHUMVI', 'CHUMVI'),
('80314', 'CHUMVINI', 'CHUMVINI'),
('50202', 'CHWELE', 'CHWELE'),
('00200', 'CITY SQUARE', 'NAIROBI'),
('80103', 'COAST GEN HSP', 'MOMBASA'),
('70103', 'DADAAB', 'DADAAB'),
('40112', 'DAGO', 'DAGO'),
('00516', 'DANDORA', 'NAIROBI'),
('40117', 'DARAJAMBILI', 'DARAJAMBILI'),
('90145', 'DAYSTAR UNIVERSITY', 'DAYSTAR UNIVERSITY'),
('40331', 'DEDE', 'DEDE'),
('80401', 'DIANI BEACH', 'DIANI BEACH'),
('80104', 'DOCKS', 'DOCKS'),
('10401', 'DOLDOL', 'DOLDOL'),
('50213', 'DOROFU', 'DOROFU'),
('40621', 'DUDI', 'DUDI'),
('20118', 'DUNDORI', 'DUNDORI'),
('00610', 'EASTLEIGH', 'NAIROBI'),
('20115', 'EGERTON UNIVERSITY', 'EGERTON UNIVERSITY'),
('90139', 'EKALAKALA', 'EKALAKALA'),
('70301', 'EL WAK', 'EL WAK'),
('20102', 'ELBURGON', 'ELBURGON'),
('20103', 'ELDAMA RAVINE  ', 'ELDAMA RAVINE  '),
('30124', 'ELDORET AIRPORT', 'ELDORET'),
('30100', 'ELDORET GPO', 'ELDORET'),
('20119', 'ELEMENTATITA', 'ELEMENTATITA'),
('50429', 'ELUGULU', 'ELUGULU'),
('90121', 'EMALI', 'EMALI'),
('00501', 'EMBAKASI', 'NAIROBI'),
('60100', 'EMBU', 'EMBU'),
('20140', 'EMINING', 'EMINING'),
('50314', 'EMUHAYA', 'EMUHAYA'),
('10107', 'ENDARASHA', 'ENDARASHA'),
('90206', 'ENDAU', 'ENDAU'),
('30201', 'ENDEBESS', 'ENDEBESS'),
('40703', 'ENOSAEN', 'ENOSAEN'),
('00500', 'ENTERPRISE ROAD', 'NAIROBI'),
('50303', 'EREGI', 'EREGI'),
('40208', 'ETAGO', 'ETAGO'),
('00242', 'EWASOKEDONG', 'EWASOKEDONG'),
('80501', 'FAZA', 'FAZA'),
('20209', 'FORT TERNAN', 'FORT TERNAN'),
('50406', 'FUNYULA', 'FUNYULA'),
('10210', 'GACHARAGE-INI', 'GACHARAGE-INI'),
('60119', 'GACHOKA', 'GACHOKA'),
('60209', 'GAITU', 'GAITU'),
('10109', 'GAKERE ROAD', 'GAKERE ROAD'),
('10111', 'GAKINDU', 'GAKINDU'),
('50318', 'GAMBOGI', 'GAMBOGI'),
('80205', 'GANZE', 'GANZE'),
('60301', 'GARBATULLA', 'GARBATULLA'),
('70100', 'GARISSA', 'GARISSA'),
('80201', 'GARSEN', 'GARSEN'),
('10212', 'GATARA', 'GATARA'),
('00239', 'GATHIRUINI', 'GATHIRUINI'),
('00240', 'GATHUGU', 'GATHUGU'),
('60217', 'GATIMBI', 'GATIMBI'),
('10114', 'GATITU', 'GATITU'),
('10115', 'GATONDO', 'GATONDO'),
('10305', 'GATUGURA', 'GATUGURA'),
('01028', 'GATUKUYU', 'GATUKUYU'),
('01030', 'GATUNDU', 'GATUNDU'),
('60404', 'GATUNGA', 'GATUNGA'),
('01013', 'GATURA', 'GATURA'),
('80208', 'GEDE', 'GEDE'),
('40312', 'GEMBE', 'GEMBE'),
('40503', 'GESIMA', 'GESIMA'),
('40201', 'GESUSU', 'GESUSU'),
('10108', 'GIAKANJA  ', 'GIAKANJA  '),
('00601', 'GIGIRI  ', 'NAIROBI'),
('10213', 'GIKOE', 'GIKOE'),
('20116', 'GILGIL', 'GILGIL'),
('40407', 'GIRIBE', 'GIRIBE'),
('50304', 'GISAMBAI', 'GISAMBAI'),
('00903', 'GITHIGA', 'GITHIGA'),
('60205', 'GITHOGO', 'GITHOGO'),
('01032', 'GITHUMU', 'GITHUMU'),
('00216', 'GITHUNGURI', 'GITHUNGURI'),
('60212', 'GITIMENE', 'GITIMENE'),
('01003', 'GITUAMBA', 'GITUAMBA'),
('10209', 'GITUGI', 'GITUGI'),
('80206', 'GONGINI', 'GONGINI'),
('20411', 'GORGOR', 'GORGOR'),
('70202', 'GRIFTU', 'GRIFTU'),
('70201', 'HABASWEIN  ', 'HABASWEIN  '),
('50407', 'HAKATI  ', 'HAKATI  '),
('50312', 'HAMISI  ', 'HAMISI  '),
('40640', 'HAWINGA  ', 'HAWINGA  '),
('00612', 'HIGHRIDGE  ', 'NAIROBI'),
('70101', 'HOLA  ', 'HOLA  '),
('40300', 'HOMA BAY  ', 'HOMA BAY  '),
('30109', 'HURUMA  ', 'NAIROBI'),
('10227', 'ICHICHI  ', 'ICHICHI  '),
('40209', 'IGARE  ', 'IGARE  '),
('60402', 'IGOJI  ', 'IGOJI  '),
('20307', 'IGWAMITI  ', 'IGWAMITI  '),
('90120', 'IIANI  ', 'IIANI  '),
('90135', 'IKALAASA  ', 'IKALAASA  '),
('40415', 'IKEREGE  ', 'IKEREGE  '),
('00904', 'IKINU  ', 'IKINU  '),
('40501', 'IKONGE  ', 'IKONGE  '),
('90207', 'IKUTHA  ', 'IKUTHA  '),
('60405', 'IKUU  ', 'IKUU  '),
('00214', 'ILASIT  ', 'ILASIT  '),
('50111', 'ILEHO  ', 'ILEHO  '),
('50112', 'IMANGA  ', 'IMANGA  '),
('60102', 'ISHIARA  ', 'ISHIARA  '),
('40414', 'ISIBANIA  ', 'ISIBANIA  '),
('01102', 'ISINYA  ', 'ISINYA  '),
('60300', 'ISIOLO  ', 'ISIOLO  '),
('50114', 'ISULU  ', 'ISULU  '),
('30700', 'ITEN  ', 'ITEN  '),
('01015', 'ITHANGA  ', 'ITHANGA  '),
('40504', 'ITIBO  ', 'ITIBO  '),
('40210', 'ITUMBE  ', 'ITUMBE  '),
('50319', 'JEBROK  ', 'JEBROK  '),
('00622', 'JUJA ROAD  ', 'NAIROBI'),
('60411', 'KAANWA', 'KAANWA'),
('20157', 'KABARAK UNIVERSITY', 'KABARAK UNIVERSITY'),
('30400', 'KABARNET', 'KABARNET'),
('30401', 'KABARTONJO', 'KABARTONJO'),
('90205', 'KABATI', 'KABATI'),
('20114', 'KABAZI', 'KABAZI'),
('20201', 'KABIANGA', 'KABIANGA'),
('30130', 'KABIEMIT', 'KABIEMIT'),
('30303', 'KABIYET', 'KABIYET'),
('30305', 'KABUJOI', 'KABUJOI'),
('50214', 'KABULA', 'KABULA'),
('30601', 'KACHELIBA', 'KACHELIBA'),
('40314', 'KADEL', 'KADEL'),
('40223', 'KADONGO', 'KADONGO'),
('90150', 'KAEWA', 'KAEWA'),
('10306', 'KAGIO', 'KAGIO'),
('10307', 'KAGUMO', 'KAGUMO'),
('01033', 'KAGUNDUINI', 'KAGUNDUINI'),
('00223', 'KAGWE', 'KAGWE'),
('20304', 'KAHEHO', 'KAHEHO'),
('10206', 'KAHUHIA', 'KAHUHIA'),
('10201', 'KAHURO', 'KAHURO'),
('10214', 'KAHUTI', 'KAHUTI'),
('50305', 'KAIMOSI', 'KAIMOSI'),
('30604', 'KAINUK', 'KAINUK'),
('10215', 'KAIRO', 'KAIRO'),
('01100', 'KAJIADO', 'KAJIADO'),
('50100', 'KAKAMEGA', 'KAKAMEGA'),
('50419', 'KAKEMER', 'KAKEMER'),
('30216', 'KAKIBORA', 'KAKIBORA'),
('80209', 'KAKONENI', 'KAKONENI'),
('30501', 'KAKUMA', 'KAKUMA'),
('50115', 'KAKUNGA', 'KAKUNGA'),
('01014', 'KAKUZI', 'KAKUZI'),
('90122', 'KALAMBA', 'KALAMBA'),
('90126', 'KALAWA', 'KALAWA'),
('01001', 'KALIMONI', 'KALIMONI'),
('30502', 'KALOKOL', 'KALOKOL'),
('80105', 'KALOLENI', 'KALOLENI'),
('20218', 'KAMAGET', 'KAMAGET'),
('10217', 'KAMAHUHA', 'KAMAHUHA'),
('20134', 'KAMARA', 'KAMARA'),
('50116', 'KAMBIRI', 'KAMBIRI'),
('10226', 'KAMBITI', 'KAMBITI'),
('00607', 'KAMITI', 'KAMITI'),
('30406', 'KAMPI YA SAMAKI', 'KAMPI YA SAMAKI'),
('50408', 'KAMURIAI', 'KAMURIAI'),
('90403', 'KAMUWONGO', 'KAMUWONGO'),
('20132', 'KAMWAURA', 'KAMWAURA'),
('30113', 'KAMWOSOR', 'KAMWOSOR'),
('01034', 'KANDARA', 'KANDARA'),
('40304', 'KANDIEGE', 'KANDIEGE'),
('10218', 'KANGARI', 'KANGARI'),
('10202', 'KANGEMA', 'KANGEMA'),
('00625', 'KANGEMI', 'NAIROBI'),
('90115', 'KANGUNDO', 'KANGUNDO'),
('60118', 'KANJA', 'KANJA'),
('01004', 'KANJUKU', 'KANJUKU'),
('60206', 'KANYAKINE', 'KANYAKINE'),
('10220', 'KANYENYAINI', 'KANYENYAINI'),
('60106', 'KANYUAMBORA', 'KANYUAMBORA'),
('30304', 'KAPCHENO', 'KAPCHENO'),
('30204', 'KAPCHEROP', 'KAPCHEROP'),
('30311', 'KAPCHORWA', 'KAPCHORWA'),
('30410', 'KAPEDO', 'KAPEDO'),
('30600', 'KAPENGURIA', 'KAPENGURIA'),
('20214', 'KAPKATET', 'KAPKATET'),
('20219', 'KAPKELET', 'KAPKELET'),
('30119', 'KAPKENDA', 'KAPKENDA'),
('20206', 'KAPKUGERWET', 'KAPKUGERWET'),
('30111', 'KAPNGETUNY', 'KAPNGETUNY'),
('30300', 'KAPSABET', 'KAPSABET'),
('03020', 'KAPSARA', 'KAPSARA'),
('20211', 'KAPSOIT', 'KAPSOIT'),
('50203', 'KAPSOKWONY', 'KAPSOKWONY'),
('30705', 'KAPSOWAR', 'KAPSOWAR'),
('30313', 'KAPSUMBEIWA', 'KAPSUMBEIWA'),
('20207', 'KAPSUSER', 'KAPSUSER'),
('30114', 'KAPTAGAT', 'KAPTAGAT'),
('30710', 'KAPTALAMWA', 'KAPTALAMWA'),
('50234', 'KAPTAMA', 'KAPTAMA'),
('30701', 'KAPTARAKWA', 'KAPTARAKWA'),
('20221', 'KAPTEBENGWET', 'KAPTEBENGWET'),
('30312', 'KAPTEL', 'KAPTEL'),
('30711', 'KAPTEREN', 'KAPTEREN'),
('60105', 'KARABA', 'KARABA'),
('20328', 'KARANDI', 'KARANDI'),
('10101', 'KARATINA', 'KARATINA'),
('00233', 'KARATU', 'KARATU'),
('00502', 'KAREN', 'KAREN'),
('60107', 'KARINGARI', 'KARINGARI'),
('00615', 'KARIOBANGI', 'NAIROBI'),
('10231', 'KARIUA', 'KARIUA'),
('40505', 'KAROTA', 'KAROTA'),
('40401', 'KARUNGU', 'KARUNGU'),
('00219', 'KARURI', 'KARURI'),
('60117', 'KARURUMO', 'KARURUMO'),
('00608', 'KASARANI', 'NAIROBI'),
('80307', 'KASIGAU', 'KASIGAU'),
('90123', 'KASIKEU', 'KASIKEU'),
('90106', 'KATANGI', 'KATANGI'),
('90105', 'KATHIANI', 'KATHIANI'),
('90302', 'KATHONZWENI', 'KATHONZWENI'),
('60406', 'KATHWANA', 'KATHWANA'),
('40118', 'KATITO', 'KATITO'),
('90404', 'KATSE', 'KATSE'),
('90217', 'KATUTU', 'KATUTU'),
('90107', 'KAVIANI', 'KAVIANI'),
('90405', 'KAVUTI  ', 'KAVUTI  '),
('00518', 'KAYOLE', 'KAYOLE'),
('40506', 'KEBIRIGO', 'KEBIRIGO'),
('20220', 'KEDOWA', 'KEDOWA'),
('20501', 'KEEKOROK', 'KEEKOROK'),
('40515', 'KEGOGI', 'KEGOGI'),
('40416', 'KEGONGA', 'KEGONGA'),
('40413', 'KEHANCHA', 'KEHANCHA'),
('40301', 'KENDU BAY', 'KENDU BAY'),
('01020', 'KENOL (MAKUYU)', 'KENOL (MAKUYU)'),
('00202', 'KENYATTA NATIONAL HOSPITAL', 'NAIROBI'),
('00609', 'KENYATTA UNIVERSITY', 'NAIROBI'),
('40211', 'KENYENYA', 'KENYENYA'),
('20200', 'KERICHO', 'KERICHO'),
('40202', 'KEROKA', 'KEROKA'),
('10300', 'KERUGOYA', 'KERUGOYA'),
('00906', 'KERWA', 'KERWA'),
('30215', 'KESOGON', 'KESOGON'),
('30132', 'KESSES', 'KESSES'),
('40212', 'KEUMBU', 'KEUMBU'),
('60108', 'KEVOTE', 'KEVOTE'),
('50104', 'KHAYEGA', 'KHAYEGA'),
('50306', 'KHUMUSALABA', 'KHUMUSALABA'),
('50135', 'KHWISERO', 'KHWISERO'),
('10122', 'KIAMARIGA', 'KIAMARIGA'),
('60109', 'KIAMBERE', 'KIAMBERE'),
('00900', 'KIAMBU', 'KIAMBU'),
('40213', 'KIAMOKAMA', 'KIAMOKAMA'),
('10309', 'KIAMUTUGU', 'KIAMUTUGU'),
('00236', 'KIAMWANGI', 'KIAMWANGI'),
('10123', 'KIANDU', 'KIANDU'),
('60602', 'KIANJAI', 'KIANJAI'),
('60122', 'KIANJOKOMA', 'KIANJOKOMA'),
('10301', 'KIANYAGA', 'KIANYAGA'),
('40119', 'KIBIGORI', 'KIBIGORI'),
('10311', 'KIBINGOTI', 'KIBINGOTI'),
('60201', 'KIBIRICHIA', 'KIBIRICHIA'),
('60112', 'KIBUGU', 'KIBUGU'),
('90137', 'KIBWEZI', 'KIBWEZI'),
('10102', 'KIGANJO', 'KIGANJO'),
('10203', 'KIGUMO', 'KIGUMO'),
('10207', 'KIHOYA', 'KIHOYA'),
('30110', 'KIHUGA SQUARE', 'KIHUGA SQUARE'),
('60207', 'KIIRUA', 'KIIRUA'),
('00220', 'KIJABE', 'KIJABE'),
('90125', 'KIKIMA', 'KIKIMA'),
('00902', 'KIKUYU', 'KIKUYU'),
('90305', 'KILALA', 'KILALA'),
('40700', 'KILGORIS', 'KILGORIS'),
('30315', 'KILIBWONI', 'KILIBWONI'),
('08010', 'KILIFI', 'KILIFI'),
('80107', 'KILINDINI', 'KILINDINI'),
('50315', 'KILINGILI', 'KILINGILI'),
('10125', 'KIMAHURI', 'KIMAHURI'),
('00215', 'KIMANA', 'KIMANA'),
('10140', 'KIMATHI WAY', 'KIMATHI WAY'),
('10310', 'KIMBIMBI', 'KIMBIMBI'),
('50204', 'KIMILILI', 'KIMILILI'),
('30209', 'KIMININI', 'KIMININI'),
('30120', 'KIMONING', 'KIMONING'),
('20225', 'KIMULOT', 'KIMULOT'),
('10312', 'KIMUNYE', 'KIMUNYE'),
('30128', 'KIMWARER', 'KIMWARER'),
('20320', 'KINAMBA', 'KINAMBA'),
('80405', 'KINANGO', 'KINANGO'),
('00227', 'KINARI', 'KINARI'),
('01031', 'KINDARUMA', 'KINDARUMA'),
('60216', 'KINORU', 'KINORU'),
('60211', 'KIONYO', 'KIONYO'),
('80116', 'KIPEVU', 'KIPEVU'),
('30103', 'KIPKABUS', 'KIPKABUS'),
('50241', 'KIPKARREN RIVER', 'KIPKARREN RIVER'),
('20202', 'KIPKELION', 'KIPKELION'),
('30117', 'KIPLEGETET', 'KIPLEGETET'),
('30203', 'KIPSAINA', 'KIPSAINA'),
('30411', 'KIPSARAMAN', 'KIPSARAMAN'),
('30118', 'KIPTABACH', 'KIPTABACH'),
('30402', 'KIPTAGICH', 'KIPTAGICH'),
('20133', 'KIPTANGWANYI', 'KIPTANGWANYI'),
('20213', 'KIPTERE', 'KIPTERE'),
('20208', 'KIPTUGUMO', 'KIPTUGUMO'),
('20131', 'KIRENGETI', 'KIRENGETI'),
('10204', 'KIRIANI', 'KIRIANI'),
('60113', 'KIRITIRI', 'KIRITIRI'),
('50313', 'KIRITU', 'KIRITU'),
('01017', 'KIRIUA', 'KIRIUA'),
('01018', 'KIRUARA', 'KIRUARA'),
('20144', 'KISANANA', 'KISANANA'),
('90204', 'KISASI', 'KISASI'),
('00206', 'KISERIAN', 'KISERIAN'),
('40200', 'KISII', 'KISII'),
('40100', 'KISUMU', 'KISUMU'),
('30200', 'KITALE', 'KITALE'),
('00241', 'KITENGELA', 'KITENGELA'),
('90124', 'KITHIMANI', 'KITHIMANI'),
('60114', 'KITHIMU', 'KITHIMU'),
('90144', 'KITHYOKO', 'KITHYOKO'),
('90303', 'KITISE', 'KITISE'),
('80316', 'KITIVO', 'KITIVO'),
('90200', 'KITUI', 'KITUI'),
('90148', 'KIUNDUANI', 'KIUNDUANI'),
('90218', 'KIUSYANI', 'KIUSYANI'),
('90116', 'KIVAANI', 'KIVAANI'),
('90111', 'KIVUNGA', 'KIVUNGA'),
('50420', 'KOCHOLYA', 'KOCHOLYA'),
('30314', 'KOILOT', 'KOILOT'),
('40317', 'KOJWANG', 'KOJWANG'),
('90108', 'KOLA', 'KOLA'),
('40102', 'KOMBEWA', 'KOMBEWA'),
('40103', 'KONDELE', 'KONDELE'),
('40121', 'KONDIK', 'KONDIK'),
('40639', 'KORACHA', 'KORACHA'),
('40104', 'KORU', 'KORU'),
('40332', 'KOSELE', 'KOSELE'),
('50117', 'KOYONZO', 'KOYONZO'),
('20154', 'KURESOI', 'KURESOI'),
('10304', 'KUTUS', 'KUTUS'),
('80403', 'KWALE', 'KWALE'),
('30210', 'KWANZA', 'KWANZA'),
('90215', 'KWAVONZA', 'KWAVONZA'),
('90220', 'KYATUNE', 'KYATUNE'),
('90209', 'KYENI', 'KYENI'),
('90401', 'KYUSO', 'KYUSO'),
('60601', 'LAARE  ', 'LAARE  '),
('40122', 'LADHRIAWASI  ', 'LADHRIAWASI  '),
('20330', 'LAIKIPIA CAMPUS  ', 'LAIKIPIA  '),
('60502', 'LAISAMIS  ', 'LAISAMIS  '),
('80500', 'LAMU  ', 'LAMU  '),
('20112', 'LANET  ', 'LANET  '),
('30112', 'LANGAS  ', 'ELDORET'),
('00509', 'LANGATA  ', 'NAIROBI'),
('00603', 'LAVINGTON  ', 'NAIROBI'),
('20310', 'LESHAU  ', 'LESHAU  '),
('30302', 'LESSOS  ', 'LESSOS  '),
('80110', 'LIKONI  ', 'LIKONI  '),
('00217', 'LIMURU  ', 'LIMURU  '),
('90109', 'LITA  ', 'LITA  '),
('20210', 'LITEIN  ', 'LITEIN  '),
('30500', 'LODWAR  ', 'LODWAR  '),
('00209', 'LOITOKTOK  ', 'LOITOKTOK  '),
('60501', 'LOIYANGALANI  ', 'LOIYANGALANI  '),
('30503', 'LOKICHOGGIO  ', 'LOKICHOGGIO  '),
('30504', 'LOKITAUNG  ', 'LOKITAUNG  '),
('30506', 'LOKORI  ', 'LOKORI  '),
('40701', 'LOLGORIAN  ', 'LOLGORIAN  '),
('20203', 'LONDIANI', 'LONDIANI'),
('20402', 'LONGISA  ', 'LONGISA  '),
('00604', 'LOWER KABETE  ', 'NAIROBI'),
('50307', 'LUANDA  ', 'LUANDA  '),
('50219', 'LUANDANYI  ', 'LUANDANYI  '),
('50240', 'LUANDETI  ', 'LUANDETI  '),
('50118', 'LUBAO  ', 'LUBAO  '),
('50108', 'LUGARI  ', 'LUGARI  '),
('40622', 'LUGINGO  ', 'LUGINGO  '),
('40623', 'LUHANO  ', 'LUHANO  '),
('50421', 'LUKOLIS  ', 'LUKOLIS  '),
('80408', 'LUKORE  ', 'LUKORE  '),
('50132', 'LUKUME  ', 'LUKUME  '),
('50242', 'LUMAKANDA  ', 'LUMAKANDA  '),
('80402', 'LUNGALUNGA  ', 'NAIROBI'),
('50119', 'LUNZA  ', 'LUNZA  '),
('00905', 'LUSINGETI  ', 'LUSINGETI  '),
('50320', 'LUSIOLA  ', 'LUSIOLA  '),
('50121', 'LUTASO  ', 'LUTASO  '),
('50220', 'LWAKHAKHA  ', 'LWAKHAKHA  '),
('20147', 'MAAIMAHIU  ', 'MAAIMAHIU  '),
('50235', 'MABUSI  ', 'MABUSI  '),
('90100', 'MACHAKOS  ', 'MACHAKOS  '),
('01002', 'MADARAKA  ', 'NAIROBI'),
('40613', 'MADIANY  ', 'MADIANY  '),
('80207', 'MADINA  ', 'MADINA  '),
('50321', 'MAGADA  ', 'MAGADA  '),
('00205', 'MAGADI  ', 'MAGADI  '),
('40516', 'MAGENA  ', 'MAGENA  '),
('50325', 'MAGO  ', 'MAGO  '),
('40507', 'MAGOMBO  ', 'MAGOMBO  '),
('60403', 'MAGUMONI  ', 'MAGUMONI  '),
('40307', 'MAGUNGA  ', 'MAGUNGA  '),
('06040', 'MAGUTUNI  ', 'MAGUTUNI  '),
('40508', 'MAGWAGWA  ', 'MAGWAGWA  '),
('50322', 'MAHANGA  ', 'MAHANGA  '),
('20314', 'MAIROINYA  ', 'MAIROINYA  '),
('20145', 'MAJIMAZURI  ', 'MAJIMAZURI  '),
('20418', 'MAKIMENY  ', 'MAKIMENY  '),
('90138', 'MAKINDU  ', 'MAKINDU  '),
('00510', 'MAKONGENI  ', 'MAKONGENI  '),
('80315', 'MAKTAU  ', 'MAKTAU  '),
('90300', 'MAKUENI  ', 'MAKUENI  '),
('20149', 'MAKUMBI  ', 'MAKUMBI  '),
('50133', 'MAKUNGA  ', 'MAKUNGA  '),
('80112', 'MAKUPA  ', 'MAKUPA  '),
('20141', 'MAKUTANO  ', 'MAKUTANO  '),
('01020', 'MAKUYU  ', 'MAKUYU  '),
('50122', 'MALAHA  ', 'MALAHA  '),
('50209', 'MALAKISI  ', 'MALAKISI  '),
('50103', 'MALAVA  ', 'MALAVA  '),
('80200', 'MALINDI  ', 'MALINDI  '),
('50123', 'MALINYA  ', 'MALINYA  '),
('70300', 'MANDERA  ', 'MANDERA  '),
('40509', 'MANGA  ', 'MANGA  '),
('80301', 'MANYANI  ', 'MANYANI  '),
('60101', 'MANYATTA  ', 'MANYATTA  '),
('40625', 'MANYUANDA  ', 'MANYUANDA  '),
('50126', 'MANYULIA  ', 'MANYULIA  '),
('50300', 'MARAGOLI  ', 'MARAGOLI  '),
('10205', 'MARAGUA  ', 'MARAGUA  '),
('20600', 'MARALAL  ', 'MARALAL  '),
('40214', 'MARANI  ', 'MARANI  '),
('80113', 'MARIAKANI  ', 'MOMBASA  '),
('30403', 'MARIGAT  ', 'MARIGAT  '),
('60408', 'MARIMA  ', 'MARIMA  '),
('60215', 'MARIMANTI  ', 'MARIMANTI  '),
('40408', 'MARIWA  ', 'MARIWA  '),
('20322', 'MARMANET  ', 'MARMANET  '),
('60500', 'MARSABIT  ', 'MARSABIT  '),
('50324', 'MASANA  ', 'MASANA  '),
('40105', 'MASENO  ', 'MASENO  '),
('80312', 'MASHINI  ', 'MASHINI  '),
('01103', 'MASHURU  ', 'MASHURU  '),
('90101', 'MASII  ', 'MASII  '),
('40215', 'MASIMBA  ', 'MASIMBA  '),
('50139', 'MASINDE MULIRO UNIVERSITY  ', 'MASINDE MULIRO UNIVERSITY  '),
('90141', 'MASINGA  ', 'MASINGA  '),
('50422', 'MATAYOS  ', 'MATAYOS  '),
('50136', 'MATETE  ', 'MATETE  '),
('00611', 'MATHARE VALLEY  ', 'NAIROBI'),
('90406', 'MATHUKI  ', 'MATHUKI  '),
('90140', 'MATILIKU  ', 'MATILIKU  '),
('90210', 'MATINYANI  ', 'MATINYANI  '),
('80406', 'MATUGA  ', 'MATUGA  '),
('30205', 'MATUNDA  ', 'MATUNDA  '),
('90119', 'MATUU  ', 'MATUU  '),
('20111', 'MAU NAROK  ', 'MAU NAROK  '),
('20122', 'MAU SUMMIT  ', 'MAU SUMMIT  '),
('60600', 'MAUA  ', 'MAUA  '),
('80317', 'MAUNGU  ', 'MAUNGU  '),
('90304', 'MAVINDINI  ', 'MAVINDINI  '),
('40310', 'MAWEGO  ', 'MAWEGO  '),
('80114', 'MAZERAS  ', 'MAZERAS  '),
('00503', 'MBAGATHI  ', 'MBAGATHI  '),
('50236', 'MBAKALO  ', 'MBAKALO  '),
('00231', 'MBARIYANJIKU  ', 'MBARIYANJIKU  '),
('10233', 'MBIRI  ', 'MBIRI  '),
('40305', 'MBITA  ', 'MBITA  '),
('90214', 'MBITINI  ', 'MBITINI  '),
('90110', 'MBIUNI  ', 'MBIUNI  '),
('00127', 'MBUMBUNI  ', 'MBUMBUNI  '),
('00504', 'MCHUMBI ROAD  ', 'MCHUMBI ROAD  '),
('20104', 'MENENGAI  ', 'NAKURU  '),
('20419', 'MERIGI  ', 'MERIGI  '),
('60303', 'MERTI  ', 'MERTI  '),
('60200', 'MERU  ', 'MERU  '),
('40319', 'MFANGANO  ', 'MFANGANO  '),
('80313', 'MGAMBONYI  ', 'MGAMBONYI  '),
('80306', 'MGANGE  ', 'MGANGE  '),
('60604', 'MIATHENE  ', 'MIATHENE  '),
('01029', 'MIGIOINI  ', 'MIGIOINI  '),
('90402', 'MIGWANI  ', 'MIGWANI  '),
('20301', 'MIHARATI  ', 'MIHARATI  '),
('40225', 'MIKAYI  ', 'MIKAYI  '),
('60607', 'MIKINDURI  ', 'MIKINDURI  '),
('50138', 'MILIMANI  ', 'MILIMANI  '),
('20123', 'MILTON SIDING  ', 'MILTON SIDING  '),
('20124', 'MIRANGINE  ', 'MIRANGINE  '),
('40320', 'MIROGI  ', 'MIROGI  '),
('50207', 'MISIKHU  ', 'MISIKHU  '),
('40626', 'MISORI  ', 'MISORI  '),
('90104', 'MITABONI  ', 'MITABONI  '),
('60204', 'MITUNGUU  ', 'MITUNGUU  '),
('90112', 'MIU  ', 'MIU  '),
('40106', 'MIWANI  ', 'MIWANI  '),
('80106', 'MKOMANI  ', 'MKOMANI  '),
('00620', 'MOBI PLAZA  ', 'MOBI PLAZA  '),
('20312', 'MOCHONGOI  ', 'MOCHONGOI  '),
('20403', 'MOGOGOSIEK  ', 'MOGOGOSIEK  '),
('20105', 'MOGOTIO  ', 'MOGOTIO  '),
('80115', 'MOI AIRPORT  ', 'MOMBASA  '),
('30107', 'MOI UNIVERSITY  ', 'MOI UNIVERSITY  '),
('30104', 'MOIBEN  ', 'MOIBEN  '),
('30202', 'MOI`S BRIDGE  ', 'MOI`S BRIDGE  '),
('40510', 'MOKOMONI  ', 'MOKOMONI  '),
('80502', 'MOKOWE  ', 'MOKOWE  '),
('20106', 'MOLO  ', 'MOLO  '),
('80100', 'MOMBASA  ', 'MOMBASA  '),
('30307', 'MOSORIOT  ', 'MOSORIOT  '),
('60700', 'MOYALE  ', 'MOYALE  '),
('80503', 'MPEKETONI  ', 'MPEKETONI  '),
('80404', 'MSAMBWENI  ', 'MSAMBWENI  '),
('90128', 'MTITOANDEI  ', 'MTITOANDEI  '),
('80111', 'MTONGWE  ', 'MTONGWE  '),
('80117', 'MTOPANGA  ', 'MTOPANGA  '),
('80109', 'MTWAPA  ', 'MTWAPA  '),
('50423', 'MUBWAYO  ', 'MUBWAYO  '),
('70102', 'MUDDOGASHE  ', 'MUDDOGASHE  '),
('40627', 'MUDHIERO  ', 'MUDHIERO  '),
('00228', 'MUGUGA  ', 'MUGUGA  '),
('10129', 'MUGUNDA  ', 'MUGUNDA  '),
('40107', 'MUHORONI  ', 'MUHORONI  '),
('20323', 'MUHOTETU  ', 'MUHOTETU  '),
('40409', 'MUHURU BAY  ', 'MUHURU BAY  '),
('01023', 'MUKERENJU  ', 'MUKERENJU  '),
('20315', 'MUKEU  ', 'MUKEU  '),
('40410', 'MUKURO  ', 'MUKURO  '),
('10103', 'MUKURWEINI  ', 'MUKURWEINI  '),
('90216', 'MULANGO  ', 'MULANGO  '),
('50428', 'MULUANDA  ', 'MULUANDA  '),
('50102', 'MUMIAS  ', 'MUMIAS  '),
('00235', 'MUNDORO  ', 'MUNDORO  '),
('50425', 'MUNGATSI  ', 'MUNGATSI  '),
('10200', 'MURANGA  ', 'MURANGA  '),
('01024', 'MURUKA  ', 'MURUKA  '),
('50426', 'MURUMBA  ', 'MURUMBA  '),
('20316', 'MURUNGARU  ', 'MURUNGARU  '),
('60120', 'MURURI  ', 'MURURI  '),
('50125', 'MUSANDA  ', 'MUSANDA  '),
('90211', 'MUTHA  ', 'MUTHA  '),
('00619', 'MUTHAIGA  ', 'MUTHAIGA  '),
('90113', 'MUTHETHENI  ', 'MUTHETHENI  '),
('90117', 'MUTITUNI  ', 'MUTITUNI  '),
('90201', 'MUTOMO  ', 'MUTOMO  '),
('40628', 'MUTUMBU  ', 'MUTUMBU  '),
('90114', 'MUUMANDU  ', 'MUUMANDU  '),
('90102', 'MWALA  ', 'MWALA  '),
('80305', 'MWATATE  ', 'MWATATE  '),
('10104', 'MWEIGA  ', 'MWEIGA  '),
('90400', 'MWINGI  ', 'MWINGI  '),
('20504', 'NAIRAGEENKARE  ', 'NAIRAGEENKARE  '),
('00100', 'NAIROBI GPO  ', 'NAIROBI'),
('20142', 'NAISHI  ', 'NAISHI  '),
('50211', 'NAITIRI  ', 'NAITIRI  '),
('20117', 'NAIVASHA  ', 'NAIVASHA  '),
('20100', 'NAKURU  ', 'NAKURU  '),
('00207', 'NAMANGA  ', 'NAMANGA  '),
('50127', 'NAMBACHA  ', 'NAMBACHA  '),
('50409', 'NAMBALE  ', 'NAMBALE  '),
('30301', 'NANDI HILLS  ', 'NANDI HILLS  '),
('50239', 'NANGILI  ', 'NANGILI  '),
('40615', 'NANGO  ', 'NANGO  '),
('10400', 'NANYUKI  ', 'NANYUKI  '),
('10105', 'NAROMORU  ', 'NAROMORU  '),
('20500', 'NAROK  ', 'NAROK  '),
('90118', 'NDALANI  ', 'NDALANI  '),
('30123', 'NDALAT  ', 'NDALAT  '),
('50212', 'NDALU  ', 'NDALU  '),
('20404', 'NDANAI  ', 'NDANAI  '),
('20306', 'NDARAGWA  ', 'NDARAGWA  '),
('00230', 'NDENDERU  ', 'NDENDERU  '),
('40629', 'NDERE  ', 'NDERE  '),
('00229', 'NDERU  ', 'NDERU  '),
('40302', 'NDHIWA  ', 'NDHIWA  '),
('40630', 'NDIGWA  ', 'NDIGWA  '),
('01016', 'NDITHINI  ', 'NDITHINI  '),
('90202', 'NDOOA  ', 'NDOOA  '),
('40602', 'NDORI  ', 'NDORI  '),
('20317', 'NDUNYUNJERU  ', 'NDUNYUNJERU  '),
('80311', 'NGAMBWA  ', 'NGAMBWA  '),
('60115', 'NGANDURI  ', 'NGANDURI  '),
('00600', 'NGARA ROAD  ', 'NGARA ROAD  '),
('00218', 'NGECHA  ', 'NGECHA  '),
('00901', 'NGEWA  ', 'NGEWA  '),
('30404', 'NGINYANG  ', 'NGINYANG  '),
('40603', 'NGIYA  ', 'NGIYA  '),
('00208', 'NGONG HILLS  ', 'NGONG HILLS  '),
('00505', 'NGONG ROAD  ', 'NAIROBI'),
('20126', 'NGORIKA  ', 'NGORIKA  '),
('90407', 'NGUNI  ', 'NGUNI  '),
('10224', 'NGUYOINI  ', 'NGUYOINI  '),
('90129', 'NGWATA  ', 'NGWATA  '),
('40702', 'NJIPISHIP  ', 'NJIPISHIP  '),
('20107', 'NJORO  ', 'NJORO  '),
('60214', 'NKONDI  ', 'NKONDI  '),
('60202', 'NKUBU  ', 'NKUBU  '),
('20318', 'NORTH KINANGOP  ', 'NORTH KINANGOP  '),
('90149', 'NTHONGOINI  ', 'NTHONGOINI  '),
('40417', 'NTIMARU  ', 'NTIMARU  '),
('90130', 'NUNGUNI  ', 'NUNGUNI  '),
('90408', 'NUU  ', 'NUU  '),
('40124', 'NYABONDO  ', 'NYABONDO  '),
('40631', 'NYANDORERA  ', 'NYANDORERA  '),
('20300', 'NYAHURURU  ', 'NYAHURURU  '),
('80118', 'NYALI  ', 'MOMBASA  '),
('40203', 'NYAMACHE  ', 'NYAMACHE  '),
('40206', 'NYAMARAMBE  ', 'NYAMARAMBE  '),
('40205', 'NYAMBUNWA  ', 'NYAMBUNWA  '),
('40500', 'NYAMIRA  ', 'NYAMIRA  '),
('40632', 'NYAMONYE  ', 'NYAMONYE  '),
('40333', 'NYADHIWA  ', 'NYADHIWA  '),
('40126', 'NYANGANDE  ', 'NYANGANDE  '),
('40127', 'NYANGORI  ', 'NYANGORI  '),
('40218', 'NYANGUSU  ', 'NYANGUSU  '),
('40311', 'NYANGWESO  ', 'NYANGWESO  '),
('40502', 'NYANSIONGO  ', 'NYANSIONGO  '),
('40514', 'NYARAMBA  ', 'NYARAMBA  '),
('30131', 'NYARU  ', 'NYARU  '),
('40402', 'NYATIKE  ', 'NYATIKE  '),
('40633', 'NYAWARA  ', 'NYAWARA  '),
('00506', 'NYAYO STADIUM  ', 'NAIROBI'),
('10100', 'NYERI  ', 'NYERI  '),
('40611', 'NYILIMA  ', 'NYILIMA  '),
('90136', 'NZEEKA  ', 'NZEEKA  '),
('90143', 'NZIU  ', 'NZIU  '),
('50237', 'NZOIA  ', 'NZOIA  '),
('50427', 'OBEKAI  ', 'OBEKAI  '),
('40129', 'OBOCH  ', 'OBOCH  '),
('40204', 'OGEMBO  ', 'OGEMBO  '),
('40130', 'OGEN  ', 'OGEN  '),
('40323', 'OGONGO  ', 'OGONGO  '),
('90301', 'OKIA  ', 'OKIA  '),
('20302', 'OLJOROOROK  ', 'OLJOROOROK  '),
('20303', 'OLKALOU  ', 'OLKALOU  '),
('20421', 'OLBUTYO  ', 'OLBUTYO  '),
('20152', 'OLENGURUONE  ', 'OLENGURUONE  '),
('20502', 'OLKURTO  ', 'OLKURTO  '),
('20503', 'OLOLOLUNGA  ', 'OLOLOLUNGA  '),
('20424', 'OLOOMIRANI  ', 'OLOOMIRANI  '),
('00213', 'OLTEPESI  ', 'OLTEPESI  '),
('40306', 'OMBOGA  ', 'OMBOGA  '),
('40221', 'OMOGONCHORO  ', 'OMOGONCHORO  '),
('00511', 'ONGATARONGAI  ', 'ONGATARONGAI  '),
('40227', 'ORIANG  ', 'ORIANG  '),
('30602', 'ORTUM  ', 'ORTUM  '),
('40324', 'OTARO  ', 'OTARO  '),
('10106', 'OTHAYA  ', 'OTHAYA  '),
('40411', 'OTHOCH RAKUOM  ', 'OTHOCH RAKUOM  '),
('40224', 'OTHORO  ', 'OTHORO  '),
('40108', 'OTONGLO  ', 'OTONGLO  '),
('40334', 'OYANI-MASII  ', 'OYANI-MASII  '),
('40222', 'OYUGIS  ', 'OYUGIS  '),
('40329', 'PALA  ', 'PALA  '),
('40111', 'PAP ONDITI  ', 'PAP ONDITI  '),
('00623', 'PARKLANDS  ', 'PARKLANDS  '),
('20311', 'PASSENGA  ', 'PASSENGA  '),
('40131', 'PAW AKUCHE  ', 'PAW AKUCHE  '),
('40113', 'PEMBETATU  ', 'PEMBETATU  '),
('30116', 'PLATEAU  ', 'PLATEAU  '),
('50410', 'PORT VICTORIA  ', 'PORT VICTORIA  '),
('00624', 'QUARRY ROAD  ', 'QUARRY ROAD  '),
('40132', 'RABUOR  ', 'RABUOR  '),
('00617', 'RACECOURSE ROAD  ', 'NAIROBI'),
('40604', 'RAGENGNI  ', 'RAGENGNI  '),
('40325', 'RAKWARO  ', 'RAKWARO  '),
('40330', 'RAMBA  ', 'RAMBA  '),
('40142', 'RAMULA  ', 'RAMULA  '),
('40412', 'RANEN  ', 'RANEN  '),
('40634', 'RANGALA  ', 'RANGALA  '),
('40303', 'RANGWE  ', 'RANGWE  '),
('40403', 'RAPOGI  ', 'RAPOGI  '),
('40137', 'RATTA  ', 'RATTA  '),
('40133', 'RERU  ', 'RERU  '),
('70302', 'RHAMU  ', 'RHAMU  '),
('40511', 'RIGOMA  ', 'RIGOMA  '),
('40226', 'RINGA  ', 'RINGA  '),
('40512', 'RIOCHANDA  ', 'RIOCHANDA  '),
('40220', 'RIOSIRI  ', 'RIOSIRI  '),
('00512', 'RIRUTA  ', 'RIRUTA  '),
('40326', 'RODIKOPANY  ', 'RODIKOPANY  '),
('00300', 'RONALD NGALA STREET  ', 'NAIROBI'),
('20127', 'RONDA  ', 'RONDA  '),
('20108', 'RONGAI  ', 'RONGAI  '),
('40404', 'RONGO  ', 'RONGO  '),
('20204', 'RORET  ', 'RORET  '),
('00618', 'RUARAKA  ', 'RUARAKA  '),
('00232', 'RUIRU  ', 'RUIRU  '),
('20321', 'RUMURUTI  ', 'RUMURUTI  '),
('60103', 'RUNYENJES  ', 'RUNYENJES  '),
('20313', 'RURI  ', 'RURI  '),
('10133', 'RURINGU  ', 'RURINGU  '),
('40327', 'RUSINGA  ', 'RUSINGA  '),
('10134', 'RUTHANGATI  ', 'RUTHANGATI  '),
('20143', 'SABATIA', 'SABATIA'),
('30211', 'SABOTI', 'SABOTI'),
('80308', 'SAGALLA', 'SAGALLA'),
('10230', 'SAGANA', 'SAGANA'),
('80120', 'SAMBURU', 'SAMBURU'),
('50128', 'SAMITSI', 'SAMITSI'),
('40405', 'SARE', 'SARE'),
('00606', 'SARIT CENTRE', 'NAIROBI'),
('00513', 'SASUMUA ROAD', 'SASUMUA ROAD'),
('40612', 'SAWAGONGO', 'SAWAGONGO'),
('40614', 'SEGA', 'SEGA'),
('50308', 'SEREM', 'SEREM'),
('30407', 'SERETUNIN', 'SERETUNIN'),
('20150', 'SHABAAB', 'SHABAAB'),
('50106', 'SHIANDA', 'SHIANDA'),
('50129', 'SHIATSALA', 'SHIATSALA'),
('50130', 'SHIBULI', 'SHIBULI'),
('50131', 'SHIMANYIRO', 'SHIMANYIRO'),
('80407', 'SHIMBA HILLS  ', 'SHIMBA HILLS  '),
('50107', 'SHINYALU', 'SHINYALU'),
('60104', 'SIAKAGO', 'SIAKAGO'),
('40600', 'SIAYA', 'SIAYA'),
('40605', 'SIDINDI', 'SIDINDI'),
('40643', 'SIFUYO  ', 'SIFUYO  '),
('40635', 'SIGOMRE', 'SIGOMRE'),
('20405', 'SIGOR', 'SIGOR'),
('40135', 'SIGOTI', 'SIGOTI'),
('20212', 'SIGOWET', 'SIGOWET'),
('30217', 'SIKINWA', 'SIKINWA'),
('20422', 'SILIBWET', 'SILIBWET'),
('30127', 'SIMAT', 'SIMAT'),
('40308', 'SINDO', 'SINDO'),
('30703', 'SINGORE', 'SINGORE'),
('50401', 'SIO PORT', 'SIO PORT'),
('20326', 'SIPILI', 'SIPILI'),
('40636', 'SIREMBE', 'SIREMBE'),
('30213', 'SIRENDE', 'SIRENDE'),
('50208', 'SIRISIA', 'SIRISIA'),
('40642', 'SIRONGO', 'SIRONGO'),
('20128', 'SOLAI', 'SOLAI'),
('60701', 'SOLOLO', 'SOLOLO'),
('40109', 'SONDU', 'SONDU'),
('40110', 'SONGHOR', 'SONGHOR'),
('20223', 'SORGET', 'SORGET'),
('20205', 'SOSIOT', 'SOSIOT'),
('20406', 'SOTIK', 'SOTIK'),
('20604', 'SOUTH HORR', 'SOUTH HORR'),
('20155', 'SOUTH KINANGOP', 'SOUTH KINANGOP'),
('20319', 'SOUTH KINANGOP', 'SOUTH KINANGOP'),
('30105', 'SOY', 'SOY'),
('40418', 'SUBAKURIA', 'SUBAKURIA'),
('20109', 'SUBUKIA', 'SUBUKIA'),
('20602', 'SUGUTA MAR MAR', 'SUGUTA MAR MAR'),
('20151', 'SULMAC', 'SULMAC'),
('90132', 'SULTAN HAMUD', 'SULTAN HAMUD'),
('40400', 'SUNA', 'SUNA'),
('30212', 'SUWERWA', 'SUWERWA'),
('30220', 'TABANI  ', 'TABANI  '),
('50238', 'TABANI  ', 'TABANI  '),
('90131', 'TALA  ', 'TALA  '),
('30704', 'TAMBACH  ', 'TAMBACH  '),
('80203', 'TARASAA  ', 'TARASAA  '),
('80309', 'TAUSA  ', 'TAUSA  '),
('80302', 'TAVETA  ', 'TAVETA  '),
('90133', 'TAWA  ', 'TAWA  '),
('30405', 'TENGES  ', 'TENGES  '),
('10110', 'THAARA  ', 'THAARA  '),
('10135', 'THANGATHI  ', 'THANGATHI  '),
('01026', 'THARE  ', 'THARE  '),
('00210', 'THIGIO  ', 'THIGIO  '),
('01000', 'THIKA  ', 'THIKA  '),
('60210', 'TIGIJI  ', 'TIGIJI  '),
('10406', 'TIMAU  ', 'TIMAU  '),
('20110', 'TIMBER MILL ROAD  ', 'TIMBER MILL ROAD  '),
('30108', 'TIMBOROA  ', 'TIMBOROA  '),
('50309', 'TIRIKI  ', 'TIRIKI  '),
('00400', 'TOM MBOYA  ', 'NAIROBI'),
('40513', 'TOMBE  ', 'TOMBE  '),
('30218', 'TONGAREN  ', 'TONGAREN  '),
('20153', 'TORONGO  ', 'TORONGO  '),
('30707', 'TOT  ', 'TOT  '),
('90409', 'TSEIKURU  ', 'TSEIKURU  '),
('90203', 'TULIA  ', 'TULIA  '),
('10136', 'TUMUTUMU  ', 'TUMUTUMU  '),
('60213', 'TUNYAI  ', 'TUNYAI  '),
('30106', 'TURBO  ', 'TURBO  '),
('20129', 'TURI  ', 'TURI  '),
('10137', 'UASONYIRO  ', 'UASONYIRO  '),
('40606', 'UGUNJA  ', 'UGUNJA  '),
('00517', 'UHURU GARDENS  ', 'NAIROBI'),
('80400', 'UKUNDA  ', 'UKUNDA  '),
('40607', 'UKWALA  ', 'UKWALA  '),
('00222', 'UPLANDS  ', 'UPLANDS  '),
('40608', 'URANGA  ', 'URANGA  '),
('40228', 'URIRI  ', 'URIRI  '),
('40609', 'USENGE  ', 'USENGE  '),
('40637', 'USIGU  ', 'USIGU  '),
('00605', 'UTHIRU  ', 'UTHIRU  '),
('00514', 'VALLEY ARCADE  ', 'NAIROBI'),
('50310', 'VIHIGA  ', 'VIHIGA  '),
('00621', 'VILLAGE MARKET  ', 'NAIROBI'),
('80119', 'VIPINGO  ', 'VIPINGO  '),
('80211', 'VITENGENI  ', 'VITENGENI  '),
('00507', 'VIWANDANI  ', 'VIWANDANI  '),
('80300', 'VOI  ', 'VOI  '),
('90212', 'VOO  ', 'VOO  '),
('40638', 'WAGUSU  ', 'WAGUSU  '),
('00613', 'WAITHAKA  ', 'WAITHAKA  '),
('70200', 'WAJIR  ', 'WAJIR  '),
('10138', 'WAMAGANA  ', 'WAMAGANA  '),
('20603', 'WAMBA  ', 'WAMBA  '),
('90103', 'WAMUNYU  ', 'WAMUNYU  '),
('01010', 'WAMWANGI  ', 'WAMWANGI  '),
('00614', 'WANGIGE  ', 'WANGIGE  '),
('10303', 'WANGURU  ', 'WANGURU  '),
('10225', 'WANJENGI  ', 'WANJENGI  '),
('20305', 'WANJOHI  ', 'WANJOHI  '),
('80204', 'WATALII ROAD  ', 'WATALII ROAD  '),
('80202', 'WATAMU  ', 'WATAMU  '),
('50205', 'WEBUYE  ', 'WEBUYE  '),
('30603', 'WEIWEI  ', 'WEIWEI  '),
('80303', 'WERUGHA  ', 'WERUGHA  '),
('00800', 'WESTLANDS  ', 'NAIROBI'),
('40141', 'WINAM  ', 'WINAM  '),
('80504', 'WITU  ', 'WITU  '),
('20329', 'WIYUMIRIRIE  ', 'WIYUMIRIRIE  '),
('50311', 'WODANGA  ', 'WODANGA  '),
('80304', 'WUNDANYI  ', 'WUNDANYI  '),
('40610', 'YALA  ', 'YALA  '),
('00508', 'YAYA TOWERS  ', 'NAIROBI'),
('90134', 'YOANI  ', 'YOANI  '),
('30214', 'ZIWA  ', 'ZIWA  '),
('90213', 'ZOMBE  ', 'ZOMBE  ');

-- --------------------------------------------------------

--
-- Table structure for table `useraccess`
--

CREATE TABLE `useraccess` (
  `Username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `RoleID` bigint(20) NOT NULL,
  `Edit` tinyint(1) NOT NULL,
  `Remove` tinyint(1) NOT NULL,
  `AddNew` tinyint(1) NOT NULL,
  `View` tinyint(1) NOT NULL,
  `Export` tinyint(1) NOT NULL,
  `UpdateBy` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreateBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `useraccess`
--

INSERT INTO `useraccess` (`Username`, `RoleID`, `Edit`, `Remove`, `AddNew`, `View`, `Export`, `UpdateBy`, `CreateBy`, `CreatedAt`, `UpdatedAt`) VALUES
('A123456789U', 26, 0, 0, 0, 1, 0, NULL, 'A123456789U', '2019-11-12 13:41:58', NULL),
('A123456789U', 32, 1, 1, 0, 1, 1, NULL, 'A123456789U', '2019-11-12 13:41:58', NULL),
('A123456789U', 33, 0, 0, 0, 0, 0, NULL, 'A123456789U', '2019-11-12 13:41:58', NULL),
('A123456789U', 36, 1, 1, 0, 1, 1, NULL, 'A123456789U', '2019-11-12 13:41:58', NULL),
('A123456789U', 38, 0, 0, 0, 1, 0, NULL, 'A123456789U', '2019-11-12 13:41:58', NULL),
('A123456789U', 40, 0, 0, 0, 1, 0, NULL, 'A123456789U', '2019-11-12 13:41:58', NULL),
('A123456789U', 41, 0, 0, 0, 1, 0, NULL, 'A123456789U', '2019-11-12 13:41:58', NULL),
('A123456789U', 42, 0, 0, 0, 1, 0, NULL, 'A123456789U', '2019-11-12 13:41:58', NULL),
('A123456789U', 43, 0, 0, 0, 1, 0, NULL, 'A123456789U', '2019-11-12 13:41:58', NULL),
('A123456789U', 44, 1, 1, 1, 1, 1, NULL, 'A123456789U', '2019-11-12 13:41:58', NULL),
('A123456789U', 45, 1, 1, 1, 1, 1, NULL, 'A123456789U', '2019-11-12 13:41:58', NULL),
('A123456789U', 47, 1, 0, 1, 1, 1, NULL, 'A123456789U', '2019-11-12 13:41:58', NULL),
('A123456789U', 50, 0, 0, 0, 1, 0, NULL, 'A123456789U', '2019-11-12 13:41:58', NULL),
('A123456789U', 51, 0, 0, 0, 1, 0, NULL, 'A123456789U', '2019-11-12 13:41:58', NULL),
('A123456789U', 55, 0, 0, 0, 1, 0, NULL, 'A123456789U', '2019-11-12 13:41:58', NULL),
('A123456789U', 56, 1, 0, 1, 1, 1, NULL, 'A123456789U', '2019-11-12 13:41:58', NULL),
('A123456789U', 57, 1, 1, 1, 1, 1, NULL, 'A123456789U', '2019-11-12 13:41:58', NULL),
('A123456789U', 58, 1, 1, 1, 1, 1, NULL, 'A123456789U', '2019-11-12 13:41:58', NULL),
('A123456789U', 62, 1, 1, 1, 1, 1, NULL, 'A123456789U', '2019-11-12 13:41:58', NULL),
('A123456789X', 26, 0, 0, 0, 1, 0, NULL, 'A123456789X', '2019-11-11 16:26:50', NULL),
('A123456789X', 32, 1, 1, 0, 1, 1, NULL, 'A123456789X', '2019-11-11 16:26:50', NULL),
('A123456789X', 33, 0, 0, 0, 0, 0, NULL, 'A123456789X', '2019-11-11 16:26:50', NULL),
('A123456789X', 36, 1, 1, 0, 1, 1, NULL, 'A123456789X', '2019-11-11 16:26:50', NULL),
('A123456789X', 38, 0, 0, 0, 1, 0, NULL, 'A123456789X', '2019-11-11 16:26:50', NULL),
('A123456789X', 40, 0, 0, 0, 1, 0, NULL, 'A123456789X', '2019-11-11 16:26:50', NULL),
('A123456789X', 41, 0, 0, 0, 1, 0, NULL, 'A123456789X', '2019-11-11 16:26:50', NULL),
('A123456789X', 42, 0, 0, 0, 1, 0, NULL, 'A123456789X', '2019-11-11 16:26:50', NULL),
('A123456789X', 43, 0, 0, 0, 1, 0, NULL, 'A123456789X', '2019-11-11 16:26:50', NULL),
('A123456789X', 44, 1, 1, 1, 1, 1, NULL, 'A123456789X', '2019-11-11 16:26:50', NULL),
('A123456789X', 45, 1, 1, 1, 1, 1, NULL, 'A123456789X', '2019-11-11 16:26:50', NULL),
('A123456789X', 47, 1, 0, 1, 1, 1, NULL, 'A123456789X', '2019-11-11 16:26:50', NULL),
('A123456789X', 50, 0, 0, 0, 1, 0, NULL, 'A123456789X', '2019-11-11 16:26:50', NULL),
('A123456789X', 51, 0, 0, 0, 1, 0, NULL, 'A123456789X', '2019-11-11 16:26:50', NULL),
('A123456789X', 55, 0, 0, 0, 1, 0, NULL, 'A123456789X', '2019-11-11 16:26:50', NULL),
('A123456789X', 56, 1, 0, 1, 1, 1, NULL, 'A123456789X', '2019-11-11 16:26:50', NULL),
('A123456789X', 57, 1, 1, 1, 1, 1, NULL, 'A123456789X', '2019-11-11 16:26:50', NULL),
('A123456789X', 58, 1, 1, 1, 1, 1, NULL, 'A123456789X', '2019-11-11 16:26:50', NULL),
('A123456789X', 62, 1, 1, 1, 1, 1, NULL, 'A123456789X', '2019-11-11 16:26:50', NULL),
('Admin', 17, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:18:25', '2019-08-09 16:01:32'),
('Admin', 18, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:18:24', '2019-08-09 15:38:47'),
('Admin', 19, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:18:23', '2019-08-09 18:09:49'),
('Admin', 20, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:18:24', '2019-07-29 11:28:25'),
('Admin', 21, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-19 11:22:29', '2019-08-09 16:38:25'),
('Admin', 22, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:18:17', '2019-08-02 13:09:00'),
('Admin', 23, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:18:19', '2019-07-31 10:58:56'),
('Admin', 24, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:05:31', '2019-07-29 11:28:22'),
('Admin', 25, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:18:20', '2019-07-29 11:28:22'),
('Admin', 26, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:04:53', '2019-07-29 11:28:21'),
('Admin', 27, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:18:21', '2019-07-29 11:28:21'),
('Admin', 28, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:18:22', '2019-07-29 11:28:20'),
('Admin', 29, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-29 09:48:29', '2019-07-29 11:28:19'),
('Admin', 30, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-29 09:48:29', '2019-07-29 11:28:18'),
('Admin', 31, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-29 14:08:14', '2019-07-29 14:08:19'),
('Admin', 32, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-31 16:59:50', '2019-08-09 18:09:44'),
('Admin', 33, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-01 10:22:26', '2019-08-09 17:45:49'),
('Admin', 34, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-01 10:25:44', '2019-08-09 18:09:43'),
('Admin', 35, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-01 10:49:28', '2019-08-09 18:09:44'),
('Admin', 36, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-01 11:41:52', '2019-08-09 18:09:43'),
('Admin', 37, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-01 13:33:23', '2019-08-09 18:09:38'),
('Admin', 38, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-05 14:07:10', '2019-08-09 18:09:39'),
('Admin', 39, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-05 14:44:54', '2019-08-09 17:49:19'),
('Admin', 40, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-06 14:20:47', '2019-08-09 18:09:46'),
('Admin', 41, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-06 14:34:44', '2019-08-09 17:01:47'),
('Admin', 42, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-09 11:42:49', '2019-08-09 18:09:40'),
('Admin', 43, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-11 10:47:35', '2019-08-11 10:47:40'),
('Admin', 44, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-14 10:24:07', '2019-08-14 10:24:11'),
('Admin', 45, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-14 15:57:52', '2019-08-14 15:57:55'),
('Admin', 46, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-21 18:01:37', '2019-08-21 18:01:41'),
('Admin', 47, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-23 12:02:06', '2019-08-23 12:02:09'),
('Admin', 48, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-23 12:02:10', '2019-08-23 12:02:16'),
('Admin', 49, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-09 09:48:24', '2019-09-09 09:48:35'),
('Admin', 50, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-11 10:47:01', '2019-09-11 14:47:21'),
('Admin', 51, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-11 11:13:28', '2019-09-11 11:13:36'),
('Admin', 52, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-12 09:48:01', '2019-09-12 09:48:09'),
('Admin', 53, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-13 10:05:26', '2019-09-13 10:05:33'),
('Admin', 54, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-17 09:41:59', '2019-09-17 09:42:09'),
('Admin', 55, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-18 10:04:33', '2019-09-18 10:04:41'),
('Admin', 56, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-23 14:29:07', '2019-09-23 14:29:16'),
('Admin', 57, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-24 15:03:48', '2019-09-24 15:03:56'),
('Admin', 58, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-27 12:21:38', '2019-09-27 12:21:47'),
('Admin', 59, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-10-01 11:03:50', '2019-10-01 13:43:56'),
('Admin', 60, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-10-09 10:57:28', '2019-10-09 10:57:35'),
('Admin', 61, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-10-15 17:09:35', '2019-10-15 17:09:42'),
('Admin', 62, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-10-29 10:06:01', '2019-10-29 10:06:04'),
('Admin', 63, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-07 15:56:34', '2019-11-07 15:56:44'),
('Admin', 64, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-07 15:56:36', '2019-11-07 15:56:45'),
('CASEOFFICER01', 24, 1, 1, 1, 1, 1, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 25, 1, 1, 1, 1, 1, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 26, 1, 1, 1, 1, 1, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 27, 1, 1, 1, 1, 1, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 33, 0, 1, 1, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 35, 1, 1, 1, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 36, 1, 1, 1, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 37, 1, 1, 1, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 38, 1, 1, 1, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 39, 1, 1, 1, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 40, 1, 1, 1, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 42, 1, 1, 1, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 43, 0, 0, 0, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 44, 0, 1, 0, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 45, 0, 1, 0, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 46, 1, 1, 0, 0, 1, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 47, 1, 1, 1, 1, 1, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 48, 1, 1, 1, 1, 1, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 49, 0, 1, 1, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 50, 1, 1, 1, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 51, 1, 1, 1, 1, 1, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 52, 1, 1, 1, 1, 1, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 53, 1, 1, 1, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 54, 1, 1, 1, 1, 1, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 55, 0, 1, 1, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 56, 0, 1, 0, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 57, 1, 1, 1, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 58, 1, 1, 1, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 59, 1, 1, 1, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 60, 1, 1, 1, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 61, 1, 1, 1, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 62, 0, 1, 1, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 63, 1, 1, 1, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('CASEOFFICER01', 64, 1, 1, 1, 1, 0, 'PPRA01', 'PPRA01', '2019-11-11 15:34:20', '2019-11-11 15:34:20'),
('kelvin', 17, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 18, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 19, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 20, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 21, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 22, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 23, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 24, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 25, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 26, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 27, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 28, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 29, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 30, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 31, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 32, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 33, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 34, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 35, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 36, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 37, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 38, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 39, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 40, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 41, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 42, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 43, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 44, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 45, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 46, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 47, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 48, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 49, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 50, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 51, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 52, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 53, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 54, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 55, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 56, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 57, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 58, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 59, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 60, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 61, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 62, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 63, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('kelvin', 64, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-18 14:27:04', '2019-11-18 14:27:04'),
('P0123456788X', 26, 0, 0, 0, 1, 0, NULL, 'P0123456788X', '2019-11-11 15:41:19', NULL),
('P0123456788X', 32, 1, 1, 0, 1, 1, NULL, 'P0123456788X', '2019-11-11 15:41:19', NULL),
('P0123456788X', 33, 0, 0, 0, 0, 0, NULL, 'P0123456788X', '2019-11-11 15:41:19', NULL),
('P0123456788X', 36, 1, 1, 0, 1, 1, NULL, 'P0123456788X', '2019-11-11 15:41:19', NULL),
('P0123456788X', 38, 0, 0, 0, 1, 0, NULL, 'P0123456788X', '2019-11-11 15:41:19', NULL),
('P0123456788X', 40, 0, 0, 0, 1, 0, NULL, 'P0123456788X', '2019-11-11 15:41:19', NULL),
('P0123456788X', 41, 0, 0, 0, 1, 0, NULL, 'P0123456788X', '2019-11-11 15:41:19', NULL),
('P0123456788X', 42, 0, 0, 0, 1, 0, NULL, 'P0123456788X', '2019-11-11 15:41:19', NULL),
('P0123456788X', 43, 0, 0, 0, 1, 0, NULL, 'P0123456788X', '2019-11-11 15:41:19', NULL),
('P0123456788X', 44, 1, 1, 1, 1, 1, NULL, 'P0123456788X', '2019-11-11 15:41:19', NULL),
('P0123456788X', 45, 1, 1, 1, 1, 1, NULL, 'P0123456788X', '2019-11-11 15:41:19', NULL),
('P0123456788X', 47, 1, 0, 1, 1, 1, NULL, 'P0123456788X', '2019-11-11 15:41:19', NULL),
('P0123456788X', 50, 0, 0, 0, 1, 0, NULL, 'P0123456788X', '2019-11-11 15:41:19', NULL),
('P0123456788X', 51, 0, 0, 0, 1, 0, NULL, 'P0123456788X', '2019-11-11 15:41:19', NULL),
('P0123456788X', 55, 0, 0, 0, 1, 0, NULL, 'P0123456788X', '2019-11-11 15:41:19', NULL),
('P0123456788X', 56, 1, 0, 1, 1, 1, NULL, 'P0123456788X', '2019-11-11 15:41:19', NULL),
('P0123456788X', 57, 1, 1, 1, 1, 1, NULL, 'P0123456788X', '2019-11-11 15:41:19', NULL),
('P0123456788X', 58, 1, 1, 1, 1, 1, NULL, 'P0123456788X', '2019-11-11 15:41:19', NULL),
('P0123456788X', 62, 1, 1, 1, 1, 1, NULL, 'P0123456788X', '2019-11-11 15:41:19', NULL),
('P09875345W', 26, 0, 0, 0, 1, 0, NULL, 'P09875345W', '2019-11-13 14:56:01', NULL),
('P09875345W', 32, 1, 1, 0, 1, 1, NULL, 'P09875345W', '2019-11-13 14:56:01', NULL),
('P09875345W', 33, 0, 0, 0, 0, 0, NULL, 'P09875345W', '2019-11-13 14:56:01', NULL),
('P09875345W', 36, 1, 1, 0, 1, 1, NULL, 'P09875345W', '2019-11-13 14:56:01', NULL),
('P09875345W', 38, 0, 0, 0, 1, 0, NULL, 'P09875345W', '2019-11-13 14:56:01', NULL),
('P09875345W', 40, 0, 0, 0, 1, 0, NULL, 'P09875345W', '2019-11-13 14:56:01', NULL),
('P09875345W', 41, 0, 0, 0, 1, 0, NULL, 'P09875345W', '2019-11-13 14:56:01', NULL),
('P09875345W', 42, 0, 0, 0, 1, 0, NULL, 'P09875345W', '2019-11-13 14:56:01', NULL),
('P09875345W', 43, 0, 0, 0, 1, 0, NULL, 'P09875345W', '2019-11-13 14:56:01', NULL),
('P09875345W', 44, 1, 1, 1, 1, 1, NULL, 'P09875345W', '2019-11-13 14:56:01', NULL),
('P09875345W', 45, 1, 1, 1, 1, 1, NULL, 'P09875345W', '2019-11-13 14:56:01', NULL),
('P09875345W', 47, 1, 0, 1, 1, 1, NULL, 'P09875345W', '2019-11-13 14:56:01', NULL),
('P09875345W', 50, 0, 0, 0, 1, 0, NULL, 'P09875345W', '2019-11-13 14:56:01', NULL),
('P09875345W', 51, 0, 0, 0, 1, 0, NULL, 'P09875345W', '2019-11-13 14:56:01', NULL),
('P09875345W', 55, 0, 0, 0, 1, 0, NULL, 'P09875345W', '2019-11-13 14:56:01', NULL),
('P09875345W', 56, 1, 0, 1, 1, 1, NULL, 'P09875345W', '2019-11-13 14:56:01', NULL),
('P09875345W', 57, 1, 1, 1, 1, 1, NULL, 'P09875345W', '2019-11-13 14:56:01', NULL),
('P09875345W', 58, 1, 1, 1, 1, 1, NULL, 'P09875345W', '2019-11-13 14:56:01', NULL),
('P09875345W', 62, 1, 1, 1, 1, 1, NULL, 'P09875345W', '2019-11-13 14:56:01', NULL),
('P121212121L', 26, 0, 0, 0, 1, 0, NULL, 'P121212121L', '2019-11-15 12:12:49', NULL),
('P121212121L', 32, 1, 1, 0, 1, 1, NULL, 'P121212121L', '2019-11-15 12:12:49', NULL),
('P121212121L', 33, 0, 0, 0, 0, 0, NULL, 'P121212121L', '2019-11-15 12:12:49', NULL),
('P121212121L', 36, 1, 1, 0, 1, 1, NULL, 'P121212121L', '2019-11-15 12:12:49', NULL),
('P121212121L', 38, 0, 0, 0, 1, 0, NULL, 'P121212121L', '2019-11-15 12:12:49', NULL),
('P121212121L', 40, 0, 0, 0, 1, 0, NULL, 'P121212121L', '2019-11-15 12:12:49', NULL),
('P121212121L', 41, 0, 0, 0, 1, 0, NULL, 'P121212121L', '2019-11-15 12:12:49', NULL),
('P121212121L', 42, 0, 0, 0, 1, 0, NULL, 'P121212121L', '2019-11-15 12:12:49', NULL),
('P121212121L', 43, 0, 0, 0, 1, 0, NULL, 'P121212121L', '2019-11-15 12:12:49', NULL),
('P121212121L', 44, 1, 1, 1, 1, 1, NULL, 'P121212121L', '2019-11-15 12:12:49', NULL),
('P121212121L', 45, 1, 1, 1, 1, 1, NULL, 'P121212121L', '2019-11-15 12:12:49', NULL),
('P121212121L', 47, 1, 0, 1, 1, 1, NULL, 'P121212121L', '2019-11-15 12:12:49', NULL),
('P121212121L', 50, 0, 0, 0, 1, 0, NULL, 'P121212121L', '2019-11-15 12:12:49', NULL),
('P121212121L', 51, 0, 0, 0, 1, 0, NULL, 'P121212121L', '2019-11-15 12:12:49', NULL),
('P121212121L', 55, 0, 0, 0, 1, 0, NULL, 'P121212121L', '2019-11-15 12:12:49', NULL),
('P121212121L', 56, 1, 0, 1, 1, 1, NULL, 'P121212121L', '2019-11-15 12:12:49', NULL),
('P121212121L', 57, 1, 1, 1, 1, 1, NULL, 'P121212121L', '2019-11-15 12:12:49', NULL),
('P121212121L', 58, 1, 1, 1, 1, 1, NULL, 'P121212121L', '2019-11-15 12:12:49', NULL),
('P121212121L', 62, 1, 1, 1, 1, 1, NULL, 'P121212121L', '2019-11-15 12:12:49', NULL),
('P123456879Q', 26, 0, 0, 0, 1, 0, NULL, 'P123456879Q', '2019-11-15 10:39:06', NULL),
('P123456879Q', 32, 1, 1, 0, 1, 1, NULL, 'P123456879Q', '2019-11-15 10:39:06', NULL),
('P123456879Q', 33, 0, 0, 0, 0, 0, NULL, 'P123456879Q', '2019-11-15 10:39:06', NULL),
('P123456879Q', 36, 1, 1, 0, 1, 1, NULL, 'P123456879Q', '2019-11-15 10:39:06', NULL),
('P123456879Q', 38, 0, 0, 0, 1, 0, NULL, 'P123456879Q', '2019-11-15 10:39:06', NULL),
('P123456879Q', 40, 0, 0, 0, 1, 0, NULL, 'P123456879Q', '2019-11-15 10:39:06', NULL),
('P123456879Q', 41, 0, 0, 0, 1, 0, NULL, 'P123456879Q', '2019-11-15 10:39:06', NULL),
('P123456879Q', 42, 0, 0, 0, 1, 0, NULL, 'P123456879Q', '2019-11-15 10:39:06', NULL),
('P123456879Q', 43, 0, 0, 0, 1, 0, NULL, 'P123456879Q', '2019-11-15 10:39:06', NULL),
('P123456879Q', 44, 1, 1, 1, 1, 1, NULL, 'P123456879Q', '2019-11-15 10:39:06', NULL),
('P123456879Q', 45, 1, 1, 1, 1, 1, NULL, 'P123456879Q', '2019-11-15 10:39:06', NULL),
('P123456879Q', 47, 1, 0, 1, 1, 1, NULL, 'P123456879Q', '2019-11-15 10:39:06', NULL),
('P123456879Q', 50, 0, 0, 0, 1, 0, NULL, 'P123456879Q', '2019-11-15 10:39:06', NULL),
('P123456879Q', 51, 0, 0, 0, 1, 0, NULL, 'P123456879Q', '2019-11-15 10:39:06', NULL),
('P123456879Q', 55, 0, 0, 0, 1, 0, NULL, 'P123456879Q', '2019-11-15 10:39:06', NULL),
('P123456879Q', 56, 1, 0, 1, 1, 1, NULL, 'P123456879Q', '2019-11-15 10:39:06', NULL),
('P123456879Q', 57, 1, 1, 1, 1, 1, NULL, 'P123456879Q', '2019-11-15 10:39:06', NULL),
('P123456879Q', 58, 1, 1, 1, 1, 1, NULL, 'P123456879Q', '2019-11-15 10:39:06', NULL),
('P123456879Q', 62, 1, 1, 1, 1, 1, NULL, 'P123456879Q', '2019-11-15 10:39:06', NULL),
('P65498745R', 26, 0, 0, 0, 1, 0, NULL, 'P65498745R', '2019-11-15 11:46:48', NULL),
('P65498745R', 32, 1, 1, 0, 1, 1, NULL, 'P65498745R', '2019-11-15 11:46:48', NULL),
('P65498745R', 33, 0, 0, 0, 0, 0, NULL, 'P65498745R', '2019-11-15 11:46:48', NULL),
('P65498745R', 36, 1, 1, 0, 1, 1, NULL, 'P65498745R', '2019-11-15 11:46:48', NULL),
('P65498745R', 38, 0, 0, 0, 1, 0, NULL, 'P65498745R', '2019-11-15 11:46:48', NULL),
('P65498745R', 40, 0, 0, 0, 1, 0, NULL, 'P65498745R', '2019-11-15 11:46:48', NULL),
('P65498745R', 41, 0, 0, 0, 1, 0, NULL, 'P65498745R', '2019-11-15 11:46:48', NULL),
('P65498745R', 42, 0, 0, 0, 1, 0, NULL, 'P65498745R', '2019-11-15 11:46:48', NULL),
('P65498745R', 43, 0, 0, 0, 1, 0, NULL, 'P65498745R', '2019-11-15 11:46:48', NULL),
('P65498745R', 44, 1, 1, 1, 1, 1, NULL, 'P65498745R', '2019-11-15 11:46:48', NULL),
('P65498745R', 45, 1, 1, 1, 1, 1, NULL, 'P65498745R', '2019-11-15 11:46:48', NULL),
('P65498745R', 47, 1, 0, 1, 1, 1, NULL, 'P65498745R', '2019-11-15 11:46:48', NULL),
('P65498745R', 50, 0, 0, 0, 1, 0, NULL, 'P65498745R', '2019-11-15 11:46:48', NULL),
('P65498745R', 51, 0, 0, 0, 1, 0, NULL, 'P65498745R', '2019-11-15 11:46:48', NULL),
('P65498745R', 55, 0, 0, 0, 1, 0, NULL, 'P65498745R', '2019-11-15 11:46:48', NULL),
('P65498745R', 56, 1, 0, 1, 1, 1, NULL, 'P65498745R', '2019-11-15 11:46:48', NULL),
('P65498745R', 57, 1, 1, 1, 1, 1, NULL, 'P65498745R', '2019-11-15 11:46:48', NULL),
('P65498745R', 58, 1, 1, 1, 1, 1, NULL, 'P65498745R', '2019-11-15 11:46:48', NULL),
('P65498745R', 62, 1, 1, 1, 1, 1, NULL, 'P65498745R', '2019-11-15 11:46:48', NULL),
('pkiprop', 24, 1, 1, 1, 1, 1, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 25, 1, 1, 1, 1, 1, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 26, 1, 1, 1, 1, 1, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 27, 1, 1, 1, 1, 1, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 28, 0, 0, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 33, 0, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 35, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 36, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 37, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 38, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 39, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 40, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 42, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 43, 0, 0, 0, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 44, 0, 1, 0, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 45, 0, 1, 0, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 46, 1, 1, 0, 0, 1, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 47, 1, 1, 1, 1, 1, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 48, 1, 1, 1, 1, 1, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 49, 0, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 50, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 51, 1, 1, 1, 1, 1, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 52, 1, 1, 1, 1, 1, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 53, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 54, 1, 1, 1, 1, 1, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 55, 0, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 56, 0, 1, 0, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 57, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 58, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 59, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 60, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 61, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 62, 0, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 63, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('pkiprop', 64, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 10:38:19', '2019-11-15 10:38:19'),
('Pokumu', 24, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 25, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 26, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 27, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 28, 0, 0, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 33, 0, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 35, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 36, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 37, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 38, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 39, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 40, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 42, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 43, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 44, 0, 1, 0, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 45, 0, 1, 0, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 46, 1, 1, 0, 0, 1, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 47, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 48, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 49, 0, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 50, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 51, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 52, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 53, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 54, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 55, 0, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 56, 0, 1, 0, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 57, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 58, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 59, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 60, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 61, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 62, 0, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 63, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('Pokumu', 64, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:28:49', '2019-11-15 10:28:49'),
('PPRA01', 17, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 18, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 19, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 20, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 21, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 22, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 23, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 24, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 25, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 26, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 27, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 28, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 29, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 30, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 31, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 32, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 33, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 34, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 35, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 36, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 37, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 38, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 39, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 40, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 41, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 42, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 43, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 44, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 45, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 46, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 47, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 48, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 49, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 50, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 51, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 52, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 53, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 54, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 55, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 56, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 57, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 58, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 59, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 60, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 61, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 62, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 63, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('PPRA01', 64, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-11 15:19:43', '2019-11-11 15:19:43'),
('smiheso', 24, 1, 1, 1, 1, 1, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 25, 1, 1, 1, 1, 1, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 26, 1, 1, 1, 1, 1, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 27, 1, 1, 1, 1, 1, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 28, 0, 0, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 33, 0, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 35, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 36, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 37, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 38, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 39, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 40, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 42, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 43, 0, 0, 0, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 44, 0, 1, 0, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 45, 0, 1, 0, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 46, 1, 1, 0, 0, 1, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 47, 1, 1, 1, 1, 1, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 48, 1, 1, 1, 1, 1, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 49, 0, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 50, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 51, 1, 1, 1, 1, 1, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 52, 1, 1, 1, 1, 1, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 53, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 54, 1, 1, 1, 1, 1, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 55, 0, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 56, 0, 1, 0, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 57, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 58, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 59, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 60, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 61, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 62, 0, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 63, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('smiheso', 64, 1, 1, 1, 1, 0, 'SOdhiambo', 'SOdhiambo', '2019-11-15 12:41:09', '2019-11-15 12:41:09'),
('SOdhiambo', 17, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 18, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 19, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 20, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 21, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 22, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 23, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 24, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 25, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 26, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 27, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 28, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 29, 0, 0, 0, 1, 0, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 30, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 31, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 32, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 33, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 34, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 35, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 36, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 37, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 38, 1, 1, 1, 1, 0, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 39, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 40, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 41, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 42, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 43, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 44, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 45, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 46, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 47, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 48, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 49, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 50, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 51, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 52, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 53, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 54, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 55, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 56, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 57, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 58, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 59, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 60, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 61, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 62, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 63, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58'),
('SOdhiambo', 64, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-15 10:24:58', '2019-11-15 10:24:58');

-- --------------------------------------------------------

--
-- Table structure for table `usergroups`
--

CREATE TABLE `usergroups` (
  `UserGroupID` bigint(20) NOT NULL,
  `Name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `Deleted` tinyint(1) NOT NULL,
  `CreatedBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `UpdatedBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=2340 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `usergroups`
--

INSERT INTO `usergroups` (`UserGroupID`, `Name`, `Description`, `CreatedAt`, `UpdatedAt`, `Deleted`, `CreatedBy`, `UpdatedBy`) VALUES
(1, 'Admin', 'System Administrators ', '2019-06-13 14:54:49', '2019-11-13 14:31:21', 0, '', 'Admin'),
(6, 'Clercks', 'Clercks up[dated', '2019-06-25 10:10:12', '2019-06-25 10:10:20', 1, 'admin', 'admin'),
(7, 'others', 'tenders,', '2019-07-11 16:19:24', '2019-07-11 16:19:24', 1, 'admin', 'admin'),
(8, 'Portal users', 'Applicants,PE,Interested parties', '2019-08-16 16:47:04', '2019-11-13 14:31:04', 0, 'Admin', 'Admin'),
(9, 'Case Officers', 'Case Officers', '2019-08-27 17:47:15', '2019-11-11 15:30:36', 0, 'Admin', 'Admin'),
(10, 'BOARD ROOM !', 'BOARD ROOM !', '2019-09-11 10:47:44', '2019-09-11 10:47:44', 1, 'Admin', 'Admin'),
(11, 'Finance', 'Finance/Accounts', '2019-11-13 14:33:37', '2019-11-13 14:33:37', 0, 'Admin', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Email` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Password` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Create_at` datetime NOT NULL,
  `Update_at` datetime DEFAULT NULL,
  `Login_at` datetime DEFAULT NULL,
  `Deleted` tinyint(1) NOT NULL,
  `IsActive` tinyint(1) DEFAULT NULL,
  `IsEmailverified` tinyint(1) DEFAULT NULL,
  `ActivationCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ResetPassword` char(38) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UserGroupID` bigint(20) DEFAULT NULL,
  `CreatedBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `UpdatedBy` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Photo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Signature` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IDnumber` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Gender` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DOB` datetime DEFAULT NULL,
  `ChangePassword` tinyint(1) DEFAULT NULL,
  `Board` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB AVG_ROW_LENGTH=1170 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Name`, `Username`, `Email`, `Password`, `Phone`, `Create_at`, `Update_at`, `Login_at`, `Deleted`, `IsActive`, `IsEmailverified`, `ActivationCode`, `ResetPassword`, `UserGroupID`, `CreatedBy`, `UpdatedBy`, `Photo`, `Category`, `Signature`, `IDnumber`, `Gender`, `DOB`, `ChangePassword`, `Board`) VALUES
('University of Nairobi', 'A123456789U', 'kserem20@gmail.com', '$2b$10$mGrLl/uE25tPF723vTL66.unIMgfivwyAgdOHbsdoO1ho8ngpnflm', '0700392599', '2019-11-12 13:41:58', '2019-11-18 17:13:17', NULL, 0, 1, 1, 'lXkDW', NULL, 8, 'A123456789U', 'A123456789U', 'default.png', 'PE', NULL, 'A123456789U', NULL, '2019-09-01 00:00:00', 1, 0),
('MINISTRY OF EDUCATION', 'A123456789X', 'elviskimcheruiyot@gmail.com', '$2b$10$W5YQ2FfNM3pc7poT7Blpz.Rws/nb6zHPo88EU0C1O0BEIWbrssWH6', '0105555285', '2019-11-11 16:26:50', NULL, NULL, 0, 1, 1, 'Xz1rd', NULL, 8, 'A123456789X', NULL, 'default.png', 'PE', NULL, 'A123456789X', NULL, '1963-12-12 00:00:00', 0, 0),
('Elvis kimutai', 'Admin', 'elviskcheruiyot@gmail.com', '$2b$10$W5YQ2FfNM3pc7poT7Blpz.Rws/nb6zHPo88EU0C1O0BEIWbrssWH6', '0705555285', '2019-07-12 15:50:56', '2019-11-11 15:11:28', '2019-07-12 15:50:56', 0, 1, 1, 'QDrts', '', 1, 'kim', 'Admin', '1573655832969-download.jpg', 'System_User', '1565251011001-signature.jpg', '31547833', 'Male', '1994-12-31 00:00:00', NULL, 1),
('CASE OFFICER', 'CASEOFFICER01', 'cmkikungu@gmail.com', '$2b$10$MegCaKC18v.FC4MQTkZA0uqQzQJni2lcnXAUOm4wLXGigzOn47hs6', '0701102928', '2019-11-11 15:34:20', NULL, NULL, 0, 1, 1, '0c3R5', NULL, 9, 'PPRA01', NULL, 'default.png', 'System_User', '', '23456789', 'Male', '2019-10-28 00:00:00', 1, 1),
('kelvin kelvin', 'kelvin', 'kelvinchemei@gmail.com', '$2b$10$b5pIw4f1MPYtGds1ykjrwu1VoD6BBXy5bU.AxJmkREipv8F55qLwm', '0710488377', '2019-11-18 14:27:04', NULL, NULL, 1, 1, 0, 'hIYzI', NULL, 1, 'Admin', NULL, 'default.png', 'System_User', '', '30487656', 'Male', '1994-11-17 00:00:00', 1, 1),
('JAMES SUPPLIERS LTD', 'P0123456788X', 'KEREBEI@HOTMAIL.COM', '$2b$10$xlt0b6DmhvHrO1XrmLjp9O78NkSjzo40Dcs1vc07BANYUpXdtaBbe', '0722719412', '2019-11-11 15:41:19', '2019-11-12 15:24:48', NULL, 0, 1, 1, 'AymPi', NULL, 8, 'P0123456788X', 'P0123456788X', '1573572285364-Kerebei PP Photo.jpg', 'Applicant', NULL, 'P0123456788X', NULL, '2000-12-08 00:00:00', 0, 0),
('APPLICANT LTD', 'P09875345W', 'info@wilcom.co.ke', '$2b$10$W5YQ2FfNM3pc7poT7Blpz.Rws/nb6zHPo88EU0C1O0BEIWbrssWH6', '0722114567', '2019-11-13 14:56:01', NULL, NULL, 0, 1, 1, 'l7XVZ', NULL, 8, 'P09875345W', NULL, 'default.png', 'Applicant', NULL, 'P09875345W', NULL, '2019-10-01 00:00:00', 1, 0),
('ECTA KENYA LIMITED', 'P121212121L', 'pjokumu@hotmail.com', '$2b$10$SdLj45h5bK7eqsLEz3LpTu95mIaGygUjTODe.ATYDFMeh89b0dyxK', '0734479491', '2019-11-15 12:12:49', NULL, NULL, 0, 0, 0, 'wfLdf', NULL, 8, 'P121212121L', NULL, 'default.png', 'Applicant', NULL, 'P121212121L', NULL, '2014-10-10 00:00:00', 1, 0),
('CMC MOTORS CORPORATION', 'P123456879Q', 'judiejuma@gmail.com', '$2b$10$W5YQ2FfNM3pc7poT7Blpz.Rws/nb6zHPo88EU0C1O0BEIWbrssWH6', '0705128595', '2019-11-15 10:39:06', NULL, NULL, 0, 1, 1, 'x1RNQ', NULL, 8, 'P123456879Q', NULL, 'default.png', 'Applicant', NULL, 'P123456879Q', NULL, '1980-08-12 00:00:00', 0, 0),
('STATE DEPARTMENT OF INTERIOR ', 'P65498745R', 'judyjay879@gmail.com', '$2b$10$Ir.GXoHCnu.BIMYef3jgJu4GTld8mM6oqtsBJRWH/sbGeY1CjKnse', '0733299665', '2019-11-15 11:46:48', NULL, NULL, 0, 1, 1, '8cj9S', NULL, 8, 'P65498745R', NULL, 'default.png', 'PE', NULL, 'P65498745R', NULL, '1963-12-12 00:00:00', 0, 0),
('Philemon Kiprop', 'pkiprop', 'philchem2009@gmail.com', '$2b$10$2vVCH1AbRn3gRUaNcsFzIeEO2bmSw9aGRDBwRiqC91a/JEDeb6sQu', '0722955458', '2019-11-15 10:38:19', NULL, NULL, 0, 1, 0, 'Zhvpe', NULL, 9, 'SOdhiambo', NULL, 'default.png', 'System_User', '', '123456', 'Male', '2019-11-15 00:00:00', 1, 0),
('Philip Okumu', 'Pokumu', 'okumupj@yahoo.com', '$2b$10$zy83GCav50YXdXDIGr1uq.q3eNTGdRQWFc0CJfqY1VI63xbDMfDnq', '0720768894', '2019-11-15 10:28:49', '2019-11-15 10:29:46', NULL, 0, 1, 1, 'MwEe2', NULL, 9, 'Admin', 'Admin', 'default.png', 'System_User', '', '10811856', 'Male', '1970-01-01 00:00:00', 1, 0),
('WILSON B. KEREBEI', 'PPRA01', 'wkerebei@gmail.com', '$2b$10$ICLCDuzBJpmhS5msvd1KwOTbg8NmbaZlEg62iHOhwLzhPWQg9P.pC', '07227194121', '2019-11-11 15:19:43', '2019-11-11 15:22:14', NULL, 0, 1, 1, 'tyCON', NULL, 1, 'Admin', 'PPRA01', '1573485732625-IMG_20190705_162423_7.jpg', 'System_User', '', '123456789', 'Male', '1980-12-12 00:00:00', 1, 1),
('Stanley Miheso', 'smiheso', 'mihesosc@yahoo.com', '$2b$10$.2VIwiMBs4xGuPrwdp7IOupE0YK1FExuQ3fFuxQOT8Weh7zYLtCHK', '0722607127', '2019-11-15 12:41:09', '2019-11-15 12:49:31', NULL, 0, 1, 1, 'SQFjZ', NULL, 9, 'SOdhiambo', 'SOdhiambo', 'default.png', 'System_User', '', '9136339', 'Male', '2004-09-07 00:00:00', 1, 1),
('Samson Odhiambo', 'SOdhiambo', 'x2press@gmail.com', '$2b$10$IHpsdp3AQKosuf0ZZdxcW.gF1ST8cg4cUxeFlEv.PV9atDCDJocXW', '0721382630', '2019-11-15 10:24:58', '2019-11-15 10:30:18', NULL, 0, 1, 1, 'GbO8J', NULL, 1, 'Admin', 'SOdhiambo', 'default.png', 'System_User', '', '20566933', 'Male', '1983-01-01 00:00:00', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `venuebookings`
--

CREATE TABLE `venuebookings` (
  `ID` int(11) NOT NULL,
  `VenueID` int(11) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  `Slot` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Booked_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Content` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Booked_On` datetime DEFAULT NULL,
  `Deleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB AVG_ROW_LENGTH=1489 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `venuebookings`
--

INSERT INTO `venuebookings` (`ID`, `VenueID`, `Date`, `Slot`, `Booked_By`, `Content`, `Booked_On`, `Deleted`) VALUES
(1, 6, '2019-11-14', '8.00AM', 'Admin', '17 OF 2019', '2019-11-14 16:30:51', 0),
(2, 6, '2019-11-14', '8.00AM', 'Admin', '17 OF 2019', '2019-11-14 16:33:49', 0),
(3, 6, '2019-11-18', '2.00PM', 'Admin', '18 OF 2019', '2019-11-15 12:34:32', 0),
(4, 6, '2019-11-18', '3.00AM', 'Admin', '18 OF 2019', '2019-11-15 12:34:32', 0),
(5, 6, '2019-11-18', '5.00AM', 'Admin', '18 OF 2019', '2019-11-15 12:34:32', 0),
(6, 6, '2019-11-18', '4.00AM', 'Admin', '18 OF 2019', '2019-11-15 12:34:32', 0),
(7, 6, '2019-11-15', '1.00PM', 'Admin', '18 OF 2019', '2019-11-15 12:46:03', 1),
(8, 6, '2019-11-15', '2.00AM', 'Admin', '18 OF 2019', '2019-11-15 12:46:03', 0),
(9, 6, '2019-11-15', '3.00AM', 'Admin', '18 OF 2019', '2019-11-15 12:58:22', 0),
(10, 6, '2019-11-15', '2.00PM', 'Admin', '18 OF 2019', '2019-11-15 12:58:22', 0),
(11, 6, '2019-11-15', '4.00AM', 'Admin', '18 OF 2019', '2019-11-15 12:58:23', 0);

-- --------------------------------------------------------

--
-- Table structure for table `venues`
--

CREATE TABLE `venues` (
  `ID` int(11) NOT NULL,
  `Name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Branch` int(11) NOT NULL,
  `Description` varchar(150) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL,
  `Created_At` datetime DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=2340 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `venues`
--

INSERT INTO `venues` (`ID`, `Name`, `Branch`, `Description`, `Deleted`, `Created_At`, `Created_By`, `Updated_At`, `Updated_By`) VALUES
(1, 'Board room 1', 0, 'Board room 1 Updated', 1, '2019-09-11 10:49:34', 'Admin', '2019-09-11 10:58:15', 'Admin'),
(2, 'Board Room1', 0, '10th Floor', 0, '2019-09-11 14:47:48', 'Admin', NULL, NULL),
(3, 'Board Room 1', 15, 'Room 1', 1, '2019-09-18 10:51:37', 'Admin', NULL, NULL),
(4, 'Room 1', 14, 'Main Board room', 0, '2019-09-18 10:52:47', 'Admin', '2019-10-04 10:13:26', 'Admin'),
(5, 'Room 1', 12, 'Room 1', 0, '2019-09-18 14:34:26', 'Admin', NULL, NULL),
(6, 'Room 1', 15, 'Room 1', 0, '2019-09-18 14:34:33', 'Admin', NULL, NULL),
(7, 'Room2', 14, 'Room2', 0, '2019-09-18 16:53:06', 'Admin', NULL, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `additionalsubmissiondocuments`
--
ALTER TABLE `additionalsubmissiondocuments`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `additionalsubmissions`
--
ALTER TABLE `additionalsubmissions`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `adjournment`
--
ALTER TABLE `adjournment`
  ADD PRIMARY KEY (`ID`,`ApplicationNo`);

--
-- Indexes for table `adjournmentdocuments`
--
ALTER TABLE `adjournmentdocuments`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `applicants`
--
ALTER TABLE `applicants`
  ADD PRIMARY KEY (`ID`,`ApplicantCode`),
  ADD KEY `financialyear_ibfk_1` (`Created_By`),
  ADD KEY `financialyear_ibfk_2` (`Updated_By`);

--
-- Indexes for table `applicantshistory`
--
ALTER TABLE `applicantshistory`
  ADD PRIMARY KEY (`ID`,`ApplicantCode`),
  ADD KEY `financialyear_ibfk_1` (`Created_By`),
  ADD KEY `financialyear_ibfk_2` (`Updated_By`);

--
-- Indexes for table `applicationdocuments`
--
ALTER TABLE `applicationdocuments`
  ADD PRIMARY KEY (`ID`,`Path`);

--
-- Indexes for table `applicationdocumentshistory`
--
ALTER TABLE `applicationdocumentshistory`
  ADD PRIMARY KEY (`ID`,`Path`);

--
-- Indexes for table `applicationfees`
--
ALTER TABLE `applicationfees`
  ADD PRIMARY KEY (`ID`,`ApplicationID`);

--
-- Indexes for table `applicationfeeshistory`
--
ALTER TABLE `applicationfeeshistory`
  ADD PRIMARY KEY (`ID`,`ApplicantID`);

--
-- Indexes for table `applications`
--
ALTER TABLE `applications`
  ADD PRIMARY KEY (`ID`,`ApplicationNo`),
  ADD KEY `ID` (`ID`);

--
-- Indexes for table `applicationsequence`
--
ALTER TABLE `applicationsequence`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `applicationshistory`
--
ALTER TABLE `applicationshistory`
  ADD PRIMARY KEY (`ID`,`ApplicationNo`);

--
-- Indexes for table `applications_approval_workflow`
--
ALTER TABLE `applications_approval_workflow`
  ADD PRIMARY KEY (`ID`,`ApplicationNo`),
  ADD KEY `ID` (`ID`);

--
-- Indexes for table `approvalmodules`
--
ALTER TABLE `approvalmodules`
  ADD PRIMARY KEY (`ID`,`ModuleCode`),
  ADD UNIQUE KEY `UK_approvalmodules_ModuleCode` (`ModuleCode`),
  ADD KEY `ModuleCode` (`ModuleCode`);

--
-- Indexes for table `approvers`
--
ALTER TABLE `approvers`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `Module` (`ModuleCode`);

--
-- Indexes for table `attendanceregister`
--
ALTER TABLE `attendanceregister`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `audittrails`
--
ALTER TABLE `audittrails`
  ADD PRIMARY KEY (`AuditID`);

--
-- Indexes for table `bankslips`
--
ALTER TABLE `bankslips`
  ADD PRIMARY KEY (`ID`,`ApplicationID`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `casedetails`
--
ALTER TABLE `casedetails`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `caseofficers`
--
ALTER TABLE `caseofficers`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `casesittingsregister`
--
ALTER TABLE `casesittingsregister`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `casewithdrawal`
--
ALTER TABLE `casewithdrawal`
  ADD PRIMARY KEY (`ID`,`ApplicationNo`);

--
-- Indexes for table `casewithdrawalapprovalworkflow`
--
ALTER TABLE `casewithdrawalapprovalworkflow`
  ADD PRIMARY KEY (`ID`,`ApplicationNo`);

--
-- Indexes for table `committeetypes`
--
ALTER TABLE `committeetypes`
  ADD PRIMARY KEY (`ID`,`Code`);

--
-- Indexes for table `configurations`
--
ALTER TABLE `configurations`
  ADD PRIMARY KEY (`ID`,`Code`),
  ADD KEY `Configurations_createduser` (`Created_By`),
  ADD KEY `Configurations_Updateduser` (`Updated_By`),
  ADD KEY `Configurations_Users` (`Deleted_By`);

--
-- Indexes for table `counties`
--
ALTER TABLE `counties`
  ADD PRIMARY KEY (`ID`,`Code`);

--
-- Indexes for table `deadlineapprovalworkflow`
--
ALTER TABLE `deadlineapprovalworkflow`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `decisiondocuments`
--
ALTER TABLE `decisiondocuments`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `decisionorders`
--
ALTER TABLE `decisionorders`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `decisions`
--
ALTER TABLE `decisions`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `feesapprovalworkflow`
--
ALTER TABLE `feesapprovalworkflow`
  ADD PRIMARY KEY (`ID`,`ApplicationID`);

--
-- Indexes for table `feescomputations`
--
ALTER TABLE `feescomputations`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `feesstructure`
--
ALTER TABLE `feesstructure`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `financialyear`
--
ALTER TABLE `financialyear`
  ADD PRIMARY KEY (`ID`,`Code`),
  ADD KEY `financialyear_ibfk_1` (`Created_By`),
  ADD KEY `financialyear_ibfk_2` (`Updated_By`);

--
-- Indexes for table `findingsonissues`
--
ALTER TABLE `findingsonissues`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `groundsandrequestedorders`
--
ALTER TABLE `groundsandrequestedorders`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `groundsandrequestedordershistory`
--
ALTER TABLE `groundsandrequestedordershistory`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `groupaccess`
--
ALTER TABLE `groupaccess`
  ADD PRIMARY KEY (`UserGroupID`,`RoleID`),
  ADD KEY `groupaccess_ibfk_3` (`RoleID`);

--
-- Indexes for table `hearingattachments`
--
ALTER TABLE `hearingattachments`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `hearingnotices`
--
ALTER TABLE `hearingnotices`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `interestedparties`
--
ALTER TABLE `interestedparties`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `issuesfordetermination`
--
ALTER TABLE `issuesfordetermination`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `membertypes`
--
ALTER TABLE `membertypes`
  ADD PRIMARY KEY (`ID`,`Code`);

--
-- Indexes for table `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `panellist`
--
ALTER TABLE `panellist`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `panels`
--
ALTER TABLE `panels`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `panelsapprovalworkflow`
--
ALTER TABLE `panelsapprovalworkflow`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `paymentdetails`
--
ALTER TABLE `paymentdetails`
  ADD PRIMARY KEY (`ID`,`ApplicationID`);

--
-- Indexes for table `pedeadlineextensionsrequests`
--
ALTER TABLE `pedeadlineextensionsrequests`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `peresponse`
--
ALTER TABLE `peresponse`
  ADD PRIMARY KEY (`ID`,`ApplicationNo`,`PEID`);

--
-- Indexes for table `peresponsebackgroundinformation`
--
ALTER TABLE `peresponsebackgroundinformation`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `peresponsedetails`
--
ALTER TABLE `peresponsedetails`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `peresponsedocuments`
--
ALTER TABLE `peresponsedocuments`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `peresponsetimer`
--
ALTER TABLE `peresponsetimer`
  ADD PRIMARY KEY (`ID`,`PEID`,`ApplicationNo`);

--
-- Indexes for table `petypes`
--
ALTER TABLE `petypes`
  ADD PRIMARY KEY (`ID`,`Code`);

--
-- Indexes for table `peusers`
--
ALTER TABLE `peusers`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `procuremententity`
--
ALTER TABLE `procuremententity`
  ADD PRIMARY KEY (`ID`,`PEID`),
  ADD UNIQUE KEY `UK_procuremententity_PEID` (`PEID`),
  ADD KEY `financialyear_ibfk_1` (`Created_By`),
  ADD KEY `financialyear_ibfk_2` (`Updated_By`),
  ADD KEY `PEID` (`PEID`);

--
-- Indexes for table `procurementmethods`
--
ALTER TABLE `procurementmethods`
  ADD PRIMARY KEY (`ID`,`Code`);

--
-- Indexes for table `rb1forms`
--
ALTER TABLE `rb1forms`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`RoleID`,`RoleName`);

--
-- Indexes for table `schedules`
--
ALTER TABLE `schedules`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `sentsms`
--
ALTER TABLE `sentsms`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `smsdetails`
--
ALTER TABLE `smsdetails`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `smtpdetails`
--
ALTER TABLE `smtpdetails`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `stdtenderdocs`
--
ALTER TABLE `stdtenderdocs`
  ADD PRIMARY KEY (`ID`,`Code`);

--
-- Indexes for table `tenderaddendums`
--
ALTER TABLE `tenderaddendums`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `FK_TenderID` (`TenderID`);

--
-- Indexes for table `tenders`
--
ALTER TABLE `tenders`
  ADD PRIMARY KEY (`ID`,`TenderNo`),
  ADD UNIQUE KEY `UK_tenders_ID` (`ID`),
  ADD KEY `ID` (`ID`),
  ADD KEY `FK_PEID` (`PEID`);

--
-- Indexes for table `tendertypes`
--
ALTER TABLE `tendertypes`
  ADD PRIMARY KEY (`ID`,`Code`);

--
-- Indexes for table `useraccess`
--
ALTER TABLE `useraccess`
  ADD PRIMARY KEY (`Username`,`RoleID`),
  ADD KEY `useraccess_ibfk_2` (`CreateBy`),
  ADD KEY `useraccess_ibfk_3` (`UpdateBy`);

--
-- Indexes for table `usergroups`
--
ALTER TABLE `usergroups`
  ADD PRIMARY KEY (`UserGroupID`),
  ADD UNIQUE KEY `Name` (`Name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Username`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `MobileNo` (`Phone`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `IDNo` (`IDnumber`),
  ADD KEY `users_ibfk_1` (`UserGroupID`);

--
-- Indexes for table `venuebookings`
--
ALTER TABLE `venuebookings`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `venues`
--
ALTER TABLE `venues`
  ADD PRIMARY KEY (`ID`,`Name`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `additionalsubmissiondocuments`
--
ALTER TABLE `additionalsubmissiondocuments`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `additionalsubmissions`
--
ALTER TABLE `additionalsubmissions`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `adjournment`
--
ALTER TABLE `adjournment`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `adjournmentdocuments`
--
ALTER TABLE `adjournmentdocuments`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `applicants`
--
ALTER TABLE `applicants`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `applicantshistory`
--
ALTER TABLE `applicantshistory`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `applicationdocuments`
--
ALTER TABLE `applicationdocuments`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `applicationdocumentshistory`
--
ALTER TABLE `applicationdocumentshistory`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `applicationfees`
--
ALTER TABLE `applicationfees`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=38;

--
-- AUTO_INCREMENT for table `applicationfeeshistory`
--
ALTER TABLE `applicationfeeshistory`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `applications`
--
ALTER TABLE `applications`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `applicationsequence`
--
ALTER TABLE `applicationsequence`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=66;

--
-- AUTO_INCREMENT for table `applicationshistory`
--
ALTER TABLE `applicationshistory`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `applications_approval_workflow`
--
ALTER TABLE `applications_approval_workflow`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `approvalmodules`
--
ALTER TABLE `approvalmodules`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `approvers`
--
ALTER TABLE `approvers`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `attendanceregister`
--
ALTER TABLE `attendanceregister`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `audittrails`
--
ALTER TABLE `audittrails`
  MODIFY `AuditID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=558;

--
-- AUTO_INCREMENT for table `bankslips`
--
ALTER TABLE `bankslips`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `casedetails`
--
ALTER TABLE `casedetails`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `caseofficers`
--
ALTER TABLE `caseofficers`
  MODIFY `ID` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `casesittingsregister`
--
ALTER TABLE `casesittingsregister`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `casewithdrawal`
--
ALTER TABLE `casewithdrawal`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `casewithdrawalapprovalworkflow`
--
ALTER TABLE `casewithdrawalapprovalworkflow`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `committeetypes`
--
ALTER TABLE `committeetypes`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `configurations`
--
ALTER TABLE `configurations`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `counties`
--
ALTER TABLE `counties`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

--
-- AUTO_INCREMENT for table `deadlineapprovalworkflow`
--
ALTER TABLE `deadlineapprovalworkflow`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `decisiondocuments`
--
ALTER TABLE `decisiondocuments`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `decisionorders`
--
ALTER TABLE `decisionorders`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `decisions`
--
ALTER TABLE `decisions`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `feesapprovalworkflow`
--
ALTER TABLE `feesapprovalworkflow`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `feescomputations`
--
ALTER TABLE `feescomputations`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `feesstructure`
--
ALTER TABLE `feesstructure`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `financialyear`
--
ALTER TABLE `financialyear`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `findingsonissues`
--
ALTER TABLE `findingsonissues`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `groundsandrequestedorders`
--
ALTER TABLE `groundsandrequestedorders`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=40;

--
-- AUTO_INCREMENT for table `groundsandrequestedordershistory`
--
ALTER TABLE `groundsandrequestedordershistory`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `hearingattachments`
--
ALTER TABLE `hearingattachments`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `hearingnotices`
--
ALTER TABLE `hearingnotices`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `interestedparties`
--
ALTER TABLE `interestedparties`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `issuesfordetermination`
--
ALTER TABLE `issuesfordetermination`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `membertypes`
--
ALTER TABLE `membertypes`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `notifications`
--
ALTER TABLE `notifications`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=269;

--
-- AUTO_INCREMENT for table `panellist`
--
ALTER TABLE `panellist`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `panels`
--
ALTER TABLE `panels`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `panelsapprovalworkflow`
--
ALTER TABLE `panelsapprovalworkflow`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `paymentdetails`
--
ALTER TABLE `paymentdetails`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `pedeadlineextensionsrequests`
--
ALTER TABLE `pedeadlineextensionsrequests`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `peresponse`
--
ALTER TABLE `peresponse`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `peresponsebackgroundinformation`
--
ALTER TABLE `peresponsebackgroundinformation`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `peresponsedetails`
--
ALTER TABLE `peresponsedetails`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `peresponsedocuments`
--
ALTER TABLE `peresponsedocuments`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `peresponsetimer`
--
ALTER TABLE `peresponsetimer`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `petypes`
--
ALTER TABLE `petypes`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `peusers`
--
ALTER TABLE `peusers`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `procuremententity`
--
ALTER TABLE `procuremententity`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `procurementmethods`
--
ALTER TABLE `procurementmethods`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `rb1forms`
--
ALTER TABLE `rb1forms`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `RoleID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- AUTO_INCREMENT for table `schedules`
--
ALTER TABLE `schedules`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `sentsms`
--
ALTER TABLE `sentsms`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=275;

--
-- AUTO_INCREMENT for table `smsdetails`
--
ALTER TABLE `smsdetails`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `smtpdetails`
--
ALTER TABLE `smtpdetails`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `stdtenderdocs`
--
ALTER TABLE `stdtenderdocs`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `tenderaddendums`
--
ALTER TABLE `tenderaddendums`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `tenders`
--
ALTER TABLE `tenders`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT for table `tendertypes`
--
ALTER TABLE `tendertypes`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `usergroups`
--
ALTER TABLE `usergroups`
  MODIFY `UserGroupID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `venuebookings`
--
ALTER TABLE `venuebookings`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `venues`
--
ALTER TABLE `venues`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `approvers`
--
ALTER TABLE `approvers`
  ADD CONSTRAINT `Module` FOREIGN KEY (`ModuleCode`) REFERENCES `approvalmodules` (`ModuleCode`);

--
-- Constraints for table `groupaccess`
--
ALTER TABLE `groupaccess`
  ADD CONSTRAINT `groupaccess_ibfk_1` FOREIGN KEY (`UserGroupID`) REFERENCES `usergroups` (`UserGroupID`),
  ADD CONSTRAINT `groupaccess_ibfk_2` FOREIGN KEY (`RoleID`) REFERENCES `roles` (`RoleID`),
  ADD CONSTRAINT `groupaccess_ibfk_3` FOREIGN KEY (`RoleID`) REFERENCES `roles` (`RoleID`);

--
-- Constraints for table `tenderaddendums`
--
ALTER TABLE `tenderaddendums`
  ADD CONSTRAINT `FK_TenderID` FOREIGN KEY (`TenderID`) REFERENCES `tenders` (`ID`);

--
-- Constraints for table `tenders`
--
ALTER TABLE `tenders`
  ADD CONSTRAINT `FK_PEID` FOREIGN KEY (`PEID`) REFERENCES `procuremententity` (`PEID`);

--
-- Constraints for table `useraccess`
--
ALTER TABLE `useraccess`
  ADD CONSTRAINT `useraccess_ibfk_1` FOREIGN KEY (`Username`) REFERENCES `users` (`Username`),
  ADD CONSTRAINT `useraccess_ibfk_2` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`Username`),
  ADD CONSTRAINT `useraccess_ibfk_3` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`Username`);
--
-- Database: `majuu`
--
CREATE DATABASE IF NOT EXISTS `majuu` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `majuu`;

-- --------------------------------------------------------

--
-- Table structure for table `audittrails`
--

CREATE TABLE `audittrails` (
  `AuditID` bigint(20) NOT NULL,
  `Date` datetime NOT NULL,
  `Username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `IpAddress` bigint(20) NOT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=151 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `audittrails`
--

INSERT INTO `audittrails` (`AuditID`, `Date`, `Username`, `Description`, `Category`, `IpAddress`) VALUES
(558, '2020-03-17 08:56:32', 'Admin', 'Updated UserGroup with iD: 5', 'Update', 0),
(559, '2020-03-17 08:56:54', 'Admin', 'Updated UserGroup with iD: 4', 'Update', 0),
(560, '2020-03-17 09:02:36', 'Admin', 'Updated UserGroup with iD: 2', 'Update', 0),
(561, '2020-03-17 09:12:02', 'Admin', 'Updated Role with iD: 1and name:System Users', 'Update', 0),
(562, '2020-03-17 10:03:22', 'Admin', 'Added new Role with Name: Crescent Medical and descCrescent Medical', 'Add', 0),
(563, '2020-03-17 10:10:37', 'Admin', 'Updated Medical facility with name: Crescent Medical', 'Update', 0),
(564, '2020-03-17 10:10:50', 'Admin', 'Updated Medical facility with name: Crescent Medical', 'Update', 0),
(565, '2020-03-17 10:11:29', 'Admin', 'Updated Medical facility with name: Crescent Medical', 'Update', 0),
(566, '2020-03-17 10:14:50', 'Admin', 'Updated Medical facility with name: Crescent Medical', 'Update', 0),
(567, '2020-03-17 10:14:58', 'Admin', 'Updated Medical facility with name: Crescent Medical', 'Update', 0),
(568, '2020-03-17 10:19:47', 'Admin', 'Deleted medical facility with ID: 0', 'Delete', 0),
(569, '2020-03-17 10:22:09', 'Admin', 'Deleted medical facility with ID: 1', 'Delete', 0),
(570, '2020-03-17 10:23:06', 'Admin', 'Added new medical facility with Name: Crescent Medical', 'Add', 0),
(571, '2020-03-17 10:23:11', 'Admin', 'Deleted medical facility with ID: 2', 'Delete', 0),
(572, '2020-03-17 11:45:16', 'Admin', 'Added new medical facility with Name: Crescent Medical', 'Add', 0),
(573, '2020-03-17 11:45:22', 'Admin', 'Deleted medical facility with ID: 3', 'Delete', 0),
(574, '2020-03-17 11:49:20', 'Admin', 'Added new medical facility with Name: chaudhry', 'Add', 0),
(575, '2020-03-17 11:49:20', 'Admin', 'Added new medical facility with Name: chaudhry', 'Add', 0),
(576, '2020-03-17 11:49:42', 'Admin', 'Updated Medical facility with name: Crescent Medical', 'Update', 0),
(577, '2020-03-17 15:53:19', '1', 'Added new Applicant:30487656', 'Add', 0),
(578, '2020-03-17 17:41:02', '30487656', 'Update with Applicant:0', 'Update', 0),
(579, '2020-03-17 17:44:33', 'software developer', 'Added new Applicant:30487659', 'Add', 0),
(580, '2020-03-17 17:46:10', '30487656', 'Update with Applicant:0', 'Update', 0),
(581, '2020-03-17 17:46:47', '30487656', 'Update with Applicant:0', 'Update', 0),
(582, '2020-03-17 17:52:32', 'software developer', 'Added new Applicant:400404040', 'Add', 0),
(583, '2020-03-17 17:57:41', 'Admin', 'Added new Applicant:400404042', 'Add', 0),
(584, '2020-03-18 07:41:31', 'Admin', 'Deleted APpplicant with IDNumber: 30487656', 'Delete', 0),
(585, '2020-03-18 07:42:16', 'Admin', 'Added new Applicant:400404046', 'Add', 0),
(586, '2020-03-18 07:43:47', '400404046', 'Update with Applicant:0', 'Update', 0),
(587, '2020-03-18 07:45:24', '400404046', 'Update with Applicant:0', 'Update', 0),
(588, '2020-03-18 07:46:28', '400404046', 'Update with Applicant:0', 'Update', 0),
(589, '2020-03-18 07:47:26', 'Admin', 'Added new Applicant:2147483647', 'Add', 0),
(590, '2020-03-18 07:52:59', 'Admin', 'Deleted APpplicant with IDNumber: 2147483647', 'Delete', 0),
(591, '2020-03-18 07:57:13', '1', 'Deleted APpplicant with IDNumber: 30487656', 'Delete', 0),
(592, '2020-03-18 07:59:25', 'Admin', 'Deleted APpplicant with IDNumber: 400404046', 'Delete', 0),
(593, '2020-03-18 08:00:54', '30487659', 'Update with Applicant:0', 'Update', 0),
(594, '2020-03-18 08:03:53', '1', 'Update with Applicant:30487659', 'Update', 0),
(595, '2020-03-18 08:05:28', 'Admin', 'Update with Applicant:0', 'Update', 0),
(596, '2020-03-18 08:07:27', 'Admin', 'Added new Applicant:30487656', 'Add', 0),
(597, '2020-03-18 08:08:35', 'Admin', 'Update with Applicant:0', 'Update', 0),
(598, '2020-03-18 08:11:42', 'Admin', 'Update with Applicant:0', 'Update', 0),
(599, '2020-03-18 08:48:19', 'Admin', 'Added new Role with Name: Educational and descEducational details', 'Add', 0),
(600, '2020-03-18 09:03:02', 'Admin', 'Added new User with username:UON', 'Add', 0),
(601, '2020-03-18 09:08:15', 'Admin', 'Updated Educational  with iD: 1and name:UON and KU', 'Update', 0),
(602, '2020-03-18 09:08:44', 'Admin', 'Deleted educational details with iD: 1', 'Delete', 0),
(603, '2020-03-18 09:49:45', 'Admin', 'Added new Role with Name: Parent and descparent ', 'Add', 0),
(604, '2020-03-18 09:53:15', 'Admin', 'Added new User with username:John tenai', 'Add', 0),
(605, '2020-03-18 09:56:47', 'Admin', 'Deleted parent  with iD: 1', 'Delete', 0),
(606, '2020-03-18 09:57:01', 'Admin', 'Added new User with username:John tenai', 'Add', 0),
(607, '2020-03-18 10:08:57', 'Admin', 'Added new Role with Name: NextOFKin and descNextOFKin', 'Add', 0),
(608, '2020-03-18 10:14:05', 'Admin', 'Added new Next of kin  with name:John tenai', 'Add', 0),
(609, '2020-03-18 10:15:35', '1', 'Updated next of kIN with name: John tenai', 'Update', 0),
(610, '2020-03-18 12:51:24', 'Admin', 'Added new Applicant:2147483647', 'Add', 0),
(611, '2020-03-18 13:59:21', 'Admin', 'Added new Applicant:3048765', 'Add', 0),
(612, '2020-03-18 15:12:09', 'Admin', 'Added new Applicant:34567890', 'Add', 0),
(613, '2020-03-18 15:15:26', 'Admin', 'Added new Applicant:23404040', 'Add', 0),
(614, '2020-03-18 15:15:38', 'Admin', 'Added new User with username:uko', 'Add', 0),
(615, '2020-03-18 15:17:46', 'Admin', 'Added new User with username:uko', 'Add', 0),
(616, '2020-03-18 15:18:41', 'Admin', 'Added new User with username:ukonnnn', 'Add', 0),
(617, '2020-03-18 15:31:56', 'Admin', 'Added new Applicant:34567896', 'Add', 0),
(618, '2020-03-18 15:32:08', 'Admin', 'Added new User with username:uko', 'Add', 0),
(619, '2020-03-18 15:35:20', 'Admin', 'Added new Applicant:34567897', 'Add', 0),
(620, '2020-03-18 15:35:31', 'Admin', 'Added new User with username:uko', 'Add', 0),
(621, '2020-03-18 15:37:04', 'Admin', 'Added new User with username:uko', 'Add', 0),
(622, '2020-03-18 16:00:59', 'Admin', 'Added new User with username:uko', 'Add', 0),
(623, '2020-03-18 16:02:58', 'Admin', 'Added new Applicant:34567898', 'Add', 0),
(624, '2020-03-18 16:03:08', 'Admin', 'Added new User with username:uko', 'Add', 0),
(625, '2020-03-18 16:03:11', 'Admin', 'Added new User with username:uko', 'Add', 0),
(626, '2020-03-18 16:03:18', 'Admin', 'Added new User with username:uko', 'Add', 0),
(627, '2020-03-18 16:03:31', 'Admin', 'Added new User with username:uko', 'Add', 0),
(628, '2020-03-18 16:04:54', 'Admin', 'Added new User with username:uko', 'Add', 0),
(629, '2020-03-18 16:05:05', 'Admin', 'Added new User with username:uko', 'Add', 0),
(630, '2020-03-18 16:09:29', 'Admin', 'Added new Applicant:600000', 'Add', 0),
(631, '2020-03-18 16:09:40', 'Admin', 'Added new User with username:uko', 'Add', 0),
(632, '2020-03-18 16:11:51', 'Admin', 'Added new User with username:ukonnnn', 'Add', 0),
(633, '2020-03-18 16:52:00', 'Admin', 'Added new User with username:uko', 'Add', 0),
(634, '2020-03-18 16:52:01', 'Admin', 'Added new User with username:uko', 'Add', 0),
(635, '2020-03-18 16:52:01', 'Admin', 'Added new User with username:uko', 'Add', 0),
(636, '2020-03-18 16:52:01', 'Admin', 'Added new User with username:uko', 'Add', 0),
(637, '2020-03-18 16:52:03', 'Admin', 'Added new User with username:uko', 'Add', 0),
(638, '2020-03-18 16:52:04', 'Admin', 'Added new User with username:uko', 'Add', 0),
(639, '2020-03-18 16:52:04', 'Admin', 'Added new User with username:uko', 'Add', 0),
(640, '2020-03-18 16:52:41', 'Admin', 'Added new Applicant:34567867', 'Add', 0),
(641, '2020-03-18 16:52:53', 'Admin', 'Added new User with username:uko', 'Add', 0),
(642, '2020-03-18 16:59:52', 'Admin', 'Added new Applicant:34567000', 'Add', 0),
(643, '2020-03-18 17:00:02', 'Admin', 'Added new User with username:uko', 'Add', 0),
(644, '2020-03-18 17:00:28', 'Admin', 'Added new User with username:uko', 'Add', 0),
(645, '2020-03-18 17:42:50', 'Admin', 'Added new Applicant:345678978', 'Add', 0),
(646, '2020-03-18 17:43:01', 'Admin', 'Added new User with username:uko', 'Add', 0),
(647, '2020-03-19 10:25:48', 'Admin', 'Added new Applicant:3456768', 'Add', 0),
(648, '2020-03-19 10:25:59', 'Admin', 'Added new User with username:ukonnnn', 'Add', 0),
(649, '2020-03-19 10:26:43', 'Admin', 'Deleted educational details with iD: 0', 'Delete', 0),
(650, '2020-03-19 11:06:48', 'Admin', 'Added new Applicant:30595969', 'Add', 0),
(651, '2020-03-19 11:07:07', 'Admin', 'Added new User with username:uon', 'Add', 0),
(652, '2020-03-19 11:07:21', 'Admin', 'Added new User with username:john tenai', 'Add', 0),
(653, '2020-03-19 11:23:32', 'Admin', 'Added new Applicant:34567899', 'Add', 0),
(654, '2020-03-19 11:23:49', 'Admin', 'Added new User with username:Nairobi', 'Add', 0),
(655, '2020-03-19 11:24:01', 'Admin', 'Added new User with username:john tenai', 'Add', 0),
(656, '2020-03-19 11:24:48', 'Admin', 'Deleted parent  with iD: 0', 'Delete', 0),
(657, '2020-03-19 11:59:24', 'Admin', 'Added new Applicant:30487659', 'Add', 0),
(658, '2020-03-19 11:59:36', 'Admin', 'Added new User with username:Nairobi', 'Add', 0),
(659, '2020-03-19 11:59:49', 'Admin', 'Added new User with username:john tenai', 'Add', 0),
(660, '2020-03-19 13:21:30', 'Admin', 'Added new Applicant:234567889', 'Add', 0),
(661, '2020-03-19 13:21:41', 'Admin', 'Added new User with username:Nairobi', 'Add', 0),
(662, '2020-03-19 13:21:54', 'Admin', 'Added new User with username:john tenai', 'Add', 0),
(663, '2020-03-19 13:24:03', 'Admin', 'Added new Applicant:304876578', 'Add', 0),
(664, '2020-03-19 13:24:13', 'Admin', 'Added new User with username:uko', 'Add', 0),
(665, '2020-03-19 13:24:24', 'Admin', 'Added new User with username:john tenai', 'Add', 0),
(666, '2020-03-19 13:43:54', 'Admin', 'Added new Applicant:34567810', 'Add', 0),
(667, '2020-03-19 13:44:06', 'Admin', 'Added new User with username:uko', 'Add', 0),
(668, '2020-03-19 13:44:15', 'Admin', 'Added new User with username:john tenai', 'Add', 0),
(669, '2020-03-19 13:46:41', 'Admin', 'Added new Applicant:34567856', 'Add', 0),
(670, '2020-03-19 13:46:51', 'Admin', 'Added new User with username:uko', 'Add', 0),
(671, '2020-03-19 13:47:03', 'Admin', 'Added new User with username:john tenai', 'Add', 0),
(672, '2020-03-19 13:48:14', 'Admin', 'Added new Applicant:34567800', 'Add', 0),
(673, '2020-03-19 13:48:25', 'Admin', 'Added new User with username:uko', 'Add', 0),
(674, '2020-03-19 13:48:33', 'Admin', 'Added new User with username:john tenai', 'Add', 0),
(675, '2020-03-19 13:48:44', 'Admin', 'Added new Next of kin  with name:nn', 'Add', 0),
(676, '2020-03-19 14:04:53', 'Admin', 'Added new Next of kin  with name:nn', 'Add', 0),
(677, '2020-03-19 15:20:39', 'Admin', 'Added new Role with Name: Siblings and descSiblings', 'Add', 0),
(678, '2020-03-19 15:33:12', 'Admin', 'Added new Siblings name:ukonnnn', 'Add', 0),
(679, '2020-03-19 15:34:16', '1', 'Updated next of kIN with name: ukonnnn', 'Update', 0),
(680, '2020-03-19 16:06:01', 'Admin', 'Added new Applicant:34567876', 'Add', 0),
(681, '2020-03-19 16:06:13', 'Admin', 'Added new User with username:uko', 'Add', 0),
(682, '2020-03-19 16:06:22', 'Admin', 'Added new User with username:john tenai', 'Add', 0),
(683, '2020-03-19 16:06:38', 'Admin', 'Added new Next of kin  with name:nn', 'Add', 0),
(684, '2020-03-19 16:06:53', 'Admin', 'Added new User with username:john tenai', 'Add', 0),
(685, '2020-03-19 16:07:11', 'Admin', 'Deleted educational details with iD: 0', 'Delete', 0),
(686, '2020-03-19 16:12:06', 'Admin', 'Added new Applicant:3456700', 'Add', 0),
(687, '2020-03-19 16:12:24', 'Admin', 'Added new User with username:Nairobi university', 'Add', 0),
(688, '2020-03-19 16:12:45', 'Admin', 'Added new User with username:john tenai', 'Add', 0),
(689, '2020-03-19 16:13:13', 'Admin', 'Added new Next of kin  with name:kelvin cheruiyot', 'Add', 0),
(690, '2020-03-19 16:23:45', 'Admin', 'Added new Applicant:456978', 'Add', 0),
(691, '2020-03-19 16:23:57', 'Admin', 'Added new User with username:Nairobi', 'Add', 0),
(692, '2020-03-19 16:24:22', 'Admin', 'Added new User with username:john tenai', 'Add', 0),
(693, '2020-03-19 16:24:38', 'Admin', 'Added new Next of kin  with name:kelvin cheruiyot', 'Add', 0),
(694, '2020-03-19 16:25:24', 'Admin', 'Added new Next of kin  with name:kelvin cheruiyot', 'Add', 0),
(695, '2020-03-19 16:32:25', 'Admin', 'Added new Applicant:45345678', 'Add', 0),
(696, '2020-03-19 16:32:41', 'Admin', 'Added new Applicant:23458858', 'Add', 0),
(697, '2020-03-19 16:32:52', 'Admin', 'Added new User with username:Nairobi', 'Add', 0),
(698, '2020-03-19 16:33:03', 'Admin', 'Added new User with username:Nairobi', 'Add', 0),
(699, '2020-03-19 16:33:12', 'Admin', 'Added new User with username:john tenai', 'Add', 0),
(700, '2020-03-19 16:33:23', 'Admin', 'Added new Next of kin  with name:kelvin cheruiyot', 'Add', 0),
(701, '2020-03-19 16:39:57', 'Admin', 'Added new Applicant:4532123', 'Add', 0),
(702, '2020-03-19 16:40:07', 'Admin', 'Added new User with username:Nairobi', 'Add', 0),
(703, '2020-03-19 16:40:16', 'Admin', 'Added new User with username:john tenai', 'Add', 0),
(704, '2020-03-19 16:40:26', 'Admin', 'Added new Next of kin  with name:kelvin cheruiyot', 'Add', 0),
(705, '2020-03-19 16:46:24', 'Admin', 'Added new Applicant:3234556', 'Add', 0),
(706, '2020-03-19 16:46:35', 'Admin', 'Added new User with username:uko', 'Add', 0),
(707, '2020-03-19 16:46:44', 'Admin', 'Added new User with username:john tenai', 'Add', 0),
(708, '2020-03-19 16:46:53', 'Admin', 'Added new Next of kin  with name:kelvin cheruiyot', 'Add', 0),
(709, '2020-03-19 16:52:30', 'Admin', 'Added new Applicant:234567878', 'Add', 0),
(710, '2020-03-19 16:52:40', 'Admin', 'Added new User with username:Nairobi', 'Add', 0),
(711, '2020-03-19 16:52:51', 'Admin', 'Added new User with username:john tenai', 'Add', 0),
(712, '2020-03-19 16:53:06', 'Admin', 'Added new Next of kin  with name:kelvin cheruiyot', 'Add', 0),
(713, '2020-03-19 16:57:46', 'Admin', 'Added new Applicant:34675432', 'Add', 0),
(714, '2020-03-19 16:57:55', 'Admin', 'Added new User with username:Nairobi', 'Add', 0),
(715, '2020-03-19 16:58:04', 'Admin', 'Added new User with username:john tenai', 'Add', 0),
(716, '2020-03-19 16:58:13', 'Admin', 'Added new Next of kin  with name:kelvin cheruiyot', 'Add', 0),
(717, '2020-03-19 17:00:53', 'Admin', 'Added new Siblings name:ukonnnn', 'Add', 0),
(718, '2020-03-19 17:08:57', 'Admin', 'Added new Applicant:3456766', 'Add', 0),
(719, '2020-03-19 17:09:06', 'Admin', 'Added new User with username:Nairobi', 'Add', 0),
(720, '2020-03-19 17:09:15', 'Admin', 'Added new User with username:john tenai', 'Add', 0),
(721, '2020-03-19 17:09:24', 'Admin', 'Added new Next of kin  with name:kelvin cheruiyot', 'Add', 0),
(722, '2020-03-19 17:09:34', 'Admin', 'Added new Siblings name:kelvin', 'Add', 0),
(723, '2020-03-20 08:45:21', 'Admin', 'Added new Applicant:23456784', 'Add', 0),
(724, '2020-03-20 08:45:31', 'Admin', 'Added new User with username:Nairobi', 'Add', 0),
(725, '2020-03-20 08:45:40', 'Admin', 'Added new User with username:john tenai', 'Add', 0),
(726, '2020-03-20 08:45:50', 'Admin', 'Added new Next of kin  with name:kelvin cheruiyot', 'Add', 0),
(727, '2020-03-20 08:45:58', 'Admin', 'Added new Siblings name:kelvin', 'Add', 0),
(728, '2020-03-20 09:25:46', 'Admin', 'Added new Applicant:222222222', 'Add', 0),
(729, '2020-03-20 10:08:27', 'Admin', 'Added new Applicant:33467656', 'Add', 0),
(730, '2020-03-20 10:08:59', 'Admin', 'Added new User with username:University of kabianga', 'Add', 0),
(731, '2020-03-20 10:09:28', 'Admin', 'Added new User with username:Kericho high school', 'Add', 0),
(732, '2020-03-20 10:09:52', 'Admin', 'Added new User with username:john tenai', 'Add', 0),
(733, '2020-03-20 10:10:04', 'Admin', 'Added new Next of kin  with name:kelvin cheruiyot', 'Add', 0),
(734, '2020-03-20 10:10:19', 'Admin', 'Added new Siblings name:kelvin', 'Add', 0),
(735, '2020-03-20 10:13:59', 'Admin', 'Added new Applicant:30487656', 'Add', 0),
(736, '2020-03-20 10:14:09', 'Admin', 'Added new User with username:Nairobi university', 'Add', 0),
(737, '2020-03-20 10:14:18', 'Admin', 'Added new User with username:john tenai', 'Add', 0),
(738, '2020-03-20 10:14:27', 'Admin', 'Added new Next of kin  with name:kelvin cheruiyot', 'Add', 0),
(739, '2020-03-20 10:14:38', 'Admin', 'Added new Siblings name:kelvin', 'Add', 0),
(740, '2020-03-20 13:50:30', 'Admin', 'Added new Applicant:34567893', 'Add', 0),
(741, '2020-03-20 13:50:55', 'Admin', 'Deleted educational details with iD: 1', 'Delete', 0),
(742, '2020-03-20 13:51:14', 'Admin', 'Added new User with username:Nairobi university', 'Add', 0),
(743, '2020-03-20 13:51:49', 'Admin', 'Added new User with username:Kabianga high', 'Add', 0),
(744, '2020-03-20 13:51:57', 'Admin', 'Deleted parent  with iD: 1', 'Delete', 0),
(745, '2020-03-20 13:52:20', 'Admin', 'Added new User with username:Mary kipchumba', 'Add', 0),
(746, '2020-03-20 13:52:35', 'Admin', 'Added new Next of kin  with name:kelvin cheruiyot', 'Add', 0),
(747, '2020-03-20 13:52:45', 'Admin', 'Added new Siblings name:kelvin', 'Add', 0),
(748, '2020-03-20 13:53:29', 'Admin', 'Added new Applicant:23455669', 'Add', 0),
(749, '2020-03-20 13:53:48', 'Admin', 'Added new User with username:Nairobi', 'Add', 0),
(750, '2020-03-20 13:53:57', 'Admin', 'Added new User with username:Mary kipchumba', 'Add', 0),
(751, '2020-03-20 13:54:07', 'Admin', 'Added new Next of kin  with name:kelvin cheruiyot', 'Add', 0),
(752, '2020-03-20 13:54:37', 'Admin', 'Added new Siblings name:kelvin', 'Add', 0),
(753, '2020-03-20 16:02:50', '4', 'Added new User with username:30487656', 'Add', 0),
(754, '2020-03-20 17:40:41', 'Admin', 'Added new medical facility with Name: Crescent Medical', 'Add', 0),
(755, '2020-03-20 17:41:01', 'Admin', 'Added new medical facility with Name: chaudhry', 'Add', 0),
(756, '2020-03-23 09:08:50', '4', 'Added new Minor medical:30494949', 'Add', 0),
(757, '2020-03-23 09:40:47', 'Admin', 'Deleted minor medical  with ID: 1', 'Delete', 0),
(758, '2020-03-23 09:44:23', 'Admin', 'Deleted minor medical  with ID: 1', 'Delete', 0),
(759, '2020-03-23 10:00:40', '4', 'Added new Minor medical:30494949', 'Add', 0),
(760, '2020-03-23 10:10:55', 'Admin', 'Added new Next of kin  with name:John tenai', 'Add', 0),
(761, '2020-03-23 10:31:42', '4', 'Added new Minor medical:30487656', 'Add', 0),
(762, '2020-03-23 10:42:49', 'Admin', 'Added new Next of kin  with name:2020', 'Add', 0),
(763, '2020-03-23 10:53:02', 'Admin', 'Added new Minor medical:30494949', 'Add', 0),
(764, '2020-03-23 10:55:35', 'Admin', 'Added new Minor medical:Chemey jeruto', 'Add', 0),
(765, '2020-03-23 10:55:58', 'Admin', 'Added new Minor medical:Chemey jeruto', 'Add', 0),
(766, '2020-03-23 11:02:26', 'Admin', 'Added new Minor medical:Chemey jeruto', 'Add', 0),
(767, '2020-03-23 11:11:16', 'Admin', 'Added new Minor medical:Chemey jeruto', 'Add', 0),
(768, '2020-03-23 11:14:57', 'Admin', 'Added new Minor medical:kelvin cheruiyot chemey', 'Add', 0),
(769, '2020-03-23 11:19:07', 'Admin', 'Added new Minor medical:Chemey jeruto', 'Add', 0),
(770, '2020-03-23 11:20:56', 'Admin', 'Added new Minor medical:kelvin cheruiyot chemey', 'Add', 0),
(771, '2020-03-23 11:34:56', '6', 'Added new Minor medical:30487656', 'Add', 0),
(772, '2020-03-23 11:38:34', 'Admin', 'Added new Minor medical:30487656', 'Add', 0),
(773, '2020-03-23 11:40:00', 'Admin', 'Added new Minor medical:33467656', 'Add', 0),
(774, '2020-03-23 11:55:51', 'Admin', 'Deleted minor medical  with ID: 0', 'Delete', 0);

-- --------------------------------------------------------

--
-- Table structure for table `configurations`
--

CREATE TABLE `configurations` (
  `ID` bigint(20) NOT NULL,
  `Code` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `PhysicalAdress` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Street` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PoBox` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PostalCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Town` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Telephone1` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Telephone2` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Mobile` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Fax` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Email` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Website` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PIN` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Logo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NextPE` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `NextComm` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `NextSupplier` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT '1',
  `NextMember` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `NextProcMeth` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `NextStdDoc` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `NextApplication` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `NextRev` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `Created_At` datetime DEFAULT NULL,
  `Updated_At` datetime DEFAULT NULL,
  `Created_By` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Updated_By` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Deleted` tinyint(4) NOT NULL,
  `Deleted_By` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `NextPEType` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `NextMemberType` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `NextFeeCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `NextTenderType` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT '1',
  `Year` varchar(20) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `PeResponseDays` int(11) DEFAULT 5,
  `CaseClosingDate` int(11) DEFAULT 21
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `educationaldetails`
--

CREATE TABLE `educationaldetails` (
  `ID` int(11) NOT NULL,
  `IDNumber` int(11) DEFAULT NULL,
  `Institution` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Period` varchar(55) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Decription` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_at` datetime DEFAULT NULL,
  `CreatedBy` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UpdateBy` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Update_at` datetime DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `educationaldetails`
--

INSERT INTO `educationaldetails` (`ID`, `IDNumber`, `Institution`, `Period`, `Decription`, `Created_at`, `CreatedBy`, `UpdateBy`, `Update_at`, `Deleted`) VALUES
(1, 33467656, 'University of kabianga', '2014-2018', 'computer science', '2020-03-20 10:08:59', 'Admin', '0', '0000-00-00 00:00:00', 1),
(2, 33467656, 'Kericho high school', '2004-2015', 'computer science', '2020-03-20 10:09:28', 'Admin', '0', '0000-00-00 00:00:00', 0),
(3, 30487656, 'Nairobi university', '2016-2018', 'computer science', '2020-03-20 10:14:09', 'Admin', '0', '0000-00-00 00:00:00', 0),
(4, 34567893, 'Nairobi university', '2016-2017', 'computer science', '2020-03-20 13:51:14', 'Admin', '0', '0000-00-00 00:00:00', 0),
(5, 34567893, 'Kabianga high', '2012-2014', 'kscpe', '2020-03-20 13:51:49', 'Admin', '0', '0000-00-00 00:00:00', 0),
(6, 23455669, 'Nairobi', '2016-2018', 'computer science', '2020-03-20 13:53:47', 'Admin', '0', '0000-00-00 00:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `groupaccess`
--

CREATE TABLE `groupaccess` (
  `UserGroupID` bigint(20) NOT NULL,
  `RoleID` bigint(20) NOT NULL,
  `Edit` tinyint(1) NOT NULL,
  `Remove` tinyint(1) NOT NULL,
  `AddNew` tinyint(1) NOT NULL,
  `View` tinyint(1) NOT NULL,
  `Export` tinyint(1) NOT NULL,
  `UpdateBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreateBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `Deleted` tinyint(1) NOT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=142 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `medicalfacility`
--

CREATE TABLE `medicalfacility` (
  `MedID` int(11) NOT NULL,
  `Name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Description` varchar(55) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_at` datetime DEFAULT NULL,
  `Createdby` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Updated_at` datetime DEFAULT NULL,
  `UpdatedBy` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `medicalfacility`
--

INSERT INTO `medicalfacility` (`MedID`, `Name`, `Description`, `Created_at`, `Createdby`, `Updated_at`, `UpdatedBy`, `Deleted`) VALUES
(1, 'Crescent Medical', 'Crescent medical', '2020-03-20 17:40:41', 'Admin', '0000-00-00 00:00:00', '0', 0),
(2, 'chaudhry', 'Chaudhry', '2020-03-20 17:41:01', 'Admin', '0000-00-00 00:00:00', '0', 0);

-- --------------------------------------------------------

--
-- Table structure for table `minormedical`
--

CREATE TABLE `minormedical` (
  `ID` int(11) NOT NULL,
  `Number` int(11) DEFAULT NULL,
  `DOM` datetime DEFAULT NULL,
  `MedicalFacility` varchar(55) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Result` varchar(55) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Cost` varchar(55) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_at` datetime DEFAULT NULL,
  `CreatedBy` varchar(55) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UpdateBy` varchar(55) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Updated_at` datetime DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `minormedical`
--

INSERT INTO `minormedical` (`ID`, `Number`, `DOM`, `MedicalFacility`, `Result`, `Cost`, `Created_at`, `CreatedBy`, `UpdateBy`, `Updated_at`, `Deleted`) VALUES
(1, 30494949, '2020-03-02 09:01:43', 'mm', 'mmm', 'mmm', '2020-03-23 09:08:50', '4', '0', '0000-00-00 00:00:00', 1),
(2, 30494949, '2020-03-02 09:01:43', 'mm', 'mmm', 'mmm', '2020-03-23 10:00:40', '4', '0', '0000-00-00 00:00:00', 0),
(3, 30487656, '2020-03-01 09:01:43', 'mm', 'mmm', 'mmm', '2020-03-23 10:31:42', '4', '0', '0000-00-00 00:00:00', 0),
(4, 30494949, '0000-00-00 00:00:00', '3', 'fail', '67', '2020-03-23 10:53:02', 'Admin', '0', '0000-00-00 00:00:00', 0),
(5, 30487656, '2020-03-03 00:00:00', 'chaudhry', 'fail', '500', '2020-03-23 10:55:35', 'Admin', '0', '0000-00-00 00:00:00', 0),
(6, 0, '2020-03-10 00:00:00', 'chaudhry', 'fail', '500', '2020-03-23 10:55:58', 'Admin', '0', '0000-00-00 00:00:00', 0),
(7, 0, '2020-03-09 00:00:00', 'chaudhry', 'Pass', '500', '2020-03-23 11:02:26', 'Admin', '0', '0000-00-00 00:00:00', 0),
(8, 0, '2020-03-09 00:00:00', 'chaudhry', 'Pass', '500', '2020-03-23 11:11:16', 'Admin', '0', '0000-00-00 00:00:00', 0),
(9, 0, '2020-03-01 00:00:00', 'chaudhry', 'Pass', '500', '2020-03-23 11:14:57', 'Admin', '0', '0000-00-00 00:00:00', 0),
(10, 0, '2020-03-03 00:00:00', 'chaudhry', 'Pass', '500', '2020-03-23 11:19:07', 'Admin', '0', '0000-00-00 00:00:00', 0),
(11, 0, '2020-03-09 00:00:00', 'chaudhry', 'Pass', '500', '2020-03-23 11:20:56', 'Admin', '0', '0000-00-00 00:00:00', 0),
(12, 30487656, '2020-03-01 09:01:43', 'mm', 'mmm', 'mmm', '2020-03-23 11:34:41', NULL, '0', '0000-00-00 00:00:00', 0),
(13, 30487656, '2020-03-01 09:01:43', 'mm', 'mmm', 'mmm', '2020-03-23 11:34:56', '6', '0', '0000-00-00 00:00:00', 0),
(14, 30487656, '2020-03-10 00:00:00', 'chaudhry', 'Pass', '500', '2020-03-23 11:38:34', 'Admin', '0', '0000-00-00 00:00:00', 0),
(15, 33467656, '2020-03-09 00:00:00', 'chaudhry', 'Pass', '500', '2020-03-23 11:40:00', 'Admin', '0', '0000-00-00 00:00:00', 0);

-- --------------------------------------------------------

--
-- Table structure for table `nextofkin`
--

CREATE TABLE `nextofkin` (
  `ID` int(11) NOT NULL,
  `IDNumber` int(11) DEFAULT NULL,
  `KinName` varchar(55) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `KRelationship` varchar(55) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CurrentResident` varchar(55) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Contact` varchar(55) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_at` datetime DEFAULT NULL,
  `CreatedBy` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `nextofkin`
--

INSERT INTO `nextofkin` (`ID`, `IDNumber`, `KinName`, `KRelationship`, `CurrentResident`, `Contact`, `Created_at`, `CreatedBy`, `Deleted`) VALUES
(1, 33467656, 'kelvin cheruiyot', 'mother', 'ngando', '0700392599', '2020-03-20 10:10:04', 'Admin', 0),
(2, 30487656, 'kelvin cheruiyot', 'father', 'ngando', '0700392599', '2020-03-20 10:14:27', 'Admin', 0),
(3, 34567893, 'kelvin cheruiyot', 'father', 'ngando', '0700392599', '2020-03-20 13:52:35', 'Admin', 0),
(4, 23455669, 'kelvin cheruiyot', 'father', 'ngando', '0700392599', '2020-03-20 13:54:07', 'Admin', 0),
(5, 30487656, 'John tenai', 'f', 'Ngando', '0700392499', '2020-03-23 10:10:55', 'Admin', 0),
(6, 30494949, '2020', NULL, 'fail', '67', '2020-03-23 10:42:49', 'Admin', 0);

-- --------------------------------------------------------

--
-- Table structure for table `parents`
--

CREATE TABLE `parents` (
  `ID` int(11) NOT NULL,
  `IDNumber` int(11) DEFAULT NULL,
  `Name` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ParentID` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Relationship` varchar(55) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_at` datetime DEFAULT NULL,
  `CreatedBy` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `parents`
--

INSERT INTO `parents` (`ID`, `IDNumber`, `Name`, `ParentID`, `Relationship`, `Created_at`, `CreatedBy`, `Deleted`) VALUES
(1, 33467656, 'john tenai', '234595969', 'Father', '2020-03-20 10:09:52', 'Admin', 1),
(2, 30487656, 'john tenai', '22343434', 'Father', '2020-03-20 10:14:18', 'Admin', 0),
(3, 34567893, 'Mary kipchumba', '22343434', 'Father', '2020-03-20 13:52:20', 'Admin', 0),
(4, 23455669, 'Mary kipchumba', '22343434', 'Father', '2020-03-20 13:53:57', 'Admin', 0);

-- --------------------------------------------------------

--
-- Table structure for table `registration`
--

CREATE TABLE `registration` (
  `IDNumber` int(11) NOT NULL,
  `Fullname` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Gender` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Phone` int(11) DEFAULT NULL,
  `DOB` datetime DEFAULT NULL,
  `Email` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Country` varchar(55) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Passport` int(20) DEFAULT NULL,
  `Religion` varchar(55) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Marital` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Height` float DEFAULT NULL,
  `Weight` float DEFAULT NULL,
  `Languages` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Skills` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_at` datetime DEFAULT NULL,
  `CreatedBy` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Updated_at` datetime DEFAULT NULL,
  `Updated_by` varchar(55) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `registration`
--

INSERT INTO `registration` (`IDNumber`, `Fullname`, `Gender`, `Phone`, `DOB`, `Email`, `Country`, `Passport`, `Religion`, `Marital`, `Height`, `Weight`, `Languages`, `Skills`, `Created_at`, `CreatedBy`, `Updated_at`, `Updated_by`, `Deleted`) VALUES
(23455669, 'kelvin cheruiyot', 'male', 700392599, '2020-03-10 00:00:00', 'kserem20@gmail.com', 'kenyan', 2030304, 'Christian', 'single', 120, 60, 'kiswa,English', 'Full Stack developer, Software developer', '2020-03-20 13:53:29', 'Admin', '0000-00-00 00:00:00', '0', 0),
(30487656, 'Chemey jeruto', 'FEMALE', 700392599, '2020-03-03 00:00:00', 'cheruiyot@gmail.com', 'kenyan', 2030304, 'Christian', 'single', 120, 120, 'kiswa', 'english', '2020-03-20 10:13:59', 'Admin', '0000-00-00 00:00:00', '0', 0),
(33467656, 'kelvin cheruiyot chemey', 'male', 700392599, '1999-06-08 00:00:00', 'cheruiyot@gmail.com', 'kenyan', 2030304, 'Christian', 'single', 159, 60, 'kiswa,English', 'Full Stack developer', '2020-03-20 10:08:27', 'Admin', '0000-00-00 00:00:00', '0', 0),
(34567893, 'kelvin cheruiyot', 'FEMALE', 700392599, '2020-03-02 00:00:00', 'kserem20@gmail.com', 'kenyan', 2030304, 'Christian', 'single', 120, 120, 'kiswa,English', 'Full Stack developer, Software developer', '2020-03-20 13:50:30', 'Admin', '0000-00-00 00:00:00', '0', 0);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `RoleID` bigint(20) NOT NULL,
  `RoleName` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `RoleDescription` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `UpdateBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreateBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `Deleted` tinyint(1) NOT NULL,
  `Category` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=341 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`RoleID`, `RoleName`, `RoleDescription`, `UpdateBy`, `CreateBy`, `CreatedAt`, `UpdatedAt`, `Deleted`, `Category`) VALUES
(1, 'System Users', 'System Users ', 'Admin', 'user', '2019-06-27 17:30:15', '2020-03-17 09:12:02', 0, 'Admin'),
(2, 'Roles', 'Security roles', 'user', 'user', '2019-06-27 17:30:36', '2019-06-27 17:30:36', 0, 'Admin'),
(3, 'Security Groups', 'Security groups', 'user', 'user', '2019-06-27 17:31:08', '2019-06-27 17:31:08', 0, 'Admin'),
(4, 'Assign Group Access', 'Assign Group Access', 'user', 'user', '2019-06-27 17:31:29', '2019-06-27 17:31:29', 0, 'Admin'),
(5, 'Audit Trails', 'Audit Trails', 'user', 'user', '2019-06-27 17:31:57', '2019-06-27 17:31:57', 0, 'Admin'),
(6, 'System Administration', 'System Administration', 'Admin', 'Admin', '2019-07-26 12:02:56', '2019-07-26 12:02:56', 0, 'Menus'),
(7, 'Fees Settings', 'Fees Settings', 'Admin', 'Admin', '2019-07-26 12:03:16', '2019-07-26 12:03:16', 0, 'Systemparameteres'),
(8, 'Recruitment', 'Recruitment', 'Admin', 'Admin', '2019-07-26 12:03:33', '2019-07-26 12:03:33', 0, 'Menus'),
(9, 'Registration', 'Registration', 'Admin', 'Admin', '2019-07-26 12:03:57', '2019-07-26 12:03:57', 0, 'Recruitment'),
(10, 'Minor Medical', 'Minor Medical', 'Admin', 'Admin', '2019-07-26 12:04:10', '2019-07-26 12:04:10', 0, 'Recruitment'),
(11, 'DCI Clearance', 'DCI Clearance', 'Admin', 'Admin', '2019-07-26 12:04:23', '2019-07-26 12:04:23', 0, 'Recruitment'),
(12, 'Reports', 'Reports', 'Admin', 'Admin', '2019-07-26 12:04:36', '2019-07-26 12:04:36', 0, 'Menus'),
(13, 'DashBoards', 'DashBoards', 'Admin', 'Admin', '2019-07-26 15:19:29', '2019-07-26 15:19:29', 0, NULL),
(14, 'Assign User Access', 'Assign User Access', 'Admin', 'Admin', '2019-07-29 11:03:54', '2019-07-29 11:03:57', 0, 'Admin'),
(15, 'System Configurations', 'System Configurations', 'Admin', 'Admin', '2019-07-29 14:07:47', '2019-07-29 14:07:47', 0, NULL),
(16, 'Passport processing', 'Passport Processing', 'Admin', 'Admin', '2019-07-31 16:59:11', '2019-07-31 16:59:11', 0, 'Recruitment'),
(17, 'Training', 'Training', 'Admin', 'Admin', '2019-08-01 10:21:59', '2019-08-01 10:21:59', 0, 'Recruitment'),
(18, 'Contract Processing', 'Contract Processing', 'Admin', 'Admin', '2019-08-01 10:25:18', '2019-08-01 10:25:18', 0, 'Recruitment'),
(19, 'Major Medical', 'Major Medical', 'Admin', 'Admin', '2019-08-01 10:49:11', '2019-08-01 10:49:11', 0, 'Recruitment'),
(20, 'NEAA', 'NEAA', 'Admin', 'Admin', '2019-08-01 11:41:30', '2019-08-01 11:41:30', 0, 'Recruitment'),
(21, 'Visa Prcoessing', 'Visa Prcoessing', 'Admin', 'Admin', '2019-08-01 13:32:48', '2019-08-01 13:32:48', 0, 'Recruitment'),
(22, 'Attestation', 'Attestation', 'Admin', 'Admin', '2019-08-05 14:06:38', '2019-08-05 14:06:38', 0, 'Recruitment'),
(23, 'Ticketing', 'Ticketing', 'Admin', 'Admin', '2019-08-05 14:44:33', '2019-08-05 14:44:33', 0, 'Recruitment'),
(24, 'Final Medical', 'Final Medical', 'Admin', 'Admin', '2019-08-06 14:20:29', '2019-08-06 14:20:29', 0, 'Recruitment'),
(25, 'Travelling', 'Travelling', 'Admin', 'Admin', '2019-08-06 14:34:26', '2019-08-06 14:34:26', 0, 'Recruitment'),
(26, 'Facility', 'Facility', 'Admin', 'Admin', '2019-08-06 14:34:26', '2019-08-06 14:34:26', 0, 'Systemparameteres'),
(27, 'System parameteres', 'System parameteres', 'Admin', 'Admin', '2019-08-06 14:34:26', '2019-08-06 14:34:26', 0, 'Menus'),
(28, 'Educational', 'Educational details', 'Admin', 'Admin', '2020-03-18 08:48:19', '2020-03-18 08:48:19', 0, 'Recruitment'),
(29, 'Parent', 'parent ', 'Admin', 'Admin', '2020-03-18 09:49:45', '2020-03-18 09:49:45', 0, 'Recruitment'),
(30, 'NextOFKin', 'NextOFKin', 'Admin', 'Admin', '2020-03-18 10:08:57', '2020-03-18 10:08:57', 0, 'Recruitment'),
(31, 'Siblings', 'Siblings', 'Admin', 'Admin', '2020-03-19 15:20:39', '2020-03-19 15:20:39', 0, 'Recruitment');

-- --------------------------------------------------------

--
-- Table structure for table `siblings`
--

CREATE TABLE `siblings` (
  `ID` int(11) NOT NULL,
  `IDNumber` int(11) DEFAULT NULL,
  `SiblingName` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Sex` varchar(55) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Age` varchar(25) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Created_at` datetime DEFAULT NULL,
  `Created_by` varchar(55) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Deleted` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `siblings`
--

INSERT INTO `siblings` (`ID`, `IDNumber`, `SiblingName`, `Sex`, `Age`, `Created_at`, `Created_by`, `Deleted`) VALUES
(1, 33467656, 'kelvin', 'male', '23', '2020-03-20 10:10:19', 'Admin', 0),
(2, 30487656, 'kelvin', 'male', 'nnn', '2020-03-20 10:14:38', 'Admin', 0),
(3, 34567893, 'kelvin', 'male', 'nnn', '2020-03-20 13:52:45', 'Admin', 0),
(4, 23455669, 'kelvin', 'male', '33', '2020-03-20 13:54:37', 'Admin', 0);

-- --------------------------------------------------------

--
-- Table structure for table `smsdetails`
--

CREATE TABLE `smsdetails` (
  `ID` int(11) NOT NULL,
  `SenderID` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UserName` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `URL` varchar(200) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Key` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `smsdetails`
--

INSERT INTO `smsdetails` (`ID`, `SenderID`, `UserName`, `URL`, `Key`) VALUES
(1, 'WILCOM-TVET', 'root', 'http://api.mspace.co.ke/mspaceservice/wr/sms/sendtext/', '123456');

-- --------------------------------------------------------

--
-- Table structure for table `smtpdetails`
--

CREATE TABLE `smtpdetails` (
  `ID` int(11) NOT NULL,
  `Host` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Port` int(255) DEFAULT NULL,
  `Sender` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Password` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `smtpdetails`
--

INSERT INTO `smtpdetails` (`ID`, `Host`, `Port`, `Sender`, `Password`) VALUES
(1, 'smtp.gmail.com', 465, 'rootdevelopment@gmail.com\r\n', 'root1234');

-- --------------------------------------------------------

--
-- Table structure for table `useraccess`
--

CREATE TABLE `useraccess` (
  `Username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `RoleID` bigint(20) NOT NULL,
  `Edit` tinyint(1) NOT NULL,
  `Remove` tinyint(1) NOT NULL,
  `AddNew` tinyint(1) NOT NULL,
  `View` tinyint(1) NOT NULL,
  `Export` tinyint(1) NOT NULL,
  `UpdateBy` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `CreateBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime DEFAULT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=141 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `useraccess`
--

INSERT INTO `useraccess` (`Username`, `RoleID`, `Edit`, `Remove`, `AddNew`, `View`, `Export`, `UpdateBy`, `CreateBy`, `CreatedAt`, `UpdatedAt`) VALUES
('Admin', 1, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:18:25', '2019-08-09 16:01:32'),
('Admin', 2, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:18:24', '2019-08-09 15:38:47'),
('Admin', 3, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:18:23', '2019-08-09 18:09:49'),
('Admin', 4, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:18:24', '2019-07-29 11:28:25'),
('Admin', 5, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-19 11:22:29', '2019-08-09 16:38:25'),
('Admin', 6, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:18:17', '2019-08-02 13:09:00'),
('Admin', 7, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:18:19', '2019-07-31 10:58:56'),
('Admin', 8, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:05:31', '2019-07-29 11:28:22'),
('Admin', 9, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:18:20', '2019-07-29 11:28:22'),
('Admin', 10, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:04:53', '2019-07-29 11:28:21'),
('Admin', 11, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:18:21', '2019-07-29 11:28:21'),
('Admin', 12, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-26 15:18:22', '2019-07-29 11:28:20'),
('Admin', 13, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-29 09:48:29', '2019-07-29 11:28:19'),
('Admin', 14, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-29 09:48:29', '2019-07-29 11:28:18'),
('Admin', 15, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-29 14:08:14', '2019-07-29 14:08:19'),
('Admin', 16, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-07-31 16:59:50', '2019-08-09 18:09:44'),
('Admin', 17, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-01 10:22:26', '2019-08-09 17:45:49'),
('Admin', 18, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-01 10:25:44', '2019-08-09 18:09:43'),
('Admin', 19, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-01 10:49:28', '2019-08-09 18:09:44'),
('Admin', 20, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-01 11:41:52', '2019-08-09 18:09:43'),
('Admin', 21, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-01 13:33:23', '2019-08-09 18:09:38'),
('Admin', 22, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-05 14:07:10', '2019-08-09 18:09:39'),
('Admin', 23, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-05 14:44:54', '2019-08-09 17:49:19'),
('Admin', 24, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-06 14:20:47', '2019-08-09 18:09:46'),
('Admin', 25, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-06 14:34:44', '2019-08-09 17:01:47'),
('Admin', 26, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-09 11:42:49', '2019-08-09 18:09:40'),
('Admin', 27, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-11 10:47:35', '2019-08-11 10:47:40'),
('Admin', 28, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-08-23 12:02:10', '2019-08-23 12:02:16'),
('Admin', 29, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-09 09:48:24', '2019-09-09 09:48:35'),
('Admin', 30, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-11 10:47:01', '2019-09-11 14:47:21'),
('Admin', 31, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-11 11:13:28', '2019-09-11 11:13:36'),
('Admin', 32, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-12 09:48:01', '2019-09-12 09:48:09'),
('Admin', 33, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-13 10:05:26', '2019-09-13 10:05:33'),
('Admin', 34, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-17 09:41:59', '2019-09-17 09:42:09'),
('Admin', 35, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-18 10:04:33', '2019-09-18 10:04:41'),
('Admin', 36, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-23 14:29:07', '2019-09-23 14:29:16'),
('Admin', 37, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-24 15:03:48', '2019-09-24 15:03:56'),
('Admin', 38, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-09-27 12:21:38', '2019-09-27 12:21:47'),
('Admin', 39, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-10-01 11:03:50', '2019-10-01 13:43:56'),
('Admin', 40, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-10-09 10:57:28', '2019-10-09 10:57:35'),
('Admin', 41, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-10-15 17:09:35', '2019-10-15 17:09:42'),
('Admin', 42, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-10-29 10:06:01', '2019-10-29 10:06:04'),
('Admin', 43, 1, 1, 1, 1, 1, 'Admin', 'Admin', '2019-11-07 15:56:34', '2019-11-07 15:56:44');

-- --------------------------------------------------------

--
-- Table structure for table `usergroups`
--

CREATE TABLE `usergroups` (
  `UserGroupID` bigint(20) NOT NULL,
  `Name` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Description` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `CreatedAt` datetime NOT NULL,
  `UpdatedAt` datetime NOT NULL,
  `Deleted` tinyint(1) NOT NULL,
  `CreatedBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `UpdatedBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB AVG_ROW_LENGTH=2340 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `usergroups`
--

INSERT INTO `usergroups` (`UserGroupID`, `Name`, `Description`, `CreatedAt`, `UpdatedAt`, `Deleted`, `CreatedBy`, `UpdatedBy`) VALUES
(1, 'Admin', 'System Administrators ', '2019-06-13 14:54:49', '2019-11-13 14:31:21', 0, '', 'Admin'),
(2, 'Clercks', 'Clercks', '2019-06-25 10:10:12', '2020-03-17 09:02:36', 0, 'admin', 'Admin'),
(3, 'others', 'tenders,', '2019-07-11 16:19:24', '2019-07-11 16:19:24', 0, 'admin', 'admin'),
(4, 'Portal users', 'Portal Users', '2019-08-16 16:47:04', '2020-03-17 08:56:54', 0, 'Admin', 'Admin'),
(5, 'Officers', 'Officers', '2019-08-27 17:47:15', '2020-03-17 08:56:32', 0, 'Admin', 'Admin'),
(6, 'Finance', 'Finance/Accounts', '2019-11-13 14:33:37', '2019-11-13 14:33:37', 0, 'Admin', 'Admin'),
(7, 'BOARD ROOM !', 'BOARD ROOM !', '2019-09-11 10:47:44', '2019-09-11 10:47:44', 1, 'Admin', 'Admin');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `Name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Username` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Email` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Password` varchar(128) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Phone` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Create_at` datetime NOT NULL,
  `Update_at` datetime DEFAULT NULL,
  `Login_at` datetime DEFAULT NULL,
  `Deleted` tinyint(1) NOT NULL,
  `IsActive` tinyint(1) DEFAULT NULL,
  `IsEmailverified` tinyint(1) DEFAULT NULL,
  `ActivationCode` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `ResetPassword` char(38) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `UserGroupID` bigint(20) DEFAULT NULL,
  `CreatedBy` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `UpdatedBy` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Photo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Category` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Signature` varchar(128) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `IDnumber` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Gender` varchar(50) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `DOB` datetime DEFAULT NULL,
  `ChangePassword` tinyint(1) DEFAULT NULL,
  `Board` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB AVG_ROW_LENGTH=1170 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`Name`, `Username`, `Email`, `Password`, `Phone`, `Create_at`, `Update_at`, `Login_at`, `Deleted`, `IsActive`, `IsEmailverified`, `ActivationCode`, `ResetPassword`, `UserGroupID`, `CreatedBy`, `UpdatedBy`, `Photo`, `Category`, `Signature`, `IDnumber`, `Gender`, `DOB`, `ChangePassword`, `Board`) VALUES
('Kelvin Chemey', 'Admin', 'kelvinchemey@gmail.com', '$2b$10$W5YQ2FfNM3pc7poT7Blpz.Rws/nb6zHPo88EU0C1O0BEIWbrssWH6', '0705555285', '2019-07-12 15:50:56', '2019-11-11 15:11:28', '2019-07-12 15:50:56', 0, 1, 1, 'QDrts', '', 1, 'kim', 'Admin', '1573655832969-download.jpg', 'System_User', '1565251011001-signature.jpg', '31547833', 'Male', '1994-12-31 00:00:00', NULL, 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `audittrails`
--
ALTER TABLE `audittrails`
  ADD PRIMARY KEY (`AuditID`);

--
-- Indexes for table `configurations`
--
ALTER TABLE `configurations`
  ADD PRIMARY KEY (`ID`,`Code`),
  ADD KEY `Configurations_createduser` (`Created_By`),
  ADD KEY `Configurations_Updateduser` (`Updated_By`),
  ADD KEY `Configurations_Users` (`Deleted_By`);

--
-- Indexes for table `educationaldetails`
--
ALTER TABLE `educationaldetails`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `groupaccess`
--
ALTER TABLE `groupaccess`
  ADD PRIMARY KEY (`UserGroupID`,`RoleID`),
  ADD KEY `groupaccess_ibfk_3` (`RoleID`);

--
-- Indexes for table `medicalfacility`
--
ALTER TABLE `medicalfacility`
  ADD PRIMARY KEY (`MedID`);

--
-- Indexes for table `minormedical`
--
ALTER TABLE `minormedical`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `nextofkin`
--
ALTER TABLE `nextofkin`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `parents`
--
ALTER TABLE `parents`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `registration`
--
ALTER TABLE `registration`
  ADD PRIMARY KEY (`IDNumber`),
  ADD UNIQUE KEY `IDNumber` (`IDNumber`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`RoleID`,`RoleName`);

--
-- Indexes for table `siblings`
--
ALTER TABLE `siblings`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `smsdetails`
--
ALTER TABLE `smsdetails`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `smtpdetails`
--
ALTER TABLE `smtpdetails`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `useraccess`
--
ALTER TABLE `useraccess`
  ADD PRIMARY KEY (`Username`,`RoleID`),
  ADD KEY `useraccess_ibfk_2` (`CreateBy`),
  ADD KEY `useraccess_ibfk_3` (`UpdateBy`);

--
-- Indexes for table `usergroups`
--
ALTER TABLE `usergroups`
  ADD PRIMARY KEY (`UserGroupID`),
  ADD UNIQUE KEY `Name` (`Name`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`Username`),
  ADD UNIQUE KEY `Email` (`Email`),
  ADD UNIQUE KEY `MobileNo` (`Phone`),
  ADD UNIQUE KEY `Username` (`Username`),
  ADD UNIQUE KEY `IDNo` (`IDnumber`),
  ADD KEY `users_ibfk_1` (`UserGroupID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `audittrails`
--
ALTER TABLE `audittrails`
  MODIFY `AuditID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=775;

--
-- AUTO_INCREMENT for table `configurations`
--
ALTER TABLE `configurations`
  MODIFY `ID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `educationaldetails`
--
ALTER TABLE `educationaldetails`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `medicalfacility`
--
ALTER TABLE `medicalfacility`
  MODIFY `MedID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `minormedical`
--
ALTER TABLE `minormedical`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `nextofkin`
--
ALTER TABLE `nextofkin`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `parents`
--
ALTER TABLE `parents`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `RoleID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `siblings`
--
ALTER TABLE `siblings`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `smsdetails`
--
ALTER TABLE `smsdetails`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `smtpdetails`
--
ALTER TABLE `smtpdetails`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `usergroups`
--
ALTER TABLE `usergroups`
  MODIFY `UserGroupID` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `groupaccess`
--
ALTER TABLE `groupaccess`
  ADD CONSTRAINT `groupaccess_ibfk_1` FOREIGN KEY (`UserGroupID`) REFERENCES `usergroups` (`UserGroupID`),
  ADD CONSTRAINT `groupaccess_ibfk_2` FOREIGN KEY (`RoleID`) REFERENCES `roles` (`RoleID`),
  ADD CONSTRAINT `groupaccess_ibfk_3` FOREIGN KEY (`RoleID`) REFERENCES `roles` (`RoleID`);

--
-- Constraints for table `useraccess`
--
ALTER TABLE `useraccess`
  ADD CONSTRAINT `useraccess_ibfk_1` FOREIGN KEY (`Username`) REFERENCES `users` (`Username`),
  ADD CONSTRAINT `useraccess_ibfk_2` FOREIGN KEY (`CreateBy`) REFERENCES `users` (`Username`),
  ADD CONSTRAINT `useraccess_ibfk_3` FOREIGN KEY (`UpdateBy`) REFERENCES `users` (`Username`);
--
-- Database: `phpmyadmin`
--
CREATE DATABASE IF NOT EXISTS `phpmyadmin` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `phpmyadmin`;

-- --------------------------------------------------------

--
-- Table structure for table `pma__bookmark`
--

CREATE TABLE `pma__bookmark` (
  `id` int(10) UNSIGNED NOT NULL,
  `dbase` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `user` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `label` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `query` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Bookmarks';

-- --------------------------------------------------------

--
-- Table structure for table `pma__central_columns`
--

CREATE TABLE `pma__central_columns` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_type` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_length` text COLLATE utf8_bin DEFAULT NULL,
  `col_collation` varchar(64) COLLATE utf8_bin NOT NULL,
  `col_isNull` tinyint(1) NOT NULL,
  `col_extra` varchar(255) COLLATE utf8_bin DEFAULT '',
  `col_default` text COLLATE utf8_bin DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Central list of columns';

-- --------------------------------------------------------

--
-- Table structure for table `pma__column_info`
--

CREATE TABLE `pma__column_info` (
  `id` int(5) UNSIGNED NOT NULL,
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `column_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `comment` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `mimetype` varchar(255) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `transformation` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `transformation_options` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `input_transformation` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT '',
  `input_transformation_options` varchar(255) COLLATE utf8_bin NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Column information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__designer_settings`
--

CREATE TABLE `pma__designer_settings` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `settings_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Settings related to Designer';

-- --------------------------------------------------------

--
-- Table structure for table `pma__export_templates`
--

CREATE TABLE `pma__export_templates` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `export_type` varchar(10) COLLATE utf8_bin NOT NULL,
  `template_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `template_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved export templates';

-- --------------------------------------------------------

--
-- Table structure for table `pma__favorite`
--

CREATE TABLE `pma__favorite` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `tables` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Favorite tables';

-- --------------------------------------------------------

--
-- Table structure for table `pma__history`
--

CREATE TABLE `pma__history` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `username` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp(),
  `sqlquery` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='SQL history for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__navigationhiding`
--

CREATE TABLE `pma__navigationhiding` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `item_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `item_type` varchar(64) COLLATE utf8_bin NOT NULL,
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Hidden items of navigation tree';

-- --------------------------------------------------------

--
-- Table structure for table `pma__pdf_pages`
--

CREATE TABLE `pma__pdf_pages` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `page_nr` int(10) UNSIGNED NOT NULL,
  `page_descr` varchar(50) CHARACTER SET utf8 NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='PDF relation pages for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__recent`
--

CREATE TABLE `pma__recent` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `tables` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Recently accessed tables';

--
-- Dumping data for table `pma__recent`
--

INSERT INTO `pma__recent` (`username`, `tables`) VALUES
('root', '[{\"db\":\"majuu\",\"table\":\"registration\"},{\"db\":\"majuu\",\"table\":\"users\"}]');

-- --------------------------------------------------------

--
-- Table structure for table `pma__relation`
--

CREATE TABLE `pma__relation` (
  `master_db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `master_table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `master_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `foreign_db` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `foreign_table` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `foreign_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Relation table';

-- --------------------------------------------------------

--
-- Table structure for table `pma__savedsearches`
--

CREATE TABLE `pma__savedsearches` (
  `id` int(5) UNSIGNED NOT NULL,
  `username` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `search_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `search_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Saved searches';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_coords`
--

CREATE TABLE `pma__table_coords` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `pdf_page_number` int(11) NOT NULL DEFAULT 0,
  `x` float UNSIGNED NOT NULL DEFAULT 0,
  `y` float UNSIGNED NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table coordinates for phpMyAdmin PDF output';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_info`
--

CREATE TABLE `pma__table_info` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT '',
  `display_field` varchar(64) COLLATE utf8_bin NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Table information for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__table_uiprefs`
--

CREATE TABLE `pma__table_uiprefs` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `prefs` text COLLATE utf8_bin NOT NULL,
  `last_update` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Tables'' UI preferences';

-- --------------------------------------------------------

--
-- Table structure for table `pma__tracking`
--

CREATE TABLE `pma__tracking` (
  `db_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `table_name` varchar(64) COLLATE utf8_bin NOT NULL,
  `version` int(10) UNSIGNED NOT NULL,
  `date_created` datetime NOT NULL,
  `date_updated` datetime NOT NULL,
  `schema_snapshot` text COLLATE utf8_bin NOT NULL,
  `schema_sql` text COLLATE utf8_bin DEFAULT NULL,
  `data_sql` longtext COLLATE utf8_bin DEFAULT NULL,
  `tracking` set('UPDATE','REPLACE','INSERT','DELETE','TRUNCATE','CREATE DATABASE','ALTER DATABASE','DROP DATABASE','CREATE TABLE','ALTER TABLE','RENAME TABLE','DROP TABLE','CREATE INDEX','DROP INDEX','CREATE VIEW','ALTER VIEW','DROP VIEW') COLLATE utf8_bin DEFAULT NULL,
  `tracking_active` int(1) UNSIGNED NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Database changes tracking for phpMyAdmin';

-- --------------------------------------------------------

--
-- Table structure for table `pma__userconfig`
--

CREATE TABLE `pma__userconfig` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `timevalue` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `config_data` text COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User preferences storage for phpMyAdmin';

--
-- Dumping data for table `pma__userconfig`
--

INSERT INTO `pma__userconfig` (`username`, `timevalue`, `config_data`) VALUES
('root', '2020-03-23 09:33:58', '{\"Console\\/Mode\":\"collapse\"}');

-- --------------------------------------------------------

--
-- Table structure for table `pma__usergroups`
--

CREATE TABLE `pma__usergroups` (
  `usergroup` varchar(64) COLLATE utf8_bin NOT NULL,
  `tab` varchar(64) COLLATE utf8_bin NOT NULL,
  `allowed` enum('Y','N') COLLATE utf8_bin NOT NULL DEFAULT 'N'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='User groups with configured menu items';

-- --------------------------------------------------------

--
-- Table structure for table `pma__users`
--

CREATE TABLE `pma__users` (
  `username` varchar(64) COLLATE utf8_bin NOT NULL,
  `usergroup` varchar(64) COLLATE utf8_bin NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='Users and their assignments to user groups';

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pma__central_columns`
--
ALTER TABLE `pma__central_columns`
  ADD PRIMARY KEY (`db_name`,`col_name`);

--
-- Indexes for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `db_name` (`db_name`,`table_name`,`column_name`);

--
-- Indexes for table `pma__designer_settings`
--
ALTER TABLE `pma__designer_settings`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_user_type_template` (`username`,`export_type`,`template_name`);

--
-- Indexes for table `pma__favorite`
--
ALTER TABLE `pma__favorite`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__history`
--
ALTER TABLE `pma__history`
  ADD PRIMARY KEY (`id`),
  ADD KEY `username` (`username`,`db`,`table`,`timevalue`);

--
-- Indexes for table `pma__navigationhiding`
--
ALTER TABLE `pma__navigationhiding`
  ADD PRIMARY KEY (`username`,`item_name`,`item_type`,`db_name`,`table_name`);

--
-- Indexes for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  ADD PRIMARY KEY (`page_nr`),
  ADD KEY `db_name` (`db_name`);

--
-- Indexes for table `pma__recent`
--
ALTER TABLE `pma__recent`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__relation`
--
ALTER TABLE `pma__relation`
  ADD PRIMARY KEY (`master_db`,`master_table`,`master_field`),
  ADD KEY `foreign_field` (`foreign_db`,`foreign_table`);

--
-- Indexes for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `u_savedsearches_username_dbname` (`username`,`db_name`,`search_name`);

--
-- Indexes for table `pma__table_coords`
--
ALTER TABLE `pma__table_coords`
  ADD PRIMARY KEY (`db_name`,`table_name`,`pdf_page_number`);

--
-- Indexes for table `pma__table_info`
--
ALTER TABLE `pma__table_info`
  ADD PRIMARY KEY (`db_name`,`table_name`);

--
-- Indexes for table `pma__table_uiprefs`
--
ALTER TABLE `pma__table_uiprefs`
  ADD PRIMARY KEY (`username`,`db_name`,`table_name`);

--
-- Indexes for table `pma__tracking`
--
ALTER TABLE `pma__tracking`
  ADD PRIMARY KEY (`db_name`,`table_name`,`version`);

--
-- Indexes for table `pma__userconfig`
--
ALTER TABLE `pma__userconfig`
  ADD PRIMARY KEY (`username`);

--
-- Indexes for table `pma__usergroups`
--
ALTER TABLE `pma__usergroups`
  ADD PRIMARY KEY (`usergroup`,`tab`,`allowed`);

--
-- Indexes for table `pma__users`
--
ALTER TABLE `pma__users`
  ADD PRIMARY KEY (`username`,`usergroup`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pma__bookmark`
--
ALTER TABLE `pma__bookmark`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__column_info`
--
ALTER TABLE `pma__column_info`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__export_templates`
--
ALTER TABLE `pma__export_templates`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__history`
--
ALTER TABLE `pma__history`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__pdf_pages`
--
ALTER TABLE `pma__pdf_pages`
  MODIFY `page_nr` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pma__savedsearches`
--
ALTER TABLE `pma__savedsearches`
  MODIFY `id` int(5) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- Database: `test`
--
CREATE DATABASE IF NOT EXISTS `test` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `test`;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
