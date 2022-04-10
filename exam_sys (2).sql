-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 10, 2022 at 03:31 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 7.4.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `exam_sys`
--

-- --------------------------------------------------------

--
-- Table structure for table `candidate_answer`
--

CREATE TABLE `candidate_answer` (
  `id` int(11) NOT NULL,
  `question_bank_id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `question_child_id` int(11) NOT NULL,
  `serial_no` int(8) NOT NULL,
  `candidate_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `candidate_answer`
--

INSERT INTO `candidate_answer` (`id`, `question_bank_id`, `question_id`, `question_child_id`, `serial_no`, `candidate_id`) VALUES
(2, 1, 2, 1, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `question_bank`
--

CREATE TABLE `question_bank` (
  `id` int(11) NOT NULL,
  `take_duration` int(11) DEFAULT NULL,
  `examine_id` int(11) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `question_bank`
--

INSERT INTO `question_bank` (`id`, `take_duration`, `examine_id`, `createdAt`) VALUES
(1, 80, 1, '2022-04-09 11:37:40'),
(2, 50, 1, '2022-04-09 11:18:24'),
(3, 50, 1, '2022-04-09 11:20:32'),
(4, 80, 1, '2022-04-09 11:37:05');

-- --------------------------------------------------------

--
-- Table structure for table `question_chld`
--

CREATE TABLE `question_chld` (
  `id` int(11) NOT NULL,
  `question_id` int(11) NOT NULL,
  `answer_char` varchar(10) NOT NULL,
  `answer` varchar(150) NOT NULL,
  `isRihgtAnswer` int(6) NOT NULL COMMENT '1=for right,2=for wrong'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `question_chld`
--

INSERT INTO `question_chld` (`id`, `question_id`, `answer_char`, `answer`, `isRihgtAnswer`) VALUES
(1, 1, 'B', '', 1);

-- --------------------------------------------------------

--
-- Table structure for table `question_mst`
--

CREATE TABLE `question_mst` (
  `id` int(11) NOT NULL,
  `question_bank_id` int(11) NOT NULL,
  `question_name` varchar(250) NOT NULL,
  `answer_take_time` int(11) DEFAULT NULL,
  `question_type` int(11) NOT NULL COMMENT '1 for single answer 2 multiple Answer',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `question_mst`
--

INSERT INTO `question_mst` (`id`, `question_bank_id`, `question_name`, `answer_take_time`, `question_type`, `createdAt`) VALUES
(1, 1, 'question12', 90, 1, '2022-04-10 01:14:57');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` int(2) NOT NULL COMMENT '1 for candidate 2 for Examne',
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `role`, `createdAt`) VALUES
(1, 'duruliu72@gmail.com', 'duruliu72@gmail.com', '$2b$10$JlJWEVtVxGR/Cza/uudFJuMw1qvikDuPXB7AXzt.2d9UQnx/b5XnW', 2, '2022-04-10 10:10:56'),
(2, 'kulsumakternitu@gmail.com', 'kulsumakternitu@gmail.com', '$2b$10$/j.eGElKWJJWc1RtT007ZuqFdUYXKzgrFkoeIZTV8giV7WUIrPh6O', 1, '2022-04-10 10:11:38');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `candidate_answer`
--
ALTER TABLE `candidate_answer`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `question_bank`
--
ALTER TABLE `question_bank`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `question_chld`
--
ALTER TABLE `question_chld`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `question_mst`
--
ALTER TABLE `question_mst`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `candidate_answer`
--
ALTER TABLE `candidate_answer`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `question_bank`
--
ALTER TABLE `question_bank`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `question_chld`
--
ALTER TABLE `question_chld`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `question_mst`
--
ALTER TABLE `question_mst`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
