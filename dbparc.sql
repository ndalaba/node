-- phpMyAdmin SQL Dump
-- version 4.7.0
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  sam. 16 sep. 2017 à 14:25
-- Version du serveur :  10.1.24-MariaDB
-- Version de PHP :  7.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `db_node`
--

-- --------------------------------------------------------

--
-- Structure de la table `brands`
--

CREATE TABLE `brands` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `brands`
--

INSERT INTO `brands` (`id`, `name`) VALUES
(39, ' \nFiat'),
(85, ' \nPGO'),
(104, ' \nSubaru'),
(6, ' Abarth'),
(7, ' AC'),
(8, ' Aixam'),
(9, ' Alfa Romeo'),
(10, ' Alpina'),
(11, ' Aston Martin'),
(12, ' Auburn'),
(13, ' Audi'),
(14, ' Austin'),
(15, ' Austin Morris'),
(16, ' Bedford'),
(17, ' Bentley'),
(18, ' BMW'),
(19, ' Buick'),
(20, ' Cadillac'),
(21, ' Can am'),
(22, ' Casalini'),
(23, ' Caterham\nChatenet'),
(24, ' Chevrolet'),
(25, ' Chrysler'),
(26, ' Citroen'),
(27, ' Cobra'),
(28, ' Corvette'),
(29, ' Dacia'),
(30, ' Daewoo'),
(31, ' DAF'),
(32, ' Daihatsu'),
(33, ' Daimler'),
(34, ' De Lorean Delahaye'),
(35, ' Dodge'),
(36, ' Donkervoort'),
(37, ' DS'),
(38, ' Ferrari'),
(40, ' Ford'),
(41, ' GMC'),
(42, ' Harley-Davidson'),
(43, ' Heinkel'),
(44, ' Honda'),
(45, ' Hummer'),
(46, ' Hyundai'),
(47, ' Infiniti'),
(48, ' Isuzu'),
(49, ' Iveco'),
(50, ' Jaguar'),
(51, ' Jeep'),
(52, ' Kawasaki'),
(53, ' Kia'),
(54, ' KTM'),
(55, ' Kymco'),
(56, ' Lada'),
(57, ' Lamborghini'),
(58, ' Lancia'),
(59, ' Land rover'),
(60, ' Lexus'),
(61, ' Ligier'),
(62, ' Lincoln'),
(66, ' Marcos'),
(67, ' Maserati'),
(68, ' Maybach'),
(70, ' Mercedes-Benz'),
(71, ' Mercury'),
(72, ' MG'),
(73, ' Microcar'),
(74, ' MINI'),
(75, ' Mitsubishi'),
(76, ' Morgan'),
(77, ' MV Agusta'),
(78, ' Nash'),
(79, ' NG'),
(80, ' Nissan'),
(81, ' Oldsmobile'),
(82, ' Opel'),
(83, ' Osca'),
(84, ' Peugeot'),
(86, ' Piaggio'),
(87, ' Plymouth'),
(88, ' Pontiac'),
(89, ' Porsche'),
(90, ' Proton'),
(91, ' Range Rover'),
(92, ' Renault'),
(93, ' Rolls-Royce'),
(94, ' Rover'),
(95, ' Saab'),
(96, ' Seat'),
(97, ' Secma'),
(98, ' Simca'),
(99, ' Skoda'),
(100, ' Smart'),
(101, ' Sonstige'),
(102, ' SsangYong'),
(103, ' Studebaker'),
(105, ' Suzuki'),
(106, ' Sym'),
(107, ' Talbot'),
(108, ' Tesla'),
(109, ' Toyota'),
(110, ' Triumph'),
(111, ' TVR'),
(112, ' Vauxhall'),
(113, ' Vespa'),
(114, ' Volkswagen'),
(115, ' Volvo'),
(116, ' Yamaha'),
(4, 'Honda'),
(65, 'Lotus'),
(5, 'Mazda');

-- --------------------------------------------------------

--
-- Structure de la table `cars`
--

CREATE TABLE `cars` (
  `id` int(11) NOT NULL,
  `identifiant` varchar(255) NOT NULL,
  `color` varchar(255) DEFAULT NULL,
  `release_year` datetime DEFAULT NULL,
  `fuel` varchar(255) DEFAULT NULL,
  `transmission` varchar(255) DEFAULT NULL,
  `mileage` int(11) DEFAULT NULL,
  `wheel` int(11) DEFAULT NULL,
  `pol` varchar(255) DEFAULT NULL,
  `pod` varchar(255) DEFAULT NULL,
  `origin` varchar(255) DEFAULT NULL,
  `customer_id` int(11) DEFAULT NULL,
  `model_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `customers`
--

CREATE TABLE `customers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `identity_type` enum('Passeport','Carte d''identité','Titre de sejour') DEFAULT NULL,
  `identity_number` varchar(255) DEFAULT NULL,
  `identity_delivred` datetime DEFAULT NULL,
  `identity_expire` datetime DEFAULT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `driver_licence` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `models`
--

CREATE TABLE `models` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `brand_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20170907113855-create-user.js'),
('20170909110602-create-brand.js'),
('20170909111413-create-model.js'),
('20170909112932-create-customer.js'),
('20170909114038-create-car.js');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `lastLogin` datetime DEFAULT NULL,
  `roles` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `phone`, `password`, `photo`, `lastLogin`, `roles`, `createdAt`, `updatedAt`) VALUES
(33, 'N\'Dalaba Diallo', 'ndalaba@gmail.com', '768515886', '045d41422d18489d9872ecc885188dd24cbbce1b82be33b8b4ee2923e9bde9e9', 'photos/photo-1505047392631-user.png', '2017-09-16 12:22:33', 'ROLE_ADMIN', '2017-09-07 15:01:48', '2017-09-16 12:22:33'),
(35, 'Mamadou N\'Dalaba Diallo', 'contact@toutsaufalpha.org', '', '805420aafb3bb29ed3cac32970fb53708419aeb6ef40764c936990bdf538c3a9', 'photos/photo-1505046813717-Alpha-Condé-et-Lansana-Conté.jpg', NULL, 'ROLE_USER', '2017-09-07 15:08:31', '2017-09-10 12:33:33');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `brand` (`name`);

--
-- Index pour la table `cars`
--
ALTER TABLE `cars`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `identifiant` (`identifiant`),
  ADD KEY `customer_id` (`customer_id`),
  ADD KEY `model_id` (`model_id`);

--
-- Index pour la table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `models`
--
ALTER TABLE `models`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `model` (`name`),
  ADD KEY `brand_id` (`brand_id`);

--
-- Index pour la table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`),
  ADD UNIQUE KEY `SequelizeMeta_name_unique` (`name`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `brands`
--
ALTER TABLE `brands`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=118;
--
-- AUTO_INCREMENT pour la table `cars`
--
ALTER TABLE `cars`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `models`
--
ALTER TABLE `models`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `cars`
--
ALTER TABLE `cars`
  ADD CONSTRAINT `cars_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `cars_ibfk_2` FOREIGN KEY (`model_id`) REFERENCES `models` (`id`) ON DELETE CASCADE;

--
-- Contraintes pour la table `models`
--
ALTER TABLE `models`
  ADD CONSTRAINT `models_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
