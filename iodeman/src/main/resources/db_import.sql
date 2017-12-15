-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- Client: localhost
-- Généré le: Ven 15 Décembre 2017 à 10:56
-- Version du serveur: 5.5.53-0ubuntu0.14.04.1
-- Version de PHP: 5.5.9-1ubuntu4.20

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de données: `possi`
--

-- --------------------------------------------------------

--
-- Structure de la table `OralDefense`
--

CREATE TABLE IF NOT EXISTS `OralDefense` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `period_from` datetime DEFAULT NULL,
  `period_to` datetime DEFAULT NULL,
  `composition_id` int(11) DEFAULT NULL,
  `room_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1 AUTO_INCREMENT=1 ;

-- --------------------------------------------------------

--
-- Structure de la table `OralDefense_Person`
--

CREATE TABLE IF NOT EXISTS `OralDefense_Person` (
  `OralDefense_id` int(11) NOT NULL,
  `jury_id` int(11) NOT NULL,
  UNIQUE KEY `UK_126nct891q2djfppa7g1u2xsm` (`jury_id`),
  KEY `FK_10echxb31eq8t5ja7atvcwxne` (`OralDefense_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Participant`
--

CREATE TABLE IF NOT EXISTS `Participant` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `company` varchar(255) DEFAULT NULL,
  `tutorFullName` varchar(255) DEFAULT NULL,
  `followingTeacher_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_dkb3i0k52t17ia9y3bwowkxyq` (`followingTeacher_id`),
  KEY `FK_lx95h44llarxeqc60w06h3p9g` (`student_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=1621 ;


-- --------------------------------------------------------

--
-- Structure de la table `Person`
--

CREATE TABLE IF NOT EXISTS `Person` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `firstName` varchar(255) DEFAULT NULL,
  `lastName` varchar(255) DEFAULT NULL,
  `promo` varchar(255) DEFAULT NULL,
  `role` int(11) DEFAULT NULL,
  `uid` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uid` (`uid`),
  UNIQUE KEY `uid_2` (`uid`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=262 ;

-- --------------------------------------------------------

--
-- Structure de la table `Planning`
--

CREATE TABLE IF NOT EXISTS `Planning` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dayPeriod_from` datetime DEFAULT NULL,
  `dayPeriod_to` datetime DEFAULT NULL,
  `lunchBreak_from` datetime DEFAULT NULL,
  `lunchBreak_to` datetime DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `csv_file` varchar(255) DEFAULT NULL,
  `nbMaxOralDefensePerDay` int(11) DEFAULT NULL,
  `oralDefenseDuration` int(11) DEFAULT NULL,
  `oralDefenseInterlude` int(11) DEFAULT NULL,
  `period_from` datetime DEFAULT NULL,
  `period_to` datetime DEFAULT NULL,
  `admin_id` int(11) DEFAULT NULL,
  `is_ref` int(11) NOT NULL DEFAULT '1',
  `ref_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_8tqc9ue3h6pc3957or2kvtvyi` (`admin_id`),
  KEY `FK_T_Parent` (`ref_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=84 ;

-- --------------------------------------------------------

--
-- Structure de la table `Planning_OralDefense`
--

CREATE TABLE IF NOT EXISTS `Planning_OralDefense` (
  `Planning_id` int(11) NOT NULL,
  `oralDefenses_id` int(11) NOT NULL,
  UNIQUE KEY `UK_8mnh5evri5p2d5q3sgsxg0kmr` (`oralDefenses_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Planning_Participant`
--

CREATE TABLE IF NOT EXISTS `Planning_Participant` (
  `Planning_id` int(11) NOT NULL,
  `participants_id` int(11) NOT NULL,
  KEY `FK_rqbkpq95t1d12slxr3v78asmi` (`Planning_id`),
  KEY `FK_s42tarl5lx94tko1eped2u5pk` (`participants_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Planning_Priority`
--

CREATE TABLE IF NOT EXISTS `Planning_Priority` (
  `Planning_id` int(11) NOT NULL,
  `priorities_id` int(11) NOT NULL,
  UNIQUE KEY `UK_9lq27xlxn2kvsexyij18787x4` (`priorities_id`),
  KEY `FK_h4xl0c5tb4eurcwjqvtbia6a8` (`Planning_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Planning_Room`
--

CREATE TABLE IF NOT EXISTS `Planning_Room` (
  `Planning_id` int(11) NOT NULL,
  `rooms_id` int(11) NOT NULL,
  KEY `FK_ie8528q2bejmunj1eow8yopk3` (`rooms_id`),
  KEY `FK_oqrfu3rtpien6u6p5rypnar5o` (`Planning_id`)
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `Priority`
--

CREATE TABLE IF NOT EXISTS `Priority` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `role` varchar(255) NOT NULL,
  `weight` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=184 ;

-- --------------------------------------------------------

--
-- Structure de la table `Room`
--

CREATE TABLE IF NOT EXISTS `Room` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=12 ;

-- --------------------------------------------------------

--
-- Structure de la table `Unavailability`
--

CREATE TABLE IF NOT EXISTS `Unavailability` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `period_from` datetime DEFAULT NULL,
  `period_to` datetime DEFAULT NULL,
  `person_id` int(11) DEFAULT NULL,
  `planning_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_unavailability` (`period_from`,`period_to`,`person_id`,`planning_id`),
  KEY `FK_6ce604re8yiloyaykagtal1a9` (`person_id`),
  KEY `FK_g124xuytixfqxf0i75snxogus` (`planning_id`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=858 ;

--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `OralDefense_Person`
--
ALTER TABLE `OralDefense_Person`
  ADD CONSTRAINT `FK_10echxb31eq8t5ja7atvcwxne` FOREIGN KEY (`OralDefense_id`) REFERENCES `OralDefense` (`id`);

--
-- Contraintes pour la table `Planning_OralDefense`
--
ALTER TABLE `Planning_OralDefense`
  ADD CONSTRAINT `FK_8mnh5evri5p2d5q3sgsxg0kmr` FOREIGN KEY (`oralDefenses_id`) REFERENCES `OralDefense` (`id`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;