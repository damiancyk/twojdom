-- phpMyAdmin SQL Dump
-- version 3.4.5
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Czas wygenerowania: 26 Paź 2012, 10:06
-- Wersja serwera: 5.5.16
-- Wersja PHP: 5.3.8

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Baza danych: `baza_twojdom`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla  `dom`
--

CREATE TABLE IF NOT EXISTS `dom` (
  `Id_Dom` int(11) NOT NULL AUTO_INCREMENT,
  `Nazwa` varchar(255) COLLATE utf8_polish_ci NOT NULL,
  `Cena` int(11) DEFAULT NULL,
  `Jednorodzinny` tinyint(1) NOT NULL,
  `Kondygnacji` int(11) NOT NULL,
  `Powierzchnia` int(11) NOT NULL,
  `Opis` mediumtext COLLATE utf8_polish_ci,
  PRIMARY KEY (`Id_Dom`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=6 ;

--
-- Zrzut danych tabeli `dom`
--

INSERT INTO `dom` (`Id_Dom`, `Nazwa`, `Cena`, `Jednorodzinny`, `Kondygnacji`, `Powierzchnia`, `Opis`) VALUES
(1, 'jednorodzinny domek', 4000, 1, 1, 70, 'domek o niewielkich rozmiarach'),
(2, 'kolejny jednorodzinny domek', 5000, 1, 2, 120, 'dom dla 3 osob, jednopietrowy, bardzo male rozmiary'),
(3, 'jednorodzinny domek ', 6000, 1, 2, 135, 'dom dla 3-6 osob, dosyc maly'),
(4, 'przecietny dom', 8000, 1, 2, 150, 'sredniej wielkosci dom'),
(5, 'blizniak', 11000, 0, 2, 210, 'dom dla dwoch rodzin, dosyc male wymiary');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

--
-- Struktura tabeli dla  `zamowienie`
--

CREATE TABLE IF NOT EXISTS `zamowienie` (
  `Id_Zamowienie` int(11) NOT NULL AUTO_INCREMENT,
  `Numer` int(11),
  `Imie` varchar(255) COLLATE utf8_polish_ci,
  `Adres` varchar(255) COLLATE utf8_polish_ci,
  `Wiadomosc` mediumtext COLLATE utf8_polish_ci,
  PRIMARY KEY (`Id_Zamowienie`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_polish_ci AUTO_INCREMENT=6 ;
