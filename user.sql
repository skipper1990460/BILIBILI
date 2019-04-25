/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 50724
 Source Host           : localhost:3306
 Source Schema         : bili

 Target Server Type    : MySQL
 Target Server Version : 50724
 File Encoding         : 65001

 Date: 25/04/2019 14:57:28
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user`  (
  `UserAdmin` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `UserPassword` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `UserName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `UserImgUrl` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  `UserB` float(255, 0) NULL DEFAULT NULL,
  `UserCoin` float(255, 0) NULL DEFAULT NULL,
  `UserDynamic` int(255) NULL DEFAULT NULL,
  `UserFollow` int(255) NULL DEFAULT NULL,
  `UserFans` int(255) NULL DEFAULT NULL,
  PRIMARY KEY (`UserAdmin`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('admin', '123456', 'B站用户', 'image/15239494106.jpg', 0, 0, 0, 0, 0);
INSERT INTO `user` VALUES ('root', '123456', 'B站用户', 'image/root.jpg', 0, 375, 5, 55, 22);

SET FOREIGN_KEY_CHECKS = 1;
