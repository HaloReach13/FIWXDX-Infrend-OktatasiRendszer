-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Gép: localhost
-- Létrehozás ideje: 2026. Máj 24. 19:10
-- Kiszolgáló verziója: 10.4.32-MariaDB
-- PHP verzió: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Adatbázis: `educational-record-system`
--

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `administrator`
--

CREATE TABLE `administrator` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `administrator`
--

INSERT INTO `administrator` (`id`, `firstName`, `lastName`, `email`, `password`) VALUES
(5, 'Példa', 'Béla', 'user@example.com', '$2b$12$.LI9wzgGEniDOC5qABZhRe65wAjnB/UvRI.tNyUJWasWuaicV464.');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `course`
--

CREATE TABLE `course` (
  `id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `subjectId` int(11) DEFAULT NULL,
  `semester` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `course`
--

INSERT INTO `course` (`id`, `year`, `subjectId`, `semester`) VALUES
(1, 2025, 1, 1),
(2, 2025, 2, 1),
(3, 2026, 3, 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `instructor`
--

CREATE TABLE `instructor` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `department` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `instructor`
--

INSERT INTO `instructor` (`id`, `firstName`, `lastName`, `email`, `department`) VALUES
(1, 'Gábor', 'Dr. Szabó', 'gabor.szabo@egyetem.hu', 'Informatikai Tanszék'),
(2, 'Ilona', 'Nagy', 'ilona.nagy@egyetem.hu', 'Matematikai Intézet');

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `instructor_subjects_subject`
--

CREATE TABLE `instructor_subjects_subject` (
  `instructorId` int(11) NOT NULL,
  `subjectId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `instructor_subjects_subject`
--

INSERT INTO `instructor_subjects_subject` (`instructorId`, `subjectId`) VALUES
(1, 1),
(1, 3),
(2, 2);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `student`
--

CREATE TABLE `student` (
  `id` int(11) NOT NULL,
  `neptunCode` varchar(255) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `class` varchar(255) NOT NULL,
  `currentSemester` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `student`
--

INSERT INTO `student` (`id`, `neptunCode`, `firstName`, `lastName`, `email`, `class`, `currentSemester`) VALUES
(1, 'ABC123', 'Bence', 'Kovács', 'bence.kovacs@stud.hu', 'PTI-BSc-1', 2),
(2, 'XYZ789', 'Anna', 'Tóth', 'anna.toth@stud.hu', 'PTI-BSc-1', 2),
(3, 'QWE456', 'Péter', 'Kiss', 'peter.kiss@stud.hu', 'MER-BSc-2', 4),
(6, 'FIWXDX', 'Balázs', 'Juhász', 'juhaszbazsi13@gmail.com', 'BPROF', 4);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `student_course`
--

CREATE TABLE `student_course` (
  `id` int(11) NOT NULL,
  `grade` int(11) DEFAULT NULL,
  `studentId` int(11) DEFAULT NULL,
  `courseId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `student_course`
--

INSERT INTO `student_course` (`id`, `grade`, `studentId`, `courseId`) VALUES
(1, 5, 1, 1),
(2, 3, 1, 2),
(3, 4, 2, 1),
(4, 5, 2, 3),
(5, 2, 3, 2),
(7, 5, 6, 1);

-- --------------------------------------------------------

--
-- Tábla szerkezet ehhez a táblához `subject`
--

CREATE TABLE `subject` (
  `id` int(11) NOT NULL,
  `code` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `credits` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_hungarian_ci;

--
-- A tábla adatainak kiíratása `subject`
--

INSERT INTO `subject` (`id`, `code`, `name`, `credits`) VALUES
(1, 'IP-18PROG1G', 'Programozás alapjai', 5),
(2, 'IK-18AN1G', 'Analízis I.', 4),
(3, 'IP-18WEB1G', 'Webfejlesztés I.', 3);

--
-- Indexek a kiírt táblákhoz
--

--
-- A tábla indexei `administrator`
--
ALTER TABLE `administrator`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `IDX_be0ce9bef56d5a30b9e5752564` (`email`);

--
-- A tábla indexei `course`
--
ALTER TABLE `course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_33b8f63c3518fa33a82e3779253` (`subjectId`);

--
-- A tábla indexei `instructor`
--
ALTER TABLE `instructor`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `instructor_subjects_subject`
--
ALTER TABLE `instructor_subjects_subject`
  ADD PRIMARY KEY (`instructorId`,`subjectId`),
  ADD KEY `IDX_6e99ec8757bd1df64f0f744b7d` (`instructorId`),
  ADD KEY `IDX_55b69524f65f5960e0c3b6b4da` (`subjectId`);

--
-- A tábla indexei `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`id`);

--
-- A tábla indexei `student_course`
--
ALTER TABLE `student_course`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK_fe1f74de2fd433ac16a7260d268` (`studentId`),
  ADD KEY `FK_01b917cdbb6a420e3857788da1b` (`courseId`);

--
-- A tábla indexei `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id`);

--
-- A kiírt táblák AUTO_INCREMENT értéke
--

--
-- AUTO_INCREMENT a táblához `administrator`
--
ALTER TABLE `administrator`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT a táblához `course`
--
ALTER TABLE `course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT a táblához `instructor`
--
ALTER TABLE `instructor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT a táblához `student`
--
ALTER TABLE `student`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT a táblához `student_course`
--
ALTER TABLE `student_course`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT a táblához `subject`
--
ALTER TABLE `subject`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Megkötések a kiírt táblákhoz
--

--
-- Megkötések a táblához `course`
--
ALTER TABLE `course`
  ADD CONSTRAINT `FK_33b8f63c3518fa33a82e3779253` FOREIGN KEY (`subjectId`) REFERENCES `subject` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;

--
-- Megkötések a táblához `instructor_subjects_subject`
--
ALTER TABLE `instructor_subjects_subject`
  ADD CONSTRAINT `FK_55b69524f65f5960e0c3b6b4da6` FOREIGN KEY (`subjectId`) REFERENCES `subject` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_6e99ec8757bd1df64f0f744b7d4` FOREIGN KEY (`instructorId`) REFERENCES `instructor` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Megkötések a táblához `student_course`
--
ALTER TABLE `student_course`
  ADD CONSTRAINT `FK_01b917cdbb6a420e3857788da1b` FOREIGN KEY (`courseId`) REFERENCES `course` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_fe1f74de2fd433ac16a7260d268` FOREIGN KEY (`studentId`) REFERENCES `student` (`id`) ON DELETE CASCADE ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
