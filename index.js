'use strict'
const JOB_BRAWLER = 10;
const SKILL_HAYMAKER = 60901;
const SKILL_HAYMAKER_2 = 60930;
const SKILL_HAYMAKER_3 = 60902;
const SKILL_HAYMAKER_4 = 60931;
const SKILL_HAYMAKER_5 = 60941;
const SKILL_HAYMAKER_6 = 60961;
const SKILL_HAYMAKER_7 = 60951;
const SKILL_HAYMAKER_DURATION = 2850;
const SKILL_HAYMAKER_DISTANCE = 0;
const SKILL_HAYMAKER_STAGE_DELAY = 1020;
const SKILL_GROUNDPOUND = 41100;
const SKILL_GROUNDPOUND_2 = 41130;
const SKILL_GROUNDPOUND_DURATION = 3223;
const SKILL_PILEDRIVER = 81001;
const SKILL_PILEDRIVER_2 = 81030;
const SKILL_PILEDRIVER_3 = 81002;
const SKILL_PILEDRIVER_4 = 81031;
const SKILL_PILEDRIVER_5 = 81000;
const SKILL_PILEDRIVER_DURATION = 1955;
const SKILL_PILEDRIVER_DISTANCE = 0;
const SKILL_JACKHAMMER = 91001;
const SKILL_JACKHAMMER_2 = 91030;
const SKILL_JACKHAMMER_3 = 91002;
const SKILL_JACKHAMMER_4 = 91031;
const SKILL_JACKHAMMER_5 = 91000;
const SKILL_JACKHAMMER_DURATION = 1536;
const SKILL_JACKHAMMER_DISTANCE = 0;
const SKILL_JACKHAMMER_MIN_DURATION = 500;
const SKILL_JACKHAMMER_LOCKOUT_DELAY = 700;
const SKILL_TAUNT = 130901;
const SKILL_TAUNT_DURATION = 1900;
const SKILL_ENRAGE = 140101;
const SKILL_ENRAGE_DURATION = 1680;
const SKILL_FLIPKICK = 161101;
const SKILL_FLIPKICK_3 = 161102;
const SKILL_FLIPKICK_2 = 161130;
const SKILL_FLIPKICK_DURATION = 2066;
const SKILL_COUNTER = 21210;
const SKILL_COUNTER_DURATION = 792;
const SKILL_COUNTER_PUNCH = 100800;
const SKILL_COUNTER_PUNCH_2 = 100830;
const SKILL_COUNTER_PUNCH_DURATION = 1860;
const SKILL_COUNTER_PUNCH_ABNORMALITY = 0x009AEC28;
const SKILL_COUNTER_PUNCH_AVAILABLE_DURATION = 6000;
const SKILL_ROUNDHOUSE_KICK = 71100;
const SKILL_ROUNDHOUSE_KICK_2 = 71130;
const SKILL_ROUNDHOUSE_KICK_DURATION = 846;
const SKILL_ROUNDHOUSE_KICK_LOCKOUT_DURATION = 400;
const SKILL_BULLRUSH = 50800;
const SKILL_RAMPAGE = 171010;
const SKILL_QUICK_DASH = 400100;
const SKILL_QUICK_DASH_DURATION = 620;
const SKILL_QUICK_DASH_DISTANCE = 150;
const SKILL_PUNCH = 11200;
const SKILL_PUNCH_DURATION = 1560;
const SKILL_PUNCH_DISTANCE = 70;
const SKILL_PUNCH_CLEAR_TIME = 500;
const SKILL_PUNCH2 = 11201;
const SKILL_PUNCH2_DURATION = 1270;
const SKILL_PUNCH3 = 11202;
const SKILL_PUNCH3_DURATION = 930;
const SKILL_PUNCH4 = 11203;
const SKILL_PUNCH4_DURATION = 1725;
const SKILL_PUNCH_CHAIN_1 = 21201;
const SKILL_PUNCH_CHAIN_START = 21212;
const SKILL_PUNCH_CHAIN_START_2 = 21210;
const SKILL_PUNCH_CHAIN_START_3 = 21211;
const SKILL_PUNCH_CHAIN_1_DURATION = 1190;
const SKILL_PUNCH_CHAIN_1_DISTANCE = 90;
const SKILL_PUNCH_CHAIN_2 = 21202;
const SKILL_PUNCH_CHAIN_2_DURATION = 1795;
const SKILL_PUNCH_CHAIN_3 = 21203;
const SKILL_PUNCH_CHAIN_3_DURATION = 1940;
const SKILL_PUNCH_CHAIN_4 = 21204;
const SKILL_PUNCH_CHAIN_4_DURATION = 1980;
const SKILL_DIVINE_WRATH = 30200;
const SKILL_DIVINE_WRATH_CANCEL_DELAY = 0;
const SKILL_DIVINE_WRATH_DURATION = 1800;
const SKILL_DIVINE_WRATH_DURATION_2 = 1400;
const SKILL_DIVINE_WRATH_DURATION_3 = 1400;
const SKILL_RETALIATE = 121000;
const SKILL_RETALIATE_DURATION = 1000;
const SKILL_HIGHKICK = 150500;
const SKILL_GROWING_FURY = 180101;
const SKILL_GROWING_FURY_DURATION = 1350;
const SKILL_FLY_KICK = 220100;
const SKILL_FLY_KICK_DURATION = 1810;
const SKILL_FLY_KICK_DURATION_2 = 1225;
const SKILL_FLY_KICK_DISTANCE = 250;
const SKILL_ONE_INCH = 240101;
const SKILL_ONE_INCH_2 = 240102;
const SKILL_ONE_INCH_DURATION = 2000;
const SKILL_ONE_INCH_DURATION_2 = 955;
const SKILL_ONE_INCH_DISTANCE = 0;
const SKILL_ONE_INCH_BUFF = 10153540;
const SKILL_SOUND = 260100;
const SKILL_SOUND_DURATION = 180;
const SKILL_SOUND_DURATION_2 = 412;
const SKILL_SOUND_DURATION_3 = 782;
const SKILL_SOUND_DURATION_4 = 716;
const SKILL_SOUND_DURATION_5 = 916;
const SKILL_SOUND_DURATION_6 = 2780;
const BLACKLIST = [110100, 111110, 111111, 111112, 111113, 111114, 111115, 111116, 111117, 111118, 111119, 111120, 111121, 111122, 111124, 111125, 111126, 111127, 111128, 111129, 111130, 111131, 111134, 111135, 111139, 111140, 111143, 111144, 111145, 111190, 111191, 111193, 111194, 111195, 111197, 111199, 111202, 111203, 116001, 116002, 116003, 116004, 117002, 117003, 140100, 460100, 480100, 900001];
const GLOBAL_LOCK_DELAY = 800;
module.exports = function brawler(dispatch) {
    let config = {};
    let settingTimeout = null;
    let settingLock = false;
    const path = require('path');
    const fs = require('fs');
    try {
        config = require('./config.json');
    } catch (e) {
        config = {};
        settingUpdate();
    }

    function settingUpdate() {
        clearTimeout(settingTimeout);
        settingTimeout = setTimeout(settingSave, 1000);
    }

    function settingSave() {
        if (settingLock) {
            settingUpdate();
            return;
        }
        settingLock = false;
        fs.writeFile(path.join(__dirname, 'config.json'), JSON.stringify(config, undefined, '\t'), err => {
            settingLock = false;
        });
    }
    let GLOBAL_LATENCY = 0;
    if (("GLOBAL_LATENCY" in config)) {
        GLOBAL_LATENCY = config.GLOBAL_LATENCY;
    }
    if (!("GLOBAL_LATENCY" in config)) {
        config.GLOBAL_LATENCY = 0;
        config.GLOBAL_LATENCY_DESCRIPTION = "change GLOBAL_LATENCY to your lowest usual ping";
        settingUpdate();
    }
    let AUTORHK = false;
    if (("AUTORHK" in config)) {
        AUTORHK = config.AUTORHK;
    }
    if (!("AUTORHK" in config)) {
        config.AUTORHK = false;
        config.AUTORHK_DESCRIPTION = "DO NOT USE WITHOUT ROBOTJS - Auto RHK after GP";
        settingUpdate();
    }
    let GPRHKDelay = 2200;
    if (("GPRHKDelay" in config)) {
        GPRHKDelay = config.GPRHKDelay;
    }
    if (!("GPRHKDelay" in config)) {
        config.GPRHKDelay = 2200;
        config.GPRHKDelay_DESCRIPTION = "Delay at base aspd in milliseconds";
        settingUpdate();
    }
    let AUTORHK2 = false;
    if (("AUTORHK2" in config)) {
        AUTORHK2 = config.AUTORHK2;
    }
    if (!("AUTORHK2" in config)) {
        config.AUTORHK2 = false;
        config.AUTORHK2_DESCRIPTION = "DO NOT USE WITHOUT ROBOTJS - Auto RHK after HM";
        settingUpdate();
    }
    let HMRHKDelay = 1200;
    if (("HMRHKDelay" in config)) {
        HMRHKDelay = config.HMRHKDelay;
    }
    if (!("HMRHKDelay" in config)) {
        config.HMRHKDelay = 1200;
        config.HMRHKDelay_DESCRIPTION = "Delay at base aspd in milliseconds";
        settingUpdate();
    }
    let RHKKEY = "4";
    if (("RHKKEY" in config)) {
        RHKKEY = config.RHKKEY;
    }
    if (!("RHKKEY" in config)) {
        config.RHKKEY = "4";
        config.RHKKEY_DESCRIPTION = "Key for RHK, find keyboard syntax list here http://robotjs.io/docs/syntax";
        settingUpdate();
    }
    let AUTO_COMBO_ATTACK_MOVE = false;
    if (("AUTO_COMBO_ATTACK_MOVE" in config)) {
        AUTO_COMBO_ATTACK_MOVE = config.AUTO_COMBO_ATTACK_MOVE;
    }
    if (!("AUTO_COMBO_ATTACK_MOVE" in config)) {
        config.AUTO_COMBO_ATTACK_MOVE = false;
        config.AUTO_COMBO_ATTACK_MOVE_DESCRIPTION = "Automatically trigger punch -> block movement combo when you press punch + W";
        settingUpdate();
    }
    let BLOCKKEY = "6";
    if (("BLOCKKEY" in config)) {
        BLOCKKEY = config.BLOCKKEY;
    }
    if (!("BLOCKKEY" in config)) {
        config.BLOCKKEY = "6";
        config.BLOCKKEY_DESCRIPTION = "Key for block, find keyboard syntax list here http://robotjs.io/docs/syntax";
        settingUpdate();
    }
    let cid;
    let job;
    let model;
    let player;
    let enabled = false;
    let aspd;
    let HMDis;
    let actionStageLast;
    let atkid = [];
    let atkid_base = 0xFEFEFFEE;
    let disabSkill = [];
    let startTime = [];
    let timer = [];
    let skillActive = false;
    let skillSpeed;
    let lastPunch = SKILL_PUNCH_CHAIN_1;
    let glyphState = [];
    let locking = false;
    let locking2;
    let soundcounter = 0;
    let soundcounter2;
    let desyncToggle = true;
    let Ignore1 = false;
    let Ignore2;
    let bullrushstartcheck = false;
    let hayPart2Timer;
    let counterTimer;
    let bullrushActive = false;
    let bRBuff = false;
    let lastFury = false;
    let yolo55;
    let soundlock;
    let soundlock2;
    let lastBlockActive;
    let blockActive;
    let counterAvailable;
    let yolo2;
    let kickadd = 0;
    let xloc;
    let yloc;
    let zloc;
    let wloc;
    let timeloc;
    let lastLastEvent;
    let lastLastSkill;
    let zzz = 1;
    let speedipman = false;
    let punchCounter = 0;
    let clearPunchCounter;
    let myRE;
    let collisionLocX;
    let collisionLocY;
    let collisionLocZ;
    let collisionLocW;
    let talgly = false;
    let talgly2 = false;
    let talgly3 = false;
    let TruecollisionLocX;
    let TruecollisionLocY;
    let TruecollisionLocZ;
    let lastSkill;
    let lastEvent;
    let lastEventTime;
    let GLOBAL_LOCK_DELAY = 500;
    let failsafe = 0;
    var atkArr;
    dispatch.hook('S_LOAD_TOPO', 3, (event) => {
        if (event.zone == 118) {
            enabled = false;
        } else {
            enabled = [JOB_BRAWLER].includes(job);
        }
    });
    dispatch.hook('S_LOGIN', dispatch.majorPatchVersion >= 86 ? 14 : 13, (event) => {
        cid = event.gameId;
        model = event.templateId;
        player = event.name;
        job = (model - 10101) % 100;
        enabled = [JOB_BRAWLER].includes(job);
    });
    dispatch.hook('C_CHAT', 1, (event) => {
        if (event.message.includes("disable10")) {
            enabled = false;
            console.log("Brawler script disabled");
            return false;
        }
        if (event.message.includes("enable10")) {
            enabled = [JOB_BRAWLER].includes(job);
            console.log("Brawler script enabled if you are currently logged into brawler");
            return false;
        }
    });

    function toggle(message) {
        dispatch.toClient('S_WHISPER', 1, {
            player: cid,
            unk1: 0,
            gm: 0,
            unk2: 0,
            author: 'Script',
            recipient: player,
            message: message,
        });
    }

    function fakeEnd_sorc(event, duration) {
        xloc = false;
        yloc = false;
        zloc = false;
        wloc = false;
        if (timer[lastSkill]) {
            clearTimeout(timer[lastSkill]);
        }
        if (lastSkill == SKILL_PUNCH_CHAIN_START) {
            clearTimeout(timer[lastPunch]);
        }
        var aaa = 1;
        if (event.skill.id == SKILL_TAUNT) {
            aaa = 1 / aspd;
        }
        atkid[event.skill.id] = atkid_base;
        atkid_base--;
        dispatch.toClient('S_ACTION_STAGE', 9, {
            gameId: cid,
            loc: {
                x: event.loc.x,
                y: event.loc.y,
                z: event.loc.z
            },
            w: event.w,
            templateId: model,
            skill: event.skill.id,
            stage: 0,
            speed: aspd * aaa,
            ...(dispatch.majorPatchVersion >= 86 ? {
                projectileSpeed: aspd * aaa
            } : 0n),
            id: atkid[event.skill.id],
            effectScale: 1.0,
            moving: false,
            dest: {
                x: 0,
                y: 0,
                Z: 0
            },
            target: 0n,
            animSeq: [],
        });
        timer[event.skill.id] = setTimeout(function(event) {
            skillActive = false;
            if (lastSkill == SKILL_BULLRUSH) {
                return false;
            }
            if (lastSkill == SKILL_RAMPAGE) {
                return;
            }
            if (event.skill.id != lastSkill) {
                return false;
            }
            dispatch.toClient('S_ACTION_END', 5, {
                gameId: cid,
                loc: {
                    x: xloc || event.loc.x,
                    y: yloc || event.loc.y,
                    z: zloc || event.loc.z
                },
                w: wloc || event.w,
                templateId: model,
                skill: event.skill.id,
                type: 0,
                id: atkid[event.skill.id],
            });
        }, duration / (aspd * aaa), event);
    }

    function force_end(event, unkz) {
        skillActive = false;
        dispatch.toClient('S_ACTION_END', 9, {
            gameId: cid,
            loc: {
                x: event.loc.x,
                y: event.loc.y,
                z: event.loc.z
            },
            w: event.w,
            templateId: model,
            skill: event.skill.id,
            type: unkz,
            id: atkid[event.skill.id],
        });
    }

    function fakeEnd_sorc_dist(event, duration, dist) {
        TruecollisionLocX = false;
        TruecollisionLocY = false;
        TruecollisionLocZ = false;
        if (timer[lastSkill]) {
            clearTimeout(timer[lastSkill]);
        }
        skillSpeed = aspd;
        zzz = 1;
        if (event.skill.id == SKILL_JACKHAMMER) skillSpeed = 1;
        if (event.skill.id == SKILL_QUICK_DASH) skillSpeed = 1;
        if (event.skill.id == (SKILL_DIVINE_WRATH + 1)) skillSpeed = 1;
        if (event.skill.id == SKILL_JACKHAMMER || event.skill.id == SKILL_QUICK_DASH) {
            zzz = aspd;
        }
        atkid[event.skill.id] = atkid_base;
        atkid_base--;
        if (event.skill.id != (SKILL_DIVINE_WRATH + 1)) {
            dispatch.toClient('S_ACTION_STAGE', 9, {
                gameId: cid,
                loc: {
                    x: event.loc.x,
                    y: event.loc.y,
                    z: event.loc.z
                },
                w: event.w,
                templateId: model,
                skill: event.skill.id,
                stage: 0,
                speed: skillSpeed,
                ...(dispatch.majorPatchVersion >= 86 ? {
                    projectileSpeed: skillSpeed
                } : 0n),
                id: atkid[event.skill.id],
                effectScale: 1.0,
                moving: false,
                dest: {
                    x: 0,
                    y: 0,
                    Z: 0
                },
                target: 0n,
                animSeq: [],
            });
        }
        var newX;
        var newY;
        var angle = parseFloat(event.w);
        var vvv = 0;
        newX = Math.cos(angle) * dist;
        newY = Math.sin(angle) * dist;
        timer[event.skill.id] = setTimeout(function(event) {
            skillActive = false;
            if (event.skill.id != lastSkill && event.skill.id != SKILL_GROWING_FURY && event.skill.id != (SKILL_GROWING_FURY + 1) && event.skill.id != (SKILL_GROWING_FURY + 29)) {
                return;
            }
            if (!lastFury && (event.skill.id == SKILL_GROWING_FURY || event.skill.id == (SKILL_GROWING_FURY + 1) || event.skill.id == (SKILL_GROWING_FURY + 29))) {
                return;
            }
            if (lastSkill == SKILL_RAMPAGE) {
                return;
            }
            if (lastSkill == SKILL_BULLRUSH) {
                return false;
            }
            dispatch.toClient('S_ACTION_END', 5, {
                gameId: cid,
                loc: {
                    x: TruecollisionLocX || (event.loc.x + newX),
                    y: TruecollisionLocY || (event.loc.y + newY),
                    z: TruecollisionLocZ || (event.loc.z + 2)
                },
                w: event.w,
                templateId: model,
                skill: event.skill.id,
                type: 0,
                id: atkid[event.skill.id],
            });
        }, duration / aspd * zzz, event);
    }

    function fakeEnd_sorc_punch(event, duration, dist, skillx) {
        if (timer[lastSkill]) {
            clearTimeout(timer[lastSkill]);
        }
        skillSpeed = aspd;
        zzz = 1;
        atkid[skillx] = atkid_base;
        atkid_base--;
        dispatch.toClient('S_ACTION_STAGE', 9, {
            gameId: cid,
            loc: {
                x: event.loc.x,
                y: event.loc.y,
                z: event.loc.z
            },
            w: event.w,
            templateId: model,
            skill: skillx,
            stage: 0,
            speed: skillSpeed,
            ...(dispatch.majorPatchVersion >= 86 ? {
                projectileSpeed: skillSpeed
            } : 0n),
            id: atkid[skillx],
            effectScale: 1.0,
            moving: false,
            dest: {
                x: 0,
                y: 0,
                Z: 0
            },
            target: 0n,
            animSeq: [],
        });
        var newX;
        var newY;
        var angle = parseFloat(event.w);
        newX = Math.cos(angle) * dist;
        newY = Math.sin(angle) * dist;
        timer[skillx] = setTimeout(function(event) {
            skillActive = false;
            if (lastSkill == 1) {
                return;
            }
            if (lastSkill == SKILL_RAMPAGE) {
                return;
            }
            if (lastSkill == SKILL_PUNCH_CHAIN_1 || lastSkill == SKILL_PUNCH_CHAIN_2 || lastSkill == SKILL_PUNCH_CHAIN_3 || lastSkill == SKILL_PUNCH_CHAIN_4 || lastSkill == SKILL_PUNCH_CHAIN_START || lastSkill == SKILL_PUNCH_CHAIN_START_2 || lastSkill == SKILL_PUNCH_CHAIN_START_3) {
                dispatch.toClient('S_ACTION_END', 5, {
                    gameId: cid,
                    loc: {
                        x: event.loc.x + newX,
                        y: event.loc.y + newY,
                        z: event.loc.z + 2
                    },
                    w: event.w,
                    templateId: model,
                    skill: skillx,
                    type: 0,
                    id: atkid[skillx],
                });
            }
        }, duration / aspd * zzz, event);
    }
    dispatch.hook('S_ABNORMALITY_BEGIN', 5, (event) => {
        if (!enabled) return;
        if (event.target !== cid) {
            return;
        }
        if (job == JOB_BRAWLER && event.id == SKILL_COUNTER_PUNCH_ABNORMALITY) {
            clearTimeout(counterTimer);
            counterAvailable = true;
        }
        if (event.id == 10153090) {
            bullrushstartcheck = true;
        }
        if (event.id == SKILL_ONE_INCH_BUFF) {
            speedipman = true;
        }
        if (event.id == 10153060 || event.id == 10153061 || event.id == 10153062 || event.id == 10153063 || event.id == 10153064) {
            return false;
        }
        if ((lastSkill == SKILL_PUNCH || lastSkill == SKILL_PUNCH2 || lastSkill == SKILL_PUNCH3 || lastSkill == SKILL_PUNCH4) && skillActive && event.id == 10153060) {
            return false;
        }
        if (event.id == 10153190) {
            soundcounter = 1;
            clearTimeout(soundcounter2);
            soundcounter2 = setTimeout(function() {
                soundcounter = 0;
            }, 4000);
        }
        if (event.id == 10153191) {
            soundcounter = 2;
            clearTimeout(soundcounter2);
            soundcounter2 = setTimeout(function() {
                soundcounter = 0;
            }, 4000);
        }
        if (event.id == 10153192) {
            soundcounter = 3;
            clearTimeout(soundcounter2);
            soundcounter2 = setTimeout(function() {
                soundcounter = 0;
            }, 4000);
        }
        if (event.id == 10153193) {
            soundcounter = 4;
            clearTimeout(soundcounter2);
            soundcounter2 = setTimeout(function() {
                soundcounter = 0;
            }, 4000);
        }
        if (event.id == 10153194) {
            soundcounter = 5;
            clearTimeout(soundcounter2);
            soundcounter2 = setTimeout(function() {
                soundcounter = 0;
            }, 4000);
        }
        if (event.id == 10153195) {
            soundcounter = 6;
            clearTimeout(soundcounter2);
            soundcounter2 = setTimeout(function() {
                soundcounter = 0;
            }, 4000);
        }
    });

    function yolo1() {
        dispatch.toClient('S_ABNORMALITY_END', 1, {
            target: cid,
            id: 10153060,
        });
        dispatch.toClient('S_ABNORMALITY_END', 1, {
            target: cid,
            id: 10153061,
        });
        dispatch.toClient('S_ABNORMALITY_END', 1, {
            target: cid,
            id: 10153062,
        });
        dispatch.toClient('S_ABNORMALITY_END', 1, {
            target: cid,
            id: 10153063,
        });
        dispatch.toClient('S_ABNORMALITY_END', 1, {
            target: cid,
            id: 10153064,
        });
        dispatch.toClient('S_ABNORMALITY_END', 1, {
            target: cid,
            id: 10153001,
        });
    }
    dispatch.hook('S_EACH_SKILL_RESULT', dispatch.majorPatchVersion >= 86 ? 14 : 13, (event) => {
        if (event.target === cid) {
            if (event.reaction.enable == true) {
                lastSkill = 1;
                punchCounter = 0;
                clearTimeout(yolo2);
                yolo1();
            }
        }
    });
    dispatch.hook('S_PLAYER_CHANGE_STAMINA', 1, (event) => {
        if (!enabled) return;
        myRE = event.current;
    });
    dispatch.hook('S_ABNORMALITY_END', 1, (event) => {
        if (!enabled) return;
        if (event.target !== cid) {
            return;
        }
        if (event.id == 10153090) {
            if (lastSkill == SKILL_BULLRUSH || lastSkill == 1) {
                bRBuff = false;
                dispatch.toClient('S_ACTION_END', 5, {
                    gameId: cid,
                    loc: {
                        x: collisionLocX,
                        y: collisionLocY,
                        z: collisionLocZ
                    },
                    w: collisionLocW,
                    templateId: model,
                    skill: SKILL_BULLRUSH,
                    type: 0,
                    id: atkid[SKILL_BULLRUSH],
                });
            }
        }
        if (event.id == 10153060 || event.id == 10153061 || event.id == 10153062 || event.id == 10153063 || event.id == 10153064) {
            return false;
        }
        if ((lastSkill == SKILL_PUNCH || lastSkill == SKILL_PUNCH2 || lastSkill == SKILL_PUNCH3 || lastSkill == SKILL_PUNCH4) && skillActive && event.id == 10153060) {
            return false;
        }
        if (event.id == SKILL_ONE_INCH_BUFF) {
            speedipman = false;
        }
        if (job == JOB_BRAWLER && event.id == SKILL_COUNTER_PUNCH_ABNORMALITY) {
            counterAvailable = false;
        }
    });
    dispatch.hook('C_PRESS_SKILL', 4, (event) => {
        if (!enabled) return;
        if (event.press == true) {
            punchCounter = 0;
            clearTimeout(yolo2);
            yolo1();
        }
        if (event.skill.id == SKILL_COUNTER) {
            lastBlockActive = blockActive;
            blockActive = event.press;
        }
        if (lastEvent) {
            lastEvent.loc = event.loc;
        }
        if (job == JOB_BRAWLER && event.skill.id != SKILL_BULLRUSH && skillActive && (lastSkill == SKILL_PUNCH_CHAIN_1 || lastSkill == SKILL_PUNCH_CHAIN_2 || lastSkill == SKILL_PUNCH_CHAIN_3 || lastSkill == SKILL_PUNCH_CHAIN_4)) {
            return false;
        }
        if (lastSkill == SKILL_BULLRUSH && event.skill.id != SKILL_BULLRUSH && event.press == true) {
            bRBuff = false;
            dispatch.toClient('S_ABNORMALITY_END', 1, {
                target: cid,
                id: 10153090,
            });
            dispatch.toClient('S_ACTION_END', 5, {
                gameId: cid,
                loc: {
                    x: event.loc.x,
                    y: event.loc.y,
                    z: event.loc.z
                },
                w: event.w,
                templateId: model,
                skill: SKILL_BULLRUSH,
                type: 0,
                id: atkid[SKILL_BULLRUSH],
            });
        }
        if (job == JOB_BRAWLER && event.skill.id == SKILL_COUNTER && event.press == false) {
            if (lastSkill == SKILL_COUNTER) {
                skillActive = false;
            }
            if (lastSkill == SKILL_COUNTER) {
                dispatch.toClient('S_ACTION_END', 5, {
                    gameId: cid,
                    loc: {
                        x: event.loc.x,
                        y: event.loc.y,
                        z: event.loc.z
                    },
                    w: event.w,
                    templateId: model,
                    skill: event.skill.id,
                    type: 51,
                    id: atkid[event.skill.id],
                });
            }
        }
        if (job == JOB_BRAWLER && event.skill.id == SKILL_COUNTER && event.press == true) {
            if (hayPart2Timer) clearTimeout(hayPart2Timer);
            if (skillActive) force_end(lastEvent, 4);
            if (lastSkill != SKILL_PUNCH && lastSkill != SKILL_PUNCH2 && lastSkill != SKILL_PUNCH3 && lastSkill != SKILL_PUNCH4 || 1 == 1) {
                if (timer[lastSkill]) {
                    clearTimeout(timer[lastSkill]);
                }
                skillActive = true;
                atkid[event.skill.id] = atkid_base;
                atkid_base--;
                dispatch.toClient('S_ACTION_STAGE', 9, {
                    gameId: cid,
                    loc: {
                        x: event.loc.x,
                        y: event.loc.y,
                        z: event.loc.z
                    },
                    w: event.w,
                    templateId: model,
                    skill: event.skill.id,
                    stage: 0,
                    speed: 1,
                    ...(dispatch.majorPatchVersion >= 86 ? {
                        projectileSpeed: 1
                    } : 0n),
                    id: atkid[event.skill.id],
                    effectScale: 1.0,
                    moving: false,
                    dest: {
                        x: 0,
                        y: 0,
                        Z: 0
                    },
                    target: 0n,
                    animSeq: [],
                });
            }
        }
        if (job == JOB_BRAWLER && event.skill.id == SKILL_BULLRUSH && event.press == true) {
            bullrushstartcheck = false;
            if (timer[lastSkill]) clearTimeout(timer[lastSkill]);
            if (hayPart2Timer) clearTimeout(hayPart2Timer);
            if (skillActive) force_end(lastEvent, 6);
            skillActive = true;
            atkid[event.skill.id] = atkid_base;
            atkid_base--;
            bRBuff = true;
            setTimeout(function() {
                if (!bullrushstartcheck) {
                    bRBuff = false;
                    dispatch.toClient('S_ABNORMALITY_END', 1, {
                        target: cid,
                        id: 10153090,
                    });
                    dispatch.toClient('S_ACTION_END', 5, {
                        gameId: cid,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                        templateId: model,
                        skill: SKILL_BULLRUSH,
                        type: 0,
                        id: atkid[SKILL_BULLRUSH],
                    });
                }
            }, 500);
            dispatch.toClient('S_ACTION_STAGE', 9, {
                gameId: cid,
                loc: {
                    x: event.loc.x,
                    y: event.loc.y,
                    z: event.loc.z
                },
                w: event.w,
                templateId: model,
                skill: event.skill.id,
                stage: 0,
                speed: 1,
                ...(dispatch.majorPatchVersion >= 86 ? {
                    projectileSpeed: 1
                } : 0n),
                id: atkid[event.skill.id],
                effectScale: 1.0,
                moving: false,
                dest: {
                    x: 0,
                    y: 0,
                    Z: 0
                },
                target: 0n,
                animSeq: [{
                    duration: 2950,
                    xyRate: 1,
                    zRate: 1,
                    distance: 340,
                }],
            });
            setTimeout(function(event) {
                if (lastSkill == SKILL_BULLRUSH && bRBuff == true) {
                    dispatch.toClient('S_ACTION_STAGE', 9, {
                        gameId: cid,
                        loc: {
                            x: collisionLocX || event.loc.x,
                            y: collisionLocY || event.loc.y,
                            z: collisionLocZ || event.loc.z
                        },
                        w: collisionLocW || event.w,
                        templateId: model,
                        skill: event.skill.id,
                        stage: 1,
                        speed: 1,
                        ...(dispatch.majorPatchVersion >= 86 ? {
                            projectileSpeed: 1
                        } : 0n),
                        id: atkid[event.skill.id],
                        effectScale: 1.0,
                        moving: false,
                        dest: {
                            x: 0,
                            y: 0,
                            Z: 0
                        },
                        target: 0n,
                        animSeq: [],
                    });
                }
            }, 2950, event);
            setTimeout(function(event) {
                if (lastSkill == SKILL_BULLRUSH && bRBuff == true) {
                    bRBuff = false;
                    dispatch.toClient('S_ACTION_END', 5, {
                        gameId: cid,
                        loc: {
                            x: collisionLocX || event.loc.x,
                            y: collisionLocY || event.loc.y,
                            z: collisionLocZ || event.loc.z
                        },
                        w: collisionLocW || event.w,
                        templateId: model,
                        skill: event.skill.id,
                        type: 0,
                        id: atkid[event.skill.id],
                    });
                    dispatch.toClient('S_ABNORMALITY_END', 1, {
                        target: cid,
                        id: 10153090,
                    });
                }
            }, 3600, event);
        }
        if (lastSkill != event.skill.id && event.press == true) {
            lastSkill = event.skill.id;
            lastEvent = event;
        }
    });
    dispatch.hook('S_CREST_MESSAGE', 2, {
        order: -99999
    }, (event) => {
        if (job != JOB_BRAWLER) {
            return
        };
        if (event.type == 6) {
            clearTimeout(HMDis);
            disabSkill[SKILL_HAYMAKER] = false;
        }
    });
    dispatch.hook('C_CHAT', 1, (event) => {
        return;
        if (event.message.includes("desync1")) {
            if (desyncToggle == false) {
                desyncToggle = true;
            } else {
                desyncToggle = false;
            }
            var msg = "Desync toggle is " + desyncToggle + ".";
            toggle(msg);
            return false;
        }
    });
    dispatch.hook('S_START_COOLTIME_SKILL', 3, (event) => {
        if (job != JOB_BRAWLER) {
            return
        };
        if (event.skill.id == SKILL_HAYMAKER) {
            clearTimeout(HMDis);
            disabSkill[event.skill.id] = true;
            if (event.cooldown >= (SKILL_HAYMAKER_DURATION / aspd)) {
                HMDis = setTimeout(function() {
                    disabSkill[SKILL_HAYMAKER] = false;
                }, SKILL_HAYMAKER_DURATION / aspd);
            } else {
                HMDis = setTimeout(function() {
                    disabSkill[SKILL_HAYMAKER] = false;
                }, event.cooldown);
            }
        }
    });
    dispatch.hook('S_DECREASE_COOLTIME_SKILL', 3, (event) => {
        if (job != JOB_BRAWLER) {
            return
        };
        if (event.skill.id == SKILL_HAYMAKER) {
            clearTimeout(HMDis);
            disabSkill[event.skill.id] = true;
            if (event.cooldown >= (SKILL_HAYMAKER_DURATION / aspd)) {
                HMDis = setTimeout(function() {
                    disabSkill[SKILL_HAYMAKER] = false;
                }, SKILL_HAYMAKER_DURATION / aspd);
            } else {
                HMDis = setTimeout(function() {
                    disabSkill[SKILL_HAYMAKER] = false;
                }, event.cooldown);
            }
        }
    });
    dispatch.hook('C_START_TARGETED_SKILL', 7, (event) => {
        if (!enabled) return;
        if (event.skill.id == (SKILL_RAMPAGE - 10)) {
            bRBuff = false;
            force_end(lastEvent, 4);
            lastSkill = 1;
            punchCounter = 0;
            clearTimeout(yolo2);
            yolo1();
        }
    });
    dispatch.hook('C_START_INSTANCE_SKILL', 7, (event) => {
        if (!enabled) return;
        if (job == JOB_BRAWLER && event.skill.id == (SKILL_DIVINE_WRATH + 1)) {
            disabSkill[event.skill.id] = true;
            setTimeout(function() {
                disabSkill[(SKILL_DIVINE_WRATH + 1)] = false;
            }, GLOBAL_LOCK_DELAY / aspd);
            yolo55 = Math.pow((Math.pow((event.loc.x - event.endpoints[0].x), 2) + Math.pow((event.loc.y - event.endpoints[0].y), 2)), 0.5);
            fakeEnd_sorc_dist(event, (SKILL_DIVINE_WRATH_DURATION + SKILL_DIVINE_WRATH_DURATION_2 + SKILL_DIVINE_WRATH_DURATION_3), yolo55);
            dispatch.toClient('S_ACTION_STAGE', 9, {
                gameId: cid,
                loc: {
                    x: event.loc.x,
                    y: event.loc.y,
                    z: event.loc.z
                },
                w: event.w,
                templateId: model,
                skill: event.skill.id,
                stage: 0,
                speed: 1,
                ...(dispatch.majorPatchVersion >= 86 ? {
                    projectileSpeed: 1
                } : 0n),
                id: atkid[event.skill.id],
                effectScale: 1.0,
                moving: false,
                dest: {
                    x: event.loc.x,
                    y: event.loc.y,
                    z: event.loc.z
                },
                target: 0n,
                animSeq: [],
            });
            setTimeout(function(event) {
                if (lastSkill == (SKILL_DIVINE_WRATH + 1)) {
                    dispatch.toClient('S_ACTION_STAGE', 9, {
                        gameId: cid,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                        templateId: model,
                        skill: event.skill.id,
                        stage: 1,
                        speed: 1,
                        ...(dispatch.majorPatchVersion >= 86 ? {
                            projectileSpeed: 1
                        } : 0n),
                        id: atkid[event.skill.id],
                        effectScale: 1.0,
                        moving: false,
                        dest: {
                            x: event.endpoints[0].x,
                            y: event.endpoints[0].y,
                            z: event.endpoints[0].z
                        },
                        target: 0n,
                        animSeq: [],
                    });
                }
            }, SKILL_DIVINE_WRATH_DURATION, event);
            setTimeout(function(event) {
                if (lastSkill == (SKILL_DIVINE_WRATH + 1)) {
                    dispatch.toClient('S_ACTION_STAGE', 9, {
                        gameId: cid,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                        templateId: model,
                        skill: event.skill.id,
                        stage: 2,
                        speed: 1,
                        ...(dispatch.majorPatchVersion >= 86 ? {
                            projectileSpeed: 1
                        } : 0n),
                        id: atkid[event.skill.id],
                        effectScale: 1.0,
                        moving: false,
                        dest: {
                            x: event.endpoints[0].x,
                            y: event.endpoints[0].y,
                            z: event.endpoints[0].z
                        },
                        target: 0n,
                        animSeq: [],
                    });
                }
            }, (SKILL_DIVINE_WRATH_DURATION + SKILL_DIVINE_WRATH_DURATION_2), event);
            skillActive = true;
        }
        lastSkill = event.skill.id;
    });

    function repeater(key, trigger) {
        if (lastSkill == trigger && failsafe < 40) {
            failsafe++;
            var robot17 = require("robotjs");
            robot17.keyTap(key);
            setTimeout(function(key, trigger) {
                repeater(key, trigger);
            }, 50, key, trigger);
        }
    }
    dispatch.hook('S_CREST_APPLY', 2, (event) => {
        if (!enabled) {
            return
        };
        glyphState[event.id] = event.enable;
        if (glyphState[31006]) {
            kickadd = 1;
        }
        if (!glyphState[31006]) {
            kickadd = 0;
        }
    });
    dispatch.hook('S_CREST_INFO', 2, (event) => {
        if (!enabled) {
            return
        };
        event.crests.forEach(function(element) {
            glyphState[element.id] = element.enable;
        });
        if (glyphState[31006]) {
            kickadd = 1;
        }
        if (!glyphState[31006]) {
            kickadd = 0;
        }
    });
    dispatch.hook('C_START_SKILL', 7, (event) => {
        if (!enabled) return;
        if (disabSkill[event.skill.id] == 'undefined') disabSkill[event.skill.id] = false;
        if (event.skill.id == SKILL_RAMPAGE) {
            lastSkill = 1;
            punchCounter = 0;
            clearTimeout(yolo2);
            yolo1();
        }
        if (event.skill.id != SKILL_PUNCH && event.skill.id != SKILL_PUNCH2 && event.skill.id != SKILL_PUNCH3 && event.skill.id != SKILL_PUNCH4 && event.skill.id != SKILL_PUNCH_CHAIN_START && event.skill.id != SKILL_PUNCH_CHAIN_START_2 && event.skill.id != SKILL_PUNCH_CHAIN_START_3) {
            punchCounter = 0;
            clearTimeout(yolo2);
            yolo1();
        }
        if (event.skill.id == SKILL_PUNCH && skillActive && lastSkill == SKILL_PUNCH4) {
            return false;
        }
        if (event.skill.id == SKILL_TAUNT && skillActive && lastSkill == SKILL_QUICK_DASH) {
            return false;
        }
        if ((event.skill.id == SKILL_HAYMAKER || event.skill.id == SKILL_HAYMAKER_3 || event.skill.id == SKILL_HAYMAKER_2 || event.skill.id == SKILL_HAYMAKER_4 || event.skill.id == SKILL_HAYMAKER_5 || event.skill.id == SKILL_HAYMAKER_6 || event.skill.id == SKILL_HAYMAKER_7) && disabSkill[SKILL_HAYMAKER] == true) {
            return false;
        }
        if (!(event.skill.id == SKILL_HAYMAKER || event.skill.id == SKILL_HAYMAKER_3 || event.skill.id == SKILL_HAYMAKER_2 || event.skill.id == SKILL_HAYMAKER_4 || event.skill.id == SKILL_HAYMAKER_5 || event.skill.id == SKILL_HAYMAKER_6 || event.skill.id == SKILL_HAYMAKER_7)) {
            disabSkill[SKILL_HAYMAKER] = false;
        }
        if (disabSkill[SKILL_SOUND] && event.skill.id == SKILL_SOUND && soundlock) {}
        if (event.skill.id != SKILL_SOUND) {
            clearTimeout(soundlock2);
            soundlock = false;
        }
        if (lastEvent) {
            lastEvent.loc = event.loc;
        }
        if (event.skill.id == SKILL_SOUND + 1) {
            event.skill.id = SKILL_SOUND;
        }
        if (event.skill.id == (SKILL_HAYMAKER_5 + 1) || event.skill.id == (SKILL_HAYMAKER_6 + 1) || event.skill.id == (SKILL_HAYMAKER_7 + 1)) {
            event.skill.id = event.skill.id - 1;
        }
        if ((event.skill.id == SKILL_HAYMAKER_5 || event.skill.id == SKILL_HAYMAKER_6 || event.skill.id == SKILL_HAYMAKER_7) && locking) {
            return false;
        }
        TruecollisionLocX = event.loc.x;
        TruecollisionLocY = event.loc.y;
        TruecollisionLocZ = event.loc.z;
        collisionLocX = event.loc.x;
        collisionLocY = event.loc.y;
        collisionLocZ = event.loc.z;
        if (!disabSkill[event.skill.id] /*&& bullrushActive == false */ ) {
            if (lastSkill == SKILL_BULLRUSH && event.skill.id != SKILL_COUNTER_PUNCH && event.skill.id != SKILL_HIGHKICK && event.skill.id != SKILL_GROWING_FURY && event.skill.id != (SKILL_GROWING_FURY + 1) && event.skill.id != (SKILL_GROWING_FURY + 29)) {
                bRBuff = false;
                dispatch.toClient('S_ABNORMALITY_END', 1, {
                    target: cid,
                    id: 10153090,
                });
                dispatch.toClient('S_ACTION_END', 5, {
                    gameId: cid,
                    loc: {
                        x: event.loc.x,
                        y: event.loc.y,
                        z: event.loc.z
                    },
                    w: event.w,
                    templateId: model,
                    skill: SKILL_BULLRUSH,
                    type: 0,
                    id: atkid[SKILL_BULLRUSH],
                });
            }
            clearTimeout(hayPart2Timer);
            if (job == JOB_BRAWLER && (event.skill.id == SKILL_HAYMAKER || event.skill.id == SKILL_HAYMAKER_3 || event.skill.id == SKILL_HAYMAKER_2 || event.skill.id == SKILL_HAYMAKER_4 || event.skill.id == SKILL_HAYMAKER_5 || event.skill.id == SKILL_HAYMAKER_6 || event.skill.id == SKILL_HAYMAKER_7)) {
                if (event.skill.id == SKILL_HAYMAKER_5) {
                    talgly = true;
                }
                if (event.skill.id != SKILL_HAYMAKER_5) {
                    talgly = false;
                }
                if (event.skill.id == SKILL_HAYMAKER_6) {
                    talgly2 = true;
                }
                if (event.skill.id != SKILL_HAYMAKER_6) {
                    talgly2 = false;
                }
                if (event.skill.id == SKILL_HAYMAKER_7) {
                    talgly3 = true;
                }
                if (event.skill.id != SKILL_HAYMAKER_7) {
                    talgly3 = false;
                }
                event.skill.id = SKILL_HAYMAKER;
                disabSkill[event.skill.id] = true;
                if (skillActive && lastSkill != SKILL_HAYMAKER) force_end(lastEvent, 4);
                skillActive = true;
                fakeEnd_sorc_dist(event, SKILL_HAYMAKER_DURATION, SKILL_HAYMAKER_DISTANCE);
                if (AUTORHK2) {
                    setTimeout(function() {
                        if (lastSkill == SKILL_HAYMAKER) {
                            var robot1 = require("robotjs");
                            robot1.keyTap(RHKKEY);
                        }
                    }, HMRHKDelay / aspd);
                }
                hayPart2Timer = setTimeout(function(event) {
                    dispatch.toClient('S_ACTION_STAGE', 9, {
                        gameId: cid,
                        loc: {
                            x: collisionLocX,
                            y: collisionLocY,
                            z: collisionLocZ
                        },
                        w: event.w,
                        templateId: model,
                        skill: event.skill.id,
                        stage: 1,
                        speed: aspd,
                        ...(dispatch.majorPatchVersion >= 86 ? {
                            projectileSpeed: aspd
                        } : 0n),
                        id: atkid[event.skill.id],
                        effectScale: 1.0,
                        moving: false,
                        dest: {
                            x: 0,
                            y: 0,
                            z: 0
                        },
                        target: 0n,
                        animSeq: [],
                    });
                }, SKILL_HAYMAKER_STAGE_DELAY / aspd, event);
            }
            if (job == JOB_BRAWLER && event.skill.id == SKILL_GROUNDPOUND) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function() {
                    disabSkill[SKILL_GROUNDPOUND] = false;
                }, GLOBAL_LOCK_DELAY * 0.7 / aspd);
                if (skillActive) force_end(lastEvent, 4);
                skillActive = true;
                fakeEnd_sorc(event, SKILL_GROUNDPOUND_DURATION);
                if (AUTORHK) {
                    setTimeout(function() {
                        if (lastSkill == SKILL_GROUNDPOUND) {
                            var robot1 = require("robotjs");
                            robot1.keyTap(RHKKEY);
                        }
                    }, GPRHKDelay / aspd);
                }
            }
            if (job == JOB_BRAWLER && event.skill.id == SKILL_TAUNT) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function() {
                    disabSkill[SKILL_TAUNT] = false;
                }, GLOBAL_LOCK_DELAY / aspd);
                if (skillActive) force_end(lastEvent, 4);
                skillActive = true;
                fakeEnd_sorc(event, SKILL_TAUNT_DURATION);
            }
            if (job == JOB_BRAWLER && event.skill.id == SKILL_ENRAGE) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function() {
                    disabSkill[SKILL_ENRAGE] = false;
                }, GLOBAL_LOCK_DELAY / aspd);
                if (skillActive) force_end(lastEvent, 4);
                skillActive = true;
                fakeEnd_sorc(event, SKILL_ENRAGE_DURATION);
            }
            if (job == JOB_BRAWLER && event.skill.id == SKILL_FLY_KICK) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function() {
                    disabSkill[SKILL_FLY_KICK] = false;
                }, GLOBAL_LOCK_DELAY / aspd);
                if (skillActive) {
                    event.skill.id = event.skill.id + 30;
                    fakeEnd_sorc_dist(event, SKILL_FLY_KICK_DURATION_2, (SKILL_FLY_KICK_DISTANCE + 100));
                }
                if (!skillActive) {
                    fakeEnd_sorc_dist(event, SKILL_FLY_KICK_DURATION, SKILL_FLY_KICK_DISTANCE);
                }
                if (skillActive) force_end(lastEvent, 4);
                skillActive = true;
            }
            if (job == JOB_BRAWLER && event.skill.id == SKILL_ONE_INCH) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function() {
                    disabSkill[SKILL_ONE_INCH] = false;
                }, GLOBAL_LOCK_DELAY / aspd);
                if (speedipman) {
                    event.skill.id = event.skill.id - 1;
                    if (skillActive) {
                        event.skill.id = event.skill.id + 30;
                        fakeEnd_sorc_dist(event, (SKILL_ONE_INCH_DURATION_2 / 1.2), SKILL_ONE_INCH_DISTANCE);
                    }
                    if (!skillActive) {
                        event.skill.id = event.skill.id + 1;
                        fakeEnd_sorc_dist(event, (SKILL_ONE_INCH_DURATION / 1.2), SKILL_ONE_INCH_DISTANCE);
                    }
                }
                if (!speedipman) {
                    if (skillActive) {
                        event.skill.id = event.skill.id + 30;
                        fakeEnd_sorc_dist(event, SKILL_ONE_INCH_DURATION_2, SKILL_ONE_INCH_DISTANCE);
                    }
                    if (!skillActive) {
                        event.skill.id = event.skill.id + 1;
                        fakeEnd_sorc_dist(event, SKILL_ONE_INCH_DURATION, SKILL_ONE_INCH_DISTANCE);
                    }
                }
                if (skillActive) force_end(lastEvent, 4);
                skillActive = true;
            }
            if (job == JOB_BRAWLER && event.skill.id == SKILL_ONE_INCH_2) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function() {
                    disabSkill[SKILL_ONE_INCH_2] = false;
                }, GLOBAL_LOCK_DELAY / aspd);
                event.skill.id = event.skill.id - 1;
                if (speedipman) {
                    event.skill.id = event.skill.id - 1;
                    if (skillActive) {
                        event.skill.id = event.skill.id + 30;
                        fakeEnd_sorc_dist(event, (SKILL_ONE_INCH_DURATION_2 / 1.2), SKILL_ONE_INCH_DISTANCE);
                    }
                    if (!skillActive) {
                        event.skill.id = event.skill.id + 1;
                        fakeEnd_sorc_dist(event, (SKILL_ONE_INCH_DURATION / 1.2), SKILL_ONE_INCH_DISTANCE);
                    }
                }
                if (!speedipman) {
                    if (skillActive) {
                        event.skill.id = event.skill.id + 30;
                        fakeEnd_sorc_dist(event, SKILL_ONE_INCH_DURATION_2, SKILL_ONE_INCH_DISTANCE);
                    }
                    if (!skillActive) {
                        event.skill.id = event.skill.id + 1;
                        fakeEnd_sorc_dist(event, SKILL_ONE_INCH_DURATION, SKILL_ONE_INCH_DISTANCE);
                    }
                }
                if (skillActive) force_end(lastEvent, 4);
                skillActive = true;
            }
            if (job == JOB_BRAWLER && event.skill.id == SKILL_SOUND) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function() {
                    disabSkill[SKILL_SOUND] = false;
                }, GLOBAL_LOCK_DELAY / 3 / aspd);
                if (soundcounter == 0 && skillActive) {
                    soundcounter = 1;
                    clearTimeout(soundcounter2);
                    soundcounter2 = setTimeout(function() {
                        soundcounter = 0;
                    }, 4000);
                }
                if (soundcounter == 0) {
                    event.skill.id = event.skill.id + 0;
                    fakeEnd_sorc_dist(event, (SKILL_SOUND_DURATION + SKILL_SOUND_DURATION_2), 0);
                    setTimeout(function(event) {
                        if (lastSkill == SKILL_SOUND) {
                            dispatch.toClient('S_ACTION_STAGE', 9, {
                                gameId: cid,
                                loc: {
                                    x: event.loc.x,
                                    y: event.loc.y,
                                    z: event.loc.z
                                },
                                w: event.w,
                                templateId: model,
                                skill: event.skill.id,
                                stage: 1,
                                speed: aspd,
                                ...(dispatch.majorPatchVersion >= 86 ? {
                                    projectileSpeed: aspd
                                } : 0n),
                                id: atkid[event.skill.id],
                                effectScale: 1.0,
                                moving: false,
                                dest: {
                                    x: 0,
                                    y: 0,
                                    Z: 0
                                },
                                target: 0n,
                                animSeq: [],
                            });
                        }
                    }, SKILL_SOUND_DURATION / aspd, event);
                    soundlock = true;
                    clearTimeout(soundlock2);
                    soundlock2 = setTimeout(function() {
                        soundlock = false;
                    }, (SKILL_SOUND_DURATION + SKILL_SOUND_DURATION_2) / aspd);
                }
                if (soundcounter == 1) {
                    event.skill.id = event.skill.id + 2;
                    fakeEnd_sorc_dist(event, SKILL_SOUND_DURATION_3, 0);
                    soundlock = true;
                    clearTimeout(soundlock2);
                    soundlock2 = setTimeout(function() {
                        soundlock = false;
                    }, SKILL_SOUND_DURATION_3 / aspd);
                }
                if (soundcounter == 2) {
                    event.skill.id = event.skill.id + 3;
                    fakeEnd_sorc_dist(event, SKILL_SOUND_DURATION_3, 0);
                    soundlock = true;
                    clearTimeout(soundlock2);
                    soundlock2 = setTimeout(function() {
                        soundlock = false;
                    }, SKILL_SOUND_DURATION_3 / aspd);
                }
                if (soundcounter == 3) {
                    event.skill.id = event.skill.id + 4;
                    fakeEnd_sorc_dist(event, SKILL_SOUND_DURATION_4, 0);
                    soundlock = true;
                    clearTimeout(soundlock2);
                    soundlock2 = setTimeout(function() {
                        soundlock = false;
                    }, SKILL_SOUND_DURATION_4 / aspd);
                }
                if (soundcounter == 4) {
                    event.skill.id = event.skill.id + 5;
                    fakeEnd_sorc_dist(event, SKILL_SOUND_DURATION_5, 0);
                    soundlock = true;
                    clearTimeout(soundlock2);
                    soundlock2 = setTimeout(function() {
                        soundlock = false;
                    }, SKILL_SOUND_DURATION_5 / aspd);
                }
                if (soundcounter == 5) {
                    event.skill.id = event.skill.id + 6;
                    fakeEnd_sorc_dist(event, SKILL_SOUND_DURATION_6, 0);
                    soundlock = true;
                    clearTimeout(soundlock2);
                    soundlock2 = setTimeout(function() {
                        soundlock = false;
                    }, SKILL_SOUND_DURATION_6 / aspd);
                }
                if (soundcounter == 6) {
                    event.skill.id = event.skill.id + 7;
                    fakeEnd_sorc_dist(event, SKILL_SOUND_DURATION_6, 0);
                    soundlock = true;
                    clearTimeout(soundlock2);
                    soundlock2 = setTimeout(function() {
                        soundlock = false;
                    }, SKILL_SOUND_DURATION_6 / aspd);
                }
                if (skillActive) force_end(lastEvent, 4);
                skillActive = true;
            }
            if (job == JOB_BRAWLER && event.skill.id == SKILL_RETALIATE) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function() {
                    disabSkill[SKILL_RETALIATE] = false;
                }, GLOBAL_LOCK_DELAY / aspd);
                fakeEnd_sorc(event, SKILL_RETALIATE_DURATION);
            }
            if (job == JOB_BRAWLER && event.skill.id == SKILL_DIVINE_WRATH) {
                xloc = event.loc.x;
                yloc = event.loc.y;
                zloc = event.loc.z;
                wloc = event.w;
                atkid[event.skill.id] = atkid_base;
                atkid_base--;
                dispatch.toClient('S_ACTION_STAGE', 9, {
                    gameId: cid,
                    loc: {
                        x: event.loc.x,
                        y: event.loc.y,
                        z: event.loc.z
                    },
                    w: event.w,
                    templateId: model,
                    skill: event.skill.id,
                    stage: 0,
                    speed: 1,
                    projectileSpeed: 1,
                    id: atkid[event.skill.id],
                    effectScale: 1.0,
                    moving: false,
                    dest: {
                        x: 0,
                        y: 0,
                        z: 0
                    },
                    target: 0n,
                    animSeq: [],
                });
            }
            if (job == JOB_BRAWLER && event.skill.id == SKILL_COUNTER_PUNCH && counterAvailable) {
                var timer = setTimeout(function() {
                    disabSkill[SKILL_COUNTER_PUNCH] = false;
                }, GLOBAL_LOCK_DELAY / aspd);
                clearTimeout(counterTimer);
                if (skillActive) force_end(lastEvent, 4);
                skillActive = true;
                fakeEnd_sorc(event, SKILL_COUNTER_PUNCH_DURATION);
            }
            if (job == JOB_BRAWLER && (event.skill.id == SKILL_PILEDRIVER || event.skill.id == SKILL_PILEDRIVER_3 || event.skill.id == SKILL_PILEDRIVER_5)) {
                event.skill.id = SKILL_PILEDRIVER;
                if (disabSkill[SKILL_PILEDRIVER] != true) {
                    disabSkill[event.skill.id] = true;
                    var timer = setTimeout(function() {
                        disabSkill[SKILL_PILEDRIVER] = false;
                    }, GLOBAL_LOCK_DELAY / aspd);
                    if (skillActive) force_end(lastEvent, 4);
                    skillActive = true;
                    fakeEnd_sorc_dist(event, SKILL_PILEDRIVER_DURATION, SKILL_PILEDRIVER_DISTANCE);
                }
            }
            if (job == JOB_BRAWLER && (event.skill.id == SKILL_JACKHAMMER || event.skill.id == SKILL_JACKHAMMER_3 || event.skill.id == SKILL_JACKHAMMER_5)) {
                event.skill.id = SKILL_JACKHAMMER;
                if (disabSkill[SKILL_JACKHAMMER] != true) {
                    disabSkill[event.skill.id] = true;
                    var timer = setTimeout(function() {
                        disabSkill[SKILL_JACKHAMMER] = false;
                    }, SKILL_JACKHAMMER_LOCKOUT_DELAY);
                    if (skillActive) force_end(lastEvent, 4);
                    skillActive = true;
                    fakeEnd_sorc_dist(event, SKILL_JACKHAMMER_DURATION, SKILL_JACKHAMMER_DISTANCE);
                }
            }
            if (job == JOB_BRAWLER && (event.skill.id == SKILL_FLIPKICK || event.skill.id == SKILL_FLIPKICK_3)) {
                event.skill.id = SKILL_FLIPKICK;
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function() {
                    disabSkill[SKILL_FLIPKICK] = false;
                }, GLOBAL_LOCK_DELAY / aspd);
                if (skillActive) force_end(lastEvent, 4);
                skillActive = true;
                fakeEnd_sorc(event, SKILL_FLIPKICK_DURATION);
            }
            if (job == JOB_BRAWLER && event.skill.id == SKILL_PUNCH) {
                if (punchCounter == 0) {
                    event.skill.id = SKILL_PUNCH;
                }
                if (punchCounter == 1) {
                    event.skill.id = SKILL_PUNCH2;
                }
                if (punchCounter == 2) {
                    event.skill.id = SKILL_PUNCH3;
                }
                if (punchCounter == 3) {
                    event.skill.id = SKILL_PUNCH4;
                }
            }
            if (job == JOB_BRAWLER && event.skill.id == SKILL_PUNCH) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function() {
                    disabSkill[SKILL_PUNCH] = false;
                }, 100);
                skillActive = true;
                yolo1();
                dispatch.toClient('S_ABNORMALITY_END', 1, {
                    target: cid,
                    id: 10153001,
                });
                fakeEnd_sorc(event, SKILL_PUNCH_DURATION);
                dispatch.toClient('S_ABNORMALITY_BEGIN', 5, {
                    target: cid,
                    source: cid,
                    id: 10153061,
                    duration: 3000,
                    unk: 0,
                    stacks: 1,
                    unk2: 0,
                    ...(dispatch.majorPatchVersion >= 86 ? {
                        unk3: 0
                    } : 0n),
                });
                dispatch.toClient('S_ABNORMALITY_BEGIN', 5, {
                    target: cid,
                    source: cid,
                    id: 10153060,
                    duration: 3000,
                    unk: 0,
                    stacks: 1,
                    unk2: 0,
                    ...(dispatch.majorPatchVersion >= 86 ? {
                        unk3: 0
                    } : 0n),
                });
                clearTimeout(clearPunchCounter);
                punchCounter = 1;
                clearPunchCounter = setTimeout(function() {
                    punchCounter = 0;
                }, SKILL_PUNCH_DURATION);
                clearTimeout(yolo2);
                yolo2 = setTimeout(yolo1, 3000);
                if (AUTO_COMBO_ATTACK_MOVE && event.moving == 1) {
                    failsafe = 0;
                    lastSkill = SKILL_PUNCH;
                    repeater(BLOCKKEY, SKILL_PUNCH);
                }
            }
            if (job == JOB_BRAWLER && event.skill.id == SKILL_PUNCH2) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function() {
                    disabSkill[SKILL_PUNCH2] = false;
                }, GLOBAL_LOCK_DELAY / aspd);
                skillActive = true;
                yolo1();
                fakeEnd_sorc(event, SKILL_PUNCH2_DURATION);
                dispatch.toClient('S_ABNORMALITY_BEGIN', 5, {
                    target: cid,
                    source: cid,
                    id: 10153062,
                    duration: 3000,
                    unk: 0,
                    stacks: 1,
                    unk2: 0,
                    ...(dispatch.majorPatchVersion >= 86 ? {
                        unk3: 0
                    } : 0n),
                });
                dispatch.toClient('S_ABNORMALITY_BEGIN', 5, {
                    target: cid,
                    source: cid,
                    id: 10153060,
                    duration: 3000,
                    unk: 0,
                    stacks: 1,
                    unk2: 0,
                    ...(dispatch.majorPatchVersion >= 86 ? {
                        unk3: 0
                    } : 0n),
                });
                clearTimeout(clearPunchCounter);
                punchCounter = 2;
                clearPunchCounter = setTimeout(function() {
                    punchCounter = 0;
                }, SKILL_PUNCH2_DURATION);
                clearTimeout(yolo2);
                yolo2 = setTimeout(yolo1, 3000);
            }
            if (job == JOB_BRAWLER && event.skill.id == SKILL_PUNCH3) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function() {
                    disabSkill[SKILL_PUNCH3] = false;
                }, GLOBAL_LOCK_DELAY / aspd);
                skillActive = true;
                yolo1();
                fakeEnd_sorc(event, SKILL_PUNCH3_DURATION);
                dispatch.toClient('S_ABNORMALITY_BEGIN', 5, {
                    target: cid,
                    source: cid,
                    id: 10153063,
                    duration: 3000,
                    unk: 0,
                    stacks: 1,
                    unk2: 0,
                    ...(dispatch.majorPatchVersion >= 86 ? {
                        unk3: 0
                    } : 0n),
                });
                dispatch.toClient('S_ABNORMALITY_BEGIN', 5, {
                    target: cid,
                    source: cid,
                    id: 10153060,
                    duration: 3000,
                    unk: 0,
                    stacks: 1,
                    unk2: 0,
                    ...(dispatch.majorPatchVersion >= 86 ? {
                        unk3: 0
                    } : 0n),
                });
                clearTimeout(clearPunchCounter);
                punchCounter = 3;
                clearPunchCounter = setTimeout(function() {
                    punchCounter = 0;
                }, SKILL_PUNCH3_DURATION);
                clearTimeout(yolo2);
                yolo2 = setTimeout(yolo1, 3000);
            }
            if (job == JOB_BRAWLER && event.skill.id == SKILL_PUNCH4) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function() {
                    disabSkill[SKILL_PUNCH4] = false;
                }, GLOBAL_LOCK_DELAY / aspd);
                skillActive = true;
                yolo1();
                fakeEnd_sorc(event, SKILL_PUNCH4_DURATION);
                dispatch.toClient('S_ABNORMALITY_BEGIN', 5, {
                    target: cid,
                    source: cid,
                    id: 10153064,
                    duration: 3000,
                    unk: 0,
                    stacks: 1,
                    unk2: 0,
                    ...(dispatch.majorPatchVersion >= 86 ? {
                        unk3: 0
                    } : 0n),
                });
                dispatch.toClient('S_ABNORMALITY_BEGIN', 5, {
                    target: cid,
                    source: cid,
                    id: 10153060,
                    duration: 3000,
                    unk: 0,
                    stacks: 1,
                    unk2: 0,
                    ...(dispatch.majorPatchVersion >= 86 ? {
                        unk3: 0
                    } : 0n),
                });
                punchCounter = 0;
                clearTimeout(yolo2);
                yolo2 = setTimeout(yolo1, 3000);
            }
            if (job == JOB_BRAWLER && (event.skill.id == SKILL_PUNCH_CHAIN_START || event.skill.id == SKILL_PUNCH_CHAIN_START_2 || event.skill.id == SKILL_PUNCH_CHAIN_START_3)) {
                if (lastSkill != SKILL_PUNCH && lastSkill != SKILL_PUNCH2 && lastSkill != SKILL_PUNCH3 && lastSkill != SKILL_PUNCH4) {
                    return false;
                }
                skillActive = true;
                if (punchCounter == 1) {
                    fakeEnd_sorc_punch(event, SKILL_PUNCH_CHAIN_1_DURATION, SKILL_PUNCH_CHAIN_1_DISTANCE, SKILL_PUNCH_CHAIN_1);
                    lastPunch = SKILL_PUNCH_CHAIN_1;
                }
                if (punchCounter == 2) {
                    fakeEnd_sorc_punch(event, SKILL_PUNCH_CHAIN_2_DURATION, 0, SKILL_PUNCH_CHAIN_2);
                    lastPunch = SKILL_PUNCH_CHAIN_2;
                }
                if (punchCounter == 3) {
                    fakeEnd_sorc_punch(event, SKILL_PUNCH_CHAIN_3_DURATION, 0, SKILL_PUNCH_CHAIN_3);
                    lastPunch = SKILL_PUNCH_CHAIN_3;
                }
                if (punchCounter == 0) {
                    fakeEnd_sorc_punch(event, SKILL_PUNCH_CHAIN_4_DURATION, 0, SKILL_PUNCH_CHAIN_4);
                    lastPunch = SKILL_PUNCH_CHAIN_4;
                }
                event.skill.id = lastPunch;
                punchCounter = 0;
                clearTimeout(yolo2);
                yolo1();
            }
            if (job == JOB_BRAWLER && (event.skill.id == SKILL_GROWING_FURY || event.skill.id == (SKILL_GROWING_FURY + 1) || event.skill.id == (SKILL_GROWING_FURY + 29)) && myRE == 3000) {
                disabSkill[event.skill.id] = true;
                setTimeout(function(event) {
                    disabSkill[event.skill.id] = false;
                }, GLOBAL_LOCK_DELAY / aspd, event);
                if (skillActive) force_end(lastEvent, 4);
                skillActive = true;
                fakeEnd_sorc_dist(event, SKILL_GROWING_FURY_DURATION, 0);
                lastEvent = event;
            }
            if (job == JOB_BRAWLER && event.skill.id == SKILL_ROUNDHOUSE_KICK) {
                disabSkill[event.skill.id] = true;
                var timer = setTimeout(function() {
                    disabSkill[SKILL_ROUNDHOUSE_KICK] = false;
                }, SKILL_ROUNDHOUSE_KICK_LOCKOUT_DURATION);
                if (skillActive) force_end(lastEvent, 4);
                skillActive = true;
                fakeEnd_sorc(event, SKILL_ROUNDHOUSE_KICK_DURATION);
            }
            if (job == JOB_BRAWLER && (event.skill.id == SKILL_QUICK_DASH || event.skill.id == (SKILL_QUICK_DASH + 30))) {
                disabSkill[SKILL_QUICK_DASH] = true;
                var timer = setTimeout(function() {
                    disabSkill[SKILL_QUICK_DASH] = false;
                }, GLOBAL_LOCK_DELAY / 2 / aspd);
                if (skillActive) force_end(lastEvent, 6);
                skillActive = true;
                fakeEnd_sorc_dist(event, SKILL_QUICK_DASH_DURATION, SKILL_QUICK_DASH_DISTANCE);
            }
            if (event.skill.id != SKILL_HIGHKICK /*&& event.skill.id != SKILL_GROWING_FURY*/ ) {
                lastSkill = event.skill.id;
                lastEvent = event;
            }
        }
        if (event.skill.id == SKILL_COUNTER_PUNCH && !counterAvailable) {
            return;
        }
        if (desyncToggle) {
            if (event.skill.id != SKILL_HAYMAKER && event.skill.id != SKILL_PILEDRIVER && event.skill.id != SKILL_ROUNDHOUSE_KICK && event.skill.id != SKILL_JACKHAMMER && event.skill.id != SKILL_FLIPKICK) {
                dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                    skill: event.skill.id,
                    stage: 0,
                    loc: {
                        x: event.loc.x,
                        y: event.loc.y,
                        z: event.loc.z
                    },
                    w: event.w,
                });
            }
            if (event.skill.id == SKILL_FLIPKICK) {
                dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                    skill: SKILL_FLIPKICK,
                    stage: 0,
                    loc: {
                        x: event.loc.x,
                        y: event.loc.y,
                        z: event.loc.z
                    },
                    w: event.w,
                });
                dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                    skill: SKILL_FLIPKICK_2,
                    stage: 0,
                    loc: {
                        x: event.loc.x,
                        y: event.loc.y,
                        z: event.loc.z
                    },
                    w: event.w,
                });
            }
            if (event.skill.id == SKILL_COUNTER_PUNCH) {
                dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                    skill: SKILL_COUNTER_PUNCH_2,
                    stage: 0,
                    loc: {
                        x: event.loc.x,
                        y: event.loc.y,
                        z: event.loc.z
                    },
                    w: event.w,
                });
                dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                    skill: SKILL_COUNTER_PUNCH,
                    stage: 0,
                    loc: {
                        x: event.loc.x,
                        y: event.loc.y,
                        z: event.loc.z
                    },
                    w: event.w,
                });
            }
        }
    });
    dispatch.hook('S_ACTION_STAGE', 9, (event) => {
        if (!enabled) return;
        if (event.gameId === cid) {
            actionStageLast = event;
            if (job == JOB_BRAWLER && event.skill.id == SKILL_BULLRUSH) {
                return false;
                if (skillActive) force_end(lastEvent, 4);
            }
            if (bRBuff == true) {
                return false;
            }
            var xzzy = event.skill.type === 1;
            if (!xzzy) {
                lastSkill = 1;
                dispatch.toClient('S_ABNORMALITY_END', 1, {
                    target: cid,
                    id: 10153060,
                });
                punchCounter = 0;
                clearTimeout(yolo2);
                yolo1();
            }
            if ((event.skill.id == SKILL_GROWING_FURY || event.skill.id == (SKILL_GROWING_FURY + 1) || event.skill.id == (SKILL_GROWING_FURY + 29))) {
                lastFury = true;
            }
            if (!(event.skill.id == SKILL_GROWING_FURY || event.skill.id == (SKILL_GROWING_FURY + 1) || event.skill.id == (SKILL_GROWING_FURY + 29))) {
                lastFury = false;
            }
            if (job == JOB_BRAWLER && event.skill.id == SKILL_DIVINE_WRATH) {
                return false;
                /*var timer = setTimeout(function(event){
                dispatch.toServer('C_START_SKILL', 1, {
                  skill: SKILL_PUNCH,
                  w: event.w,
                  x1: event.x,
                  y1: event.y,
                  z1: event.z,
                  x2: 0,
                  y2: 0,
                  z2: 0,
                  unk1: 1,
                  unk2: 0,
                  unk3: 0,
                  target: 0
                });
                }, SKILL_DIVINE_WRATH_CANCEL_DELAY, event);*/
            }
            if (job == JOB_BRAWLER && event.skill.id == (SKILL_DIVINE_WRATH + 1)) {
                return false;
            }
            if (bullrushActive == false) {
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_ROUNDHOUSE_KICK || event.skill.id == SKILL_ROUNDHOUSE_KICK_2)) {
                    if (!desyncToggle) {
                        dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                            skill: event.skill.id,
                            stage: event.stage,
                            loc: {
                                x: event.loc.x,
                                y: event.loc.y,
                                z: event.loc.z
                            },
                            w: event.w,
                        });
                    }
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_COUNTER_PUNCH || event.skill.id == SKILL_COUNTER_PUNCH_2)) {
                    if (desyncToggle) {
                        dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                            skill: event.skill.id,
                            stage: event.stage,
                            loc: {
                                x: event.loc.x,
                                y: event.loc.y,
                                z: event.loc.z
                            },
                            w: event.w,
                        });
                    }
                    return false;
                }
                if (job == JOB_BRAWLER && event.skill.id == SKILL_COUNTER) {
                    return false;
                }
                if (job == JOB_BRAWLER && event.skill.id == SKILL_TAUNT) {
                    return false;
                }
                if (job == JOB_BRAWLER && event.skill.id == SKILL_ENRAGE) {
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_FLY_KICK || event.skill.id == (SKILL_FLY_KICK + 30))) {
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_ONE_INCH || event.skill.id == SKILL_ONE_INCH_2 || event.skill.id == (SKILL_ONE_INCH - 1) || event.skill.id == (SKILL_ONE_INCH + 29) || event.skill.id == (SKILL_ONE_INCH + 30))) {
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_SOUND || event.skill.id == (SKILL_SOUND + 1) || event.skill.id == (SKILL_SOUND + 2) || event.skill.id == (SKILL_SOUND + 3) || event.skill.id == (SKILL_SOUND + 4) || event.skill.id == (SKILL_SOUND + 5) || event.skill.id == (SKILL_SOUND + 6))) {
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_PUNCH_CHAIN_1 || event.skill.id == SKILL_PUNCH_CHAIN_2 || event.skill.id == SKILL_PUNCH_CHAIN_3 || event.skill.id == SKILL_PUNCH_CHAIN_4)) {
                    if (!desyncToggle) {
                        dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                            skill: event.skill.id,
                            stage: event.stage,
                            loc: {
                                x: event.loc.x,
                                y: event.loc.y,
                                z: event.loc.z
                            },
                            w: event.w,
                        });
                    }
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_PUNCH || event.skill.id == SKILL_PUNCH2 || event.skill.id == SKILL_PUNCH3 || event.skill.id == SKILL_PUNCH4)) {
                    if (!desyncToggle) {
                        dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                            skill: event.skill.id,
                            stage: event.stage,
                            loc: {
                                x: event.loc.x,
                                y: event.loc.y,
                                z: event.loc.z
                            },
                            w: event.w,
                        });
                    }
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == (SKILL_PUNCH + 30) || event.skill.id == (SKILL_PUNCH2 + 30) || event.skill.id == (SKILL_PUNCH3 + 30) || event.skill.id == (SKILL_PUNCH4 + 30))) {
                    if (!desyncToggle) {
                        dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                            skill: event.skill.id,
                            stage: event.stage,
                            loc: {
                                x: event.loc.x,
                                y: event.loc.y,
                                z: event.loc.z
                            },
                            w: event.w,
                        });
                    }
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_HAYMAKER || event.skill.id == SKILL_HAYMAKER_2 || event.skill.id == SKILL_HAYMAKER_3 || event.skill.id == SKILL_HAYMAKER_4 || event.skill.id == SKILL_HAYMAKER_5 || event.skill.id == (SKILL_HAYMAKER_5 + 5) || event.skill.id == (SKILL_HAYMAKER_5 + 6) || event.skill.id == SKILL_HAYMAKER_6 || event.skill.id == (SKILL_HAYMAKER_6 + 5) || event.skill.id == (SKILL_HAYMAKER_6 + 6) || event.skill.id == SKILL_HAYMAKER_7 || event.skill.id == (SKILL_HAYMAKER_7 + 5) || event.skill.id == (SKILL_HAYMAKER_7 + 6))) {
                    if (!desyncToggle) {
                        dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                            skill: event.skill.id,
                            stage: event.stage,
                            loc: {
                                x: event.loc.x,
                                y: event.loc.y,
                                z: event.loc.z
                            },
                            w: event.w,
                        });
                    }
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_GROUNDPOUND || event.skill.id == SKILL_GROUNDPOUND_2)) {
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_PILEDRIVER || event.skill.id == SKILL_PILEDRIVER_2 || event.skill.id == SKILL_PILEDRIVER_3 || event.skill.id == SKILL_PILEDRIVER_4 || event.skill.id == SKILL_PILEDRIVER_5)) {
                    if (!desyncToggle) {
                        dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                            skill: event.skill.id,
                            stage: event.stage,
                            loc: {
                                x: event.loc.x,
                                y: event.loc.y,
                                z: event.loc.z
                            },
                            w: event.w,
                        });
                    }
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_JACKHAMMER || event.skill.id == SKILL_JACKHAMMER_2 || event.skill.id == SKILL_JACKHAMMER_3 || event.skill.id == SKILL_JACKHAMMER_4 || event.skill.id == SKILL_JACKHAMMER_5)) {
                    if (!desyncToggle) {
                        dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                            skill: event.skill.id,
                            stage: event.stage,
                            loc: {
                                x: event.loc.x,
                                y: event.loc.y,
                                z: event.loc.z
                            },
                            w: event.w,
                        });
                    }
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_FLIPKICK || event.skill.id == SKILL_FLIPKICK_2 || event.skill.id == SKILL_FLIPKICK_3)) {
                    if (desyncToggle) {
                        dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                            skill: event.skill.id,
                            stage: event.stage,
                            loc: {
                                x: event.loc.x,
                                y: event.loc.y,
                                z: event.loc.z
                            },
                            w: event.w,
                        });
                    }
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_RETALIATE)) {
                    if (Ignore1) {
                        fakeEnd_sorc(event, SKILL_RETALIATE_DURATION);
                        lastSkill = SKILL_RETALIATE
                    }
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_GROWING_FURY || event.skill.id == (SKILL_GROWING_FURY + 1) || event.skill.id == (SKILL_GROWING_FURY + 29))) {
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_QUICK_DASH || event.skill.id == (SKILL_QUICK_DASH + 30))) {
                    return false;
                }
            }
        }
    });
    dispatch.hook('S_ACTION_END', 5, (event) => {
        if (event.skill == 67108401) console.log("error");
        if (!enabled) return;
        if (event.gameId === cid) {
            if (event.skill.id == SKILL_BULLRUSH) {
                return false;
            }
            if (bRBuff == true) {
                return false;
            }
            if (bullrushActive == false && lastSkill != SKILL_PUNCH_CHAIN_START) {
                if (job == JOB_BRAWLER && event.skill.id == SKILL_DIVINE_WRATH) {
                    return false;
                }
                if (job == JOB_BRAWLER && event.skill.id == (SKILL_DIVINE_WRATH + 1)) {
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_ROUNDHOUSE_KICK || event.skill.id == SKILL_ROUNDHOUSE_KICK_2)) {
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_COUNTER_PUNCH || event.skill.id == SKILL_COUNTER_PUNCH_2)) {
                    return false;
                }
                if (job == JOB_BRAWLER && event.skill.id == SKILL_COUNTER) {
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_FLY_KICK || event.skill.id == (SKILL_FLY_KICK + 30))) {
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_ONE_INCH || event.skill.id == SKILL_ONE_INCH_2 || event.skill.id == (SKILL_ONE_INCH - 1) || event.skill.id == (SKILL_ONE_INCH + 29) || event.skill.id == (SKILL_ONE_INCH + 30))) {
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_SOUND || event.skill.id == (SKILL_SOUND + 1) || event.skill.id == (SKILL_SOUND + 2) || event.skill.id == (SKILL_SOUND + 3) || event.skill.id == (SKILL_SOUND + 4) || event.skill.id == (SKILL_SOUND + 5) || event.skill.id == (SKILL_SOUND + 6))) {
                    return false;
                }
                if (job == JOB_BRAWLER && event.skill.id == SKILL_TAUNT) {
                    return false;
                }
                if (job == JOB_BRAWLER && event.skill.id == SKILL_ENRAGE) {
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_PUNCH_CHAIN_1 || event.skill.id == SKILL_PUNCH_CHAIN_2 || event.skill.id == SKILL_PUNCH_CHAIN_3 || event.skill.id == SKILL_PUNCH_CHAIN_4)) {
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_PUNCH || event.skill.id == SKILL_PUNCH2 || event.skill.id == SKILL_PUNCH3 || event.skill.id == SKILL_PUNCH4)) {
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == (SKILL_PUNCH + 30) || event.skill.id == (SKILL_PUNCH2 + 30) || event.skill.id == (SKILL_PUNCH3 + 30) || event.skill.id == (SKILL_PUNCH4 + 30))) {
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_HAYMAKER || event.skill.id == SKILL_HAYMAKER_2 || event.skill.id == SKILL_HAYMAKER_3 || event.skill.id == SKILL_HAYMAKER_4 || event.skill.id == SKILL_HAYMAKER_5 || event.skill.id == (SKILL_HAYMAKER_5 + 5) || event.skill.id == (SKILL_HAYMAKER_5 + 6) || event.skill.id == SKILL_HAYMAKER_6 || event.skill.id == (SKILL_HAYMAKER_6 + 5) || event.skill.id == (SKILL_HAYMAKER_6 + 6) || event.skill.id == SKILL_HAYMAKER_7 || event.skill.id == (SKILL_HAYMAKER_7 + 5) || event.skill.id == (SKILL_HAYMAKER_7 + 6))) {
                    disabSkill[SKILL_HAYMAKER] = false;
                    if (actionStageLast.stage != 1 || actionStageLast.skill.id != event.skill.id) {
                        clearTimeout(hayPart2Timer);
                        return;
                    }
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_GROUNDPOUND || event.skill.id == SKILL_GROUNDPOUND_2)) {
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_PILEDRIVER || event.skill.id == SKILL_PILEDRIVER_2 || event.skill.id == SKILL_PILEDRIVER_3 || event.skill.id == SKILL_PILEDRIVER_4 || event.skill.id == SKILL_PILEDRIVER_5)) {
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_JACKHAMMER || event.skill.id == SKILL_JACKHAMMER_2 || event.skill.id == SKILL_JACKHAMMER_3 || event.skill.id == SKILL_JACKHAMMER_4 || event.skill.id == SKILL_JACKHAMMER_5)) {
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_FLIPKICK || event.skill.id == SKILL_FLIPKICK_2 || event.skill.id == SKILL_FLIPKICK_3)) {
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_RETALIATE)) {
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_GROWING_FURY || event.skill.id == (SKILL_GROWING_FURY + 1) || event.skill.id == (SKILL_GROWING_FURY + 29))) {
                    return false;
                }
                if (job == JOB_BRAWLER && (event.skill.id == SKILL_QUICK_DASH || event.skill.id == (SKILL_QUICK_DASH + 30))) {
                    return false;
                }
            }
            if (bullrushActive == true && event.skill.id != SKILL_BULLRUSH) {
                setTimeout(function() {
                    bullrushActive = false;
                }, 200);
            }
        }
    });
    dispatch.hook('S_START_COOLTIME_SKILL', 3, (event) => {
        if (!enabled) return;
        event.cooldown -= GLOBAL_LATENCY;
        if (event.skill.id == (SKILL_HAYMAKER_5) || event.skill.id == SKILL_HAYMAKER_6 || event.skill.id == SKILL_HAYMAKER_7) {
            clearTimeout(locking2);
            locking = true;
            locking2 = setTimeout(function() {
                locking = false;
            }, event.cooldown);
        }
        return true;
    });
    dispatch.hook('S_DECREASE_COOLTIME_SKILL', 3, (event) => {
        if (!enabled) return;
        if (event.skill.id == (SKILL_HAYMAKER_5) || event.skill.id == SKILL_HAYMAKER_6 || event.skill.id == SKILL_HAYMAKER_7) {
            clearTimeout(locking2);
            locking = true;
            locking2 = setTimeout(function() {
                locking = false;
            }, event.cooldown);
        }
    });
    dispatch.hook('S_PLAYER_STAT_UPDATE', dispatch.majorPatchVersion >= 95 ? 14 : 13, (event) => {
        if (!enabled) return;
        aspd = (event.attackSpeed + event.attackSpeedBonus) / 100;
    });
    dispatch.hook('C_NOTIFY_LOCATION_IN_ACTION', 4, (event) => {
        if (!enabled) return;
        if (lastSkill != SKILL_BULLRUSH || event.skill.id != SKILL_DIVINE_WRATH || event.skill.id != SKILL_RAMPAGE) {
            collisionLocX = event.loc.x;
            collisionLocY = event.loc.y;
            collisionLocZ = event.loc.z;
            collisionLocW = event.w;
            if (!((lastSkill == SKILL_DIVINE_WRATH || lastSkill == (SKILL_DIVINE_WRATH + 1)) && event.skill.id != SKILL_DIVINE_WRATH && event.skill.id != (SKILL_DIVINE_WRATH + 1))) {
                TruecollisionLocX = event.loc.x;
                TruecollisionLocY = event.loc.y;
                TruecollisionLocZ = event.loc.z;
            }
            setTimeout(function(event) {
                if (event.skill.id != SKILL_HAYMAKER || (!talgly && !talgly2 && !talgly3)) {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: event.skill.id,
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }
            }, 0, event);
            setTimeout(function(event) {
                if (event.skill.id != SKILL_HAYMAKER || (!talgly && !talgly2 && !talgly3)) {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: event.skill.id,
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }
            }, 100, event);
            if (event.skill.id == SKILL_HAYMAKER) {
                if (talgly == false && talgly2 == false && talgly3 == false) {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: SKILL_HAYMAKER_2,
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: SKILL_HAYMAKER_3,
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: SKILL_HAYMAKER_4,
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }
                if (talgly == true) {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: SKILL_HAYMAKER_5,
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: (SKILL_HAYMAKER_5 + 5),
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: (SKILL_HAYMAKER_5 + 6),
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }
                if (talgly2 == true) {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: SKILL_HAYMAKER_6,
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: (SKILL_HAYMAKER_6 + 5),
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: (SKILL_HAYMAKER_6 + 6),
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }
                if (talgly3 == true) {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: SKILL_HAYMAKER_7,
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: (SKILL_HAYMAKER_7 + 5),
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: (SKILL_HAYMAKER_7 + 6),
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }
                setTimeout(function(event) {
                    if (talgly == false && talgly2 == false && talgly3 == false) {
                        dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                            skill: SKILL_HAYMAKER_2,
                            stage: event.stage,
                            loc: {
                                x: event.loc.x,
                                y: event.loc.y,
                                z: event.loc.z
                            },
                            w: event.w,
                        });
                        dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                            skill: SKILL_HAYMAKER_3,
                            stage: event.stage,
                            loc: {
                                x: event.loc.x,
                                y: event.loc.y,
                                z: event.loc.z
                            },
                            w: event.w,
                        });
                        dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                            skill: SKILL_HAYMAKER_4,
                            stage: event.stage,
                            loc: {
                                x: event.loc.x,
                                y: event.loc.y,
                                z: event.loc.z
                            },
                            w: event.w,
                        });
                    }
                    if (talgly == true) {
                        dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                            skill: SKILL_HAYMAKER_5,
                            stage: event.stage,
                            loc: {
                                x: event.loc.x,
                                y: event.loc.y,
                                z: event.loc.z
                            },
                            w: event.w,
                        });
                        dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                            skill: (SKILL_HAYMAKER_5 + 5),
                            stage: event.stage,
                            loc: {
                                x: event.loc.x,
                                y: event.loc.y,
                                z: event.loc.z
                            },
                            w: event.w,
                        });
                        dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                            skill: (SKILL_HAYMAKER_5 + 6),
                            stage: event.stage,
                            loc: {
                                x: event.loc.x,
                                y: event.loc.y,
                                z: event.loc.z
                            },
                            w: event.w,
                        });
                    }
                    if (talgly2 == true) {
                        dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                            skill: SKILL_HAYMAKER_6,
                            stage: event.stage,
                            loc: {
                                x: event.loc.x,
                                y: event.loc.y,
                                z: event.loc.z
                            },
                            w: event.w,
                        });
                        dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                            skill: (SKILL_HAYMAKER_6 + 5),
                            stage: event.stage,
                            loc: {
                                x: event.loc.x,
                                y: event.loc.y,
                                z: event.loc.z
                            },
                            w: event.w,
                        });
                        dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                            skill: (SKILL_HAYMAKER_6 + 6),
                            stage: event.stage,
                            loc: {
                                x: event.loc.x,
                                y: event.loc.y,
                                z: event.loc.z
                            },
                            w: event.w,
                        });
                    }
                    if (talgly3 == true) {
                        dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                            skill: SKILL_HAYMAKER_7,
                            stage: event.stage,
                            loc: {
                                x: event.loc.x,
                                y: event.loc.y,
                                z: event.loc.z
                            },
                            w: event.w,
                        });
                        dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                            skill: (SKILL_HAYMAKER_7 + 5),
                            stage: event.stage,
                            loc: {
                                x: event.loc.x,
                                y: event.loc.y,
                                z: event.loc.z
                            },
                            w: event.w,
                        });
                        dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                            skill: (SKILL_HAYMAKER_7 + 6),
                            stage: event.stage,
                            loc: {
                                x: event.loc.x,
                                y: event.loc.y,
                                z: event.loc.z
                            },
                            w: event.w,
                        });
                    }
                }, 100, event);
            }
            if (event.skill.id == SKILL_JACKHAMMER) {
                dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                    skill: SKILL_JACKHAMMER_2,
                    stage: event.stage,
                    loc: {
                        x: event.loc.x,
                        y: event.loc.y,
                        z: event.loc.z
                    },
                    w: event.w,
                });
                dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                    skill: SKILL_JACKHAMMER_3,
                    stage: event.stage,
                    loc: {
                        x: event.loc.x,
                        y: event.loc.y,
                        z: event.loc.z
                    },
                    w: event.w,
                });
                dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                    skill: SKILL_JACKHAMMER_4,
                    stage: event.stage,
                    loc: {
                        x: event.loc.x,
                        y: event.loc.y,
                        z: event.loc.z
                    },
                    w: event.w,
                });
                dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                    skill: SKILL_JACKHAMMER_5,
                    stage: event.stage,
                    loc: {
                        x: event.loc.x,
                        y: event.loc.y,
                        z: event.loc.z
                    },
                    w: event.w,
                });
                setTimeout(function(event) {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: SKILL_JACKHAMMER_2,
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: SKILL_JACKHAMMER_3,
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: SKILL_JACKHAMMER_4,
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: SKILL_JACKHAMMER_5,
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }, 100, event);
            }
            if (event.skill.id == SKILL_PILEDRIVER) {
                dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                    skill: SKILL_PILEDRIVER_2,
                    stage: event.stage,
                    loc: {
                        x: event.loc.x,
                        y: event.loc.y,
                        z: event.loc.z
                    },
                    w: event.w,
                });
                dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                    skill: SKILL_PILEDRIVER_3,
                    stage: event.stage,
                    loc: {
                        x: event.loc.x,
                        y: event.loc.y,
                        z: event.loc.z
                    },
                    w: event.w,
                });
                dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                    skill: SKILL_PILEDRIVER_4,
                    stage: event.stage,
                    loc: {
                        x: event.loc.x,
                        y: event.loc.y,
                        z: event.loc.z
                    },
                    w: event.w,
                });
                dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                    skill: SKILL_PILEDRIVER_5,
                    stage: event.stage,
                    loc: {
                        x: event.loc.x,
                        y: event.loc.y,
                        z: event.loc.z
                    },
                    w: event.w,
                });
                setTimeout(function(event) {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: SKILL_PILEDRIVER_2,
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: SKILL_PILEDRIVER_3,
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: SKILL_PILEDRIVER_4,
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: SKILL_PILEDRIVER_5,
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }, 100, event);
            }
            if (event.skill.id == SKILL_ROUNDHOUSE_KICK) {
                dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                    skill: SKILL_ROUNDHOUSE_KICK_2,
                    stage: event.stage,
                    loc: {
                        x: event.loc.x,
                        y: event.loc.y,
                        z: event.loc.z
                    },
                    w: event.w,
                });
                setTimeout(function() {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: SKILL_ROUNDHOUSE_KICK_2,
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }, 100, event);
            }
            if (event.skill.id == SKILL_FLY_KICK) {
                dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                    skill: (SKILL_FLY_KICK + 30),
                    stage: event.stage,
                    loc: {
                        x: event.loc.x,
                        y: event.loc.y,
                        z: event.loc.z
                    },
                    w: event.w,
                });
                setTimeout(function() {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: (SKILL_FLY_KICK + 30),
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }, 100, event);
            }
            if (event.skill.id == (SKILL_FLY_KICK + 30)) {
                dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                    skill: SKILL_FLY_KICK,
                    stage: event.stage,
                    loc: {
                        x: event.loc.x,
                        y: event.loc.y,
                        z: event.loc.z
                    },
                    w: event.w,
                });
                setTimeout(function() {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: SKILL_FLY_KICK,
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }, 100, event);
            }
            if (event.skill.id == (SKILL_ONE_INCH)) {
                setTimeout(function() {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: (SKILL_ONE_INCH_2),
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }, 20, event);
                setTimeout(function() {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: (SKILL_ONE_INCH + 29),
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }, 20, event);
                setTimeout(function() {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: (SKILL_ONE_INCH + 30),
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }, 20, event);
            }
            if (event.skill.id == (SKILL_ONE_INCH_2)) {
                setTimeout(function() {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: (SKILL_ONE_INCH),
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }, 20, event);
                setTimeout(function() {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: (SKILL_ONE_INCH + 29),
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }, 20, event);
                setTimeout(function() {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: (SKILL_ONE_INCH + 30),
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }, 20, event);
            }
            if (event.skill.id == (SKILL_ONE_INCH + 29)) {
                setTimeout(function() {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: (SKILL_ONE_INCH_2),
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }, 20, event);
                setTimeout(function() {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: (SKILL_ONE_INCH),
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }, 20, event);
                setTimeout(function() {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: (SKILL_ONE_INCH + 30),
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }, 20, event);
            }
            if (event.skill.id == (SKILL_ONE_INCH + 30)) {
                setTimeout(function() {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: (SKILL_ONE_INCH_2),
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }, 20, event);
                setTimeout(function() {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: (SKILL_ONE_INCH + 29),
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }, 20, event);
                setTimeout(function() {
                    dispatch.toServer('C_NOTIFY_LOCATION_IN_ACTION', 4, {
                        skill: (SKILL_ONE_INCH),
                        stage: event.stage,
                        loc: {
                            x: event.loc.x,
                            y: event.loc.y,
                            z: event.loc.z
                        },
                        w: event.w,
                    });
                }, 20, event);
            }
            return false;
        }
    });
    dispatch.hook('C_CANCEL_SKILL', 3, (event) => {
        if (!enabled) return;
        if (job == JOB_BRAWLER && (event.skill.id == SKILL_DIVINE_WRATH || event.skill.id == (SKILL_DIVINE_WRATH + 1))) {
            lastSkill = 1;
            dispatch.toClient('S_ACTION_END', 5, {
                gameId: cid,
                loc: {
                    x: xloc,
                    y: yloc,
                    z: zloc
                },
                w: wloc,
                templateId: model,
                skill: SKILL_DIVINE_WRATH,
                type: 1,
                id: atkid[SKILL_DIVINE_WRATH],
            });
        }
    });
    dispatch.hook('C_PLAYER_LOCATION', 5, (event) => {
        if (!enabled) return;
        xloc = event.dest.x;
        yloc = event.dest.y;
        zloc = event.dest.z;
        wloc = event.w;
        timeloc = event.time + 1;
    });
    dispatch.hook('S_ACTION_STAGE', 9, (event) => {
        if (!enabled) return;
        if (event.gameId !== cid) {
            return;
        }
        if (event.skill.id == 1080101) {
            disabSkill[SKILL_RETALIATE] = true;
            Ignore1 = true;
        }
    });
    dispatch.hook('S_ACTION_END', 5, (event) => {
        if (event.skill == 67108401) console.log("error");
        if (!enabled) return;
        if (event.gameId !== cid) {
            return;
        }
        if (event.skill.id == 1080101) {
            disabSkill[SKILL_RETALIATE] = false;
            clearTimeout(Ignore2);
            Ignore2 = setTimeout(function() {
                Ignore1 = false;
            }, 400);
        }
    });
};