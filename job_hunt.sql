-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2019 at 10:59 AM
-- Server version: 10.4.6-MariaDB
-- PHP Version: 7.3.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `job_hunt`
--

-- --------------------------------------------------------

--
-- Table structure for table `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `category`
--

INSERT INTO `category` (`id`, `name`) VALUES
(6, 'Marketing'),
(7, 'Information Technology');

-- --------------------------------------------------------

--
-- Table structure for table `company`
--

CREATE TABLE `company` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `logo` varchar(100) NOT NULL,
  `location` varchar(100) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `company`
--

INSERT INTO `company` (`id`, `name`, `logo`, `location`, `description`) VALUES
('0b8d90f2-58e2-47eb-ad77-cd7bc84d441a', 'PT. SOS INDONESIA', '', 'Jakarta', 'Welcome to PT. SOS Indonesia Careers Page'),
('69f3ed01-b898-43c8-8c7b-3b43ece1d9dc', 'PT. NETINDO SOLUTION GROUP', '', 'Yogyakarta', 'Welcome to PT. NETINDO SOLUTION GROUP Careers Page'),
('91504a3f-7a7a-4d0a-86d3-31466bbfa2dc', 'DEZIRE TECHNOLOGIES', '', 'Jakarta', 'DEZIRE TECHNOLOGIES description'),
('d5de1b35-0d35-459e-9803-f380be105171', 'Kata.ai', '', 'Jakarta', 'Welcome to Kata.ai Careers Page'),
('f786d43e-b43a-4711-a744-7f2871bf5ad8', 'SUZANA RADIO NETWORK', '', 'Surabaya', 'SUZANA RADIO NETWORK description');

-- --------------------------------------------------------

--
-- Table structure for table `job`
--

CREATE TABLE `job` (
  `id` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `category` int(11) NOT NULL,
  `salary` int(10) NOT NULL,
  `location` varchar(100) NOT NULL,
  `company` varchar(100) NOT NULL,
  `date_added` datetime NOT NULL,
  `date_updated` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `job`
--

INSERT INTO `job` (`id`, `name`, `description`, `category`, `salary`, `location`, `company`, `date_added`, `date_updated`) VALUES
('35d67d0b-08be-4c31-8657-e54e64970c57', 'Software Engineer3', 'Syarat\n\n• You have earned a B.S. or M.S. in Computer Science or a related field.\n• Demonstrable analytical skills, reasoning and problem-solving skills.\n• 3+ years building applications for the web using ASP.Net and VB.Net resp. C# programing language.\n• You should be well experienced with HTML5/CSS, Javascript, JQuery and Bootstrap in general and concept of OOP/OOD, polymorphism and encapsulation.\n• It would wonderful if you have experience SQL (MSSQL or MySQL preferably), but if not, you will certainly gain exposure here.\n• Experience with React, Angular or other Javascript libraries, resp. frameworks is plus.\n• Experience writing unit tests and testable code.\n• Good interpersonal skills with strong oral and written communication skills enabling easy communication of technical knowledge to non-technical people.\n• Strong desire to learn, with intellectual curiosity and proactivity, yet able to execute independently with minimal guidance or collaborate with others in a team.', 7, 10000000, 'Jakarta', '91504a3f-7a7a-4d0a-86d3-31466bbfa2dc', '2019-10-28 21:13:41', '2019-11-08 00:50:46'),
('50186eb6-58bc-4e07-904c-811d52957d1d', 'IT Developer', 'Work with developers to design algorithms and flowcharts\nProduce clean, efficient code based on specifications\nIntegrate software components and third-party programs\nVerify and deploy programs and systems\nTroubleshoot, debug and upgrade existing software\nGather and evaluate user feedback\nRecommend and execute improvements\nCreate technical documentation for reference and reporting', 6, 7000000, 'Jakarta', '0b8d90f2-58e2-47eb-ad77-cd7bc84d441a', '2019-10-28 21:15:33', '2019-11-07 18:24:13'),
('6560eda6-f1c5-4b02-b0c6-4cf04e823b57', 'BACKEND DEVELOPER\n', '- Develop and designing relevant code on project needs\n- Create structure database\n- Create API\n- Create a full web apps if application has no api\n- Mentoring junior developers\n- Create test driven environment for relevant projects', 7, 10000000, 'Yogyakarta', '69f3ed01-b898-43c8-8c7b-3b43ece1d9dc', '2019-10-28 21:18:22', '2019-10-28 21:18:22'),
('a34de01d-f5b4-4dd6-9f4c-86db0605d11f', 'BACKEND DEVELOPER\n', '- Develop and designing relevant code on project needs\n- Create structure database\n- Create API\n- Create a full web apps if application has no api\n- Mentoring junior developers\n- Create test driven environment for relevant projects', 7, 10000000, 'Yogyakarta', '0b8d90f2-58e2-47eb-ad77-cd7bc84d441a', '2019-10-31 11:52:39', '2019-10-31 11:52:39');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` varchar(100) NOT NULL,
  `email` varchar(50) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `name` varchar(50) NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `email`, `user_name`, `name`, `password`) VALUES
('cd51a092-3f43-4400-83a9-e359cf7c9ba3', '123@123.com', '123', 'Adit', '$2b$10$67M5sdqy9VV9lGlZlGJUM.xlWdMThV/uvutefYonzZT0eQsCPpnBu');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `company`
--
ALTER TABLE `company`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `job`
--
ALTER TABLE `job`
  ADD PRIMARY KEY (`id`),
  ADD KEY `category` (`category`),
  ADD KEY `company` (`company`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`user_name`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `job`
--
ALTER TABLE `job`
  ADD CONSTRAINT `job_category` FOREIGN KEY (`category`) REFERENCES `category` (`id`),
  ADD CONSTRAINT `job_company` FOREIGN KEY (`company`) REFERENCES `company` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
