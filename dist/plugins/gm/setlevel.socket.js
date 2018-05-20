"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const game_state_1 = require("../../core/game-state");
const commands_1 = require("./commands");
const logger_1 = require("../../shared/logger");
exports.event = 'plugin:gm:setlevel';
exports.description = 'Mod only. Set a players level.';
exports.args = 'targetName, targetLevel';
exports.socket = (socket) => {
    const setlevel = ({ targetName, targetLevel }) => __awaiter(this, void 0, void 0, function* () {
        if (!socket.authToken)
            return;
        const { playerName } = socket.authToken;
        const player = game_state_1.GameState.getInstance().getPlayer(playerName);
        if (!player || !player.isMod || !targetName)
            return;
        targetLevel = +targetLevel;
        if (_.isNaN(targetLevel))
            return;
        logger_1.Logger.info('Socket:GM:SetLevel', `${playerName} (${socket.address.ip}) setting level ${targetLevel} on ${targetName}.`);
        commands_1.GMCommands.setLevel(targetName, targetLevel);
    });
    socket.on(exports.event, setlevel);
};