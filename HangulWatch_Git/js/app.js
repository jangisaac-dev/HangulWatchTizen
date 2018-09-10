/*
 * Copyright (c) 2015 Samsung Electronics Co., Ltd. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

(function() {
	var timerUpdateDate = 0, flagDigital = false, lastestMinute = 3000, lastestHour = 100,
		interval, 
		BACKGROUND_URL = "url('./images/bg.png')", 
		arrDay = [ "일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일" ], 

		arrDocumentFirst = [ "str-han", "str-doo", "str-se", "str-ne", "str-da","str-dasut" ], 
		arrDocumentSecond = [ "str-yeo", "str-yeosut", "str-il", "str-ilgop", "str-yeod", "str-yeodulb" ], 
		arrDocumentThird = ["str-ah", "str-ahop", "str-yeol", "str-yeolhan", "str-yeoldool","str-si" ],

		arrDocumentFourth = [ "str-ja", "str-ee", "str-sam", "str-sa", "str-oo","str-sib" ], 
		arrDocumentFifth = [ "str-jungbun", "str-ilbun", "str-eebun", "str-sambun", "str-sabun", "str-yugbun" ], 
		arrDocumentSixth = ["str-jungoh", "str-ohbun", "str-chilbun", "str-palbun", "str-gubun", "str-bun" ],

		arrStringFirst = [ "한", "&nbsp두", "&nbsp세", "&nbsp네", "&nbsp다", "&nbsp섯" ], 
		arrStringSecond = ["여", "&nbsp섯", "&nbsp일", "&nbsp곱", "&nbsp여", "&nbsp덟" ], 
		arrStringThird = ["아", "&nbsp홉", "&nbsp열", "&nbsp한", "&nbsp두", "&nbsp시" ],

		arrStringFourth = [ "자", "&nbsp이", "&nbsp삼", "&nbsp사", "&nbsp오", "&nbsp십" ], 
		arrStringFifth = ["정", "&nbsp일", "&nbsp이", "&nbsp삼", "&nbsp사", "&nbsp육" ], 
		arrStringSixth = ["오", "&nbsp오", "&nbsp칠", "&nbsp팔", "&nbsp구", "&nbsp분" ];

	    
    
    function resetView(bool) { // bool이 true면 시간, 아니면 분
		var i;
		if (bool) {
			for (i = 0; i < 6; i++) {
				document.getElementById(arrDocumentFirst[i]).innerHTML = "<span style='color: #454545;'>" + arrStringFirst[i] + "</span>";
			}
			for (i = 0; i < 6; i++) {
				document.getElementById(arrDocumentSecond[i]).innerHTML = "<span style='color: #454545;'>" + arrStringSecond[i] + "</span>";
			}
			for (i = 0; i < 6; i++) {
				document.getElementById(arrDocumentThird[i]).innerHTML = "<span style='color: #454545;'>" + arrStringThird[i] + "</span>";
			}
		} else {
			for (i = 0; i < 6; i++) {
				document.getElementById(arrDocumentFourth[i]).innerHTML = "<span style='color: #454545;'>" + arrStringFourth[i] + "</span>";
			}
			for (i = 0; i < 6; i++) {
				document.getElementById(arrDocumentFifth[i]).innerHTML = "<span style='color: #454545;'>" + arrStringFifth[i] + "</span>";
			}
			for (i = 0; i < 6; i++) {
				document.getElementById(arrDocumentSixth[i]).innerHTML = "<span style='color: #454545;'>" + arrStringSixth[i] + "</span>";
			}
		}
	}

    function settingView(bool, hour, minute) {
		var tenMinute = false;
		if (bool) {// 시 세팅
			if (hour > 12) {
				hour = hour - 12;
			}
			switch (hour) {
			case 1:
				document.getElementById("str-han").innerHTML = "<span style='color: white;'>한</span>";
				break;
			case 2:
				document.getElementById("str-doo").innerHTML = "<span style='color: white;'>&nbsp두</span>";
				break;
			case 3:
				document.getElementById("str-se").innerHTML = "<span style='color: white;'>&nbsp세</span>";
				break;
			case 4:
				document.getElementById("str-ne").innerHTML = "<span style='color: white;'>&nbsp네</span>";
				break;
			case 5:
				document.getElementById("str-da").innerHTML = "<span style='color: white;'>&nbsp다</span>";
				document.getElementById("str-dasut").innerHTML = "<span style='color: white;'>&nbsp섯</span>";
				break;
			case 6:
				document.getElementById("str-yeo").innerHTML = "<span style='color: white;'>여</span>";
				document.getElementById("str-yeosut").innerHTML = "<span style='color: white;'>&nbsp섯</span>";
				break;
			case 7:
				document.getElementById("str-il").innerHTML = "<span style='color: white;'>&nbsp일</span>";
				document.getElementById("str-ilgop").innerHTML = "<span style='color: white;'>&nbsp곱</span>";
				break;
			case 8:
				document.getElementById("str-yeod").innerHTML = "<span style='color: white;'>&nbsp여</span>";
				document.getElementById("str-yeodulb").innerHTML = "<span style='color: white;'>&nbsp덟</span>";
				break;
			case 9:
				document.getElementById("str-ah").innerHTML = "<span style='color: white;'>아</span>";
				document.getElementById("str-ahop").innerHTML = "<span style='color: white;'>&nbsp홉</span>";
				break;
			case 10:
				document.getElementById("str-yeol").innerHTML = "<span style='color: white;'>&nbsp열</span>";
				break;
			case 11:
				document.getElementById("str-yeol").innerHTML = "<span style='color: white;'>&nbsp열</span>";
				document.getElementById("str-yeolhan").innerHTML = "<span style='color: white;'>&nbsp한</span>";
				break;
			case 12 || 0:
				document.getElementById("str-yeol").innerHTML = "<span style='color: white;'>&nbsp열</span>";
				document.getElementById("str-yeoldool").innerHTML = "<span style='color: white;'>&nbsp두</span>";
				break;
			default:
				break;
			}
			document.getElementById("str-si").innerHTML = "<span style='color: white;'>&nbsp시</span>";
		} else {// 분 세팅
			if (minute > 9) {
				if (minute > 19) {
					if (minute > 29) {
						if (minute > 39) {
							if (minute > 49) {
								document.getElementById("str-oo").innerHTML = "<span style='color: white;'>&nbsp오</span>";
								minute = minute - 50;
							} else {
								document.getElementById("str-sa").innerHTML = "<span style='color: white;'>&nbsp사</span>";
								minute = minute - 40;
							}
						} else {
							document.getElementById("str-sam").innerHTML = "<span style='color: white;'>&nbsp삼</span>";
							minute = minute - 30;
						}
					} else {
						document.getElementById("str-ee").innerHTML = "<span style='color: white;'>&nbsp이</span>";
						minute = minute - 20;
					}
				} else {
					minute = minute - 10;
				}
				document.getElementById("str-sib").innerHTML = "<span style='color: white;'>&nbsp십</span>";
				tenMinute = true;
			}
			switch (minute) {
			case 0:
				if (hour == 12) {
					document.getElementById("str-jungoh").innerHTML = "<span style='color: white;'>오</span>";
				} else if (hour == 0 || hour == 24) {
					document.getElementById("str-ja").innerHTML = "<span style='color: white;'>자</span>";
				} else {
					document.getElementById("str-bun").innerHTML = "<span style='color: white;'>&nbsp분</span>";
				}
				if (!tenMinute) {
					document.getElementById("str-jungbun").innerHTML = "<span style='color: white;'>정</span>";
				}
				break;
			case 1:
				document.getElementById("str-ilbun").innerHTML = "<span style='color: white;'>&nbsp일</span>";
				document.getElementById("str-bun").innerHTML = "<span style='color: white;'>&nbsp분</span>";
				break;
			case 2:
				document.getElementById("str-eebun").innerHTML = "<span style='color: white;'>&nbsp이</span>";
				document.getElementById("str-bun").innerHTML = "<span style='color: white;'>&nbsp분</span>";
				break;
			case 3:
				document.getElementById("str-sambun").innerHTML = "<span style='color: white;'>&nbsp삼</span>";
				document.getElementById("str-bun").innerHTML = "<span style='color: white;'>&nbsp분</span>";
				break;
			case 4:
				document.getElementById("str-sabun").innerHTML = "<span style='color: white;'>&nbsp사</span>";
				document.getElementById("str-bun").innerHTML = "<span style='color: white;'>&nbsp분</span>";
				break;
			case 5:
				document.getElementById("str-ohbun").innerHTML = "<span style='color: white;'>&nbsp오</span>";
				document.getElementById("str-bun").innerHTML = "<span style='color: white;'>&nbsp분</span>";
				break;
			case 6:
				document.getElementById("str-yugbun").innerHTML = "<span style='color: white;'>&nbsp육</span>";
				document.getElementById("str-bun").innerHTML = "<span style='color: white;'>&nbsp분</span>";
				break;
			case 7:
				document.getElementById("str-chilbun").innerHTML = "<span style='color: white;'>&nbsp칠</span>";
				document.getElementById("str-bun").innerHTML = "<span style='color: white;'>&nbsp분</span>";
				break;
			case 8:
				document.getElementById("str-palbun").innerHTML = "<span style='color: white;'>&nbsp팔</span>";
				document.getElementById("str-bun").innerHTML = "<span style='color: white;'>&nbsp분</span>";
				break;
			case 9:
				document.getElementById("str-gubun").innerHTML = "<span style='color: white;'>&nbsp구</span>";
				document.getElementById("str-bun").innerHTML = "<span style='color: white;'>&nbsp분</span>";
				break;
			default:
				break;
			}

		}
	}
	function settingSecond(second) {
		var strTicspace = document.getElementById("str-ticspace"), 
			hanSecond = "";
		if (second > 9) {
			if (second > 19) {
				if (second > 29) {
					if (second > 39) {
						if (second > 49) {
							hanSecond = "오";
							second = second - 50;
						} else {
							hanSecond = "사";
							second = second - 40;
						}
					} else {
						hanSecond = "삼";
						second = second - 30;
					}
				} else {
					hanSecond = "이";
					second = second - 20;
				}
			} else {
				second = second - 10;
			}
			hanSecond = hanSecond + "십";
		}
		switch (second) {
		case 1:
			hanSecond = hanSecond + "&nbsp일";
			break;
		case 2:
			hanSecond = hanSecond + "&nbsp이";
			break;
		case 3:
			hanSecond = hanSecond + "&nbsp삼";
			break;
		case 4:
			hanSecond = hanSecond + "&nbsp사";
			break;
		case 5:
			hanSecond = hanSecond + "&nbsp오";
			break;
		case 6:
			hanSecond = hanSecond + "&nbsp육";
			break;
		case 7:
			hanSecond = hanSecond + "&nbsp칠";
			break;
		case 8:
			hanSecond = hanSecond + "&nbsp팔";
			break;
		case 9:
			hanSecond = hanSecond + "&nbsp구";
			break;
		default:
			break;
		}
		if (second == 0)
		{
			strTicspace.innerHTML = "";
		}
		strTicspace.innerHTML = hanSecond + "초";
	}

    /**
	 * Updates the date and sets refresh callback on the next day.
	 * 
	 * @private
	 * @param {number}
	 *            prevDay - date of the previous day
	 */
    function updateDate(prevDay) {
        var datetime = tizen.time.getCurrentDateTime(),
            nextInterval,
            strFullDate,
            strTictok = document.getElementById("str-tictok"),
            getDay = datetime.getDay(),
            getDate = datetime.getDate(),
            getMonth = datetime.getMonth()+1;

        if (prevDay !== null) {
            if (prevDay === getDay) {
                nextInterval = 1000;
            } else {
                nextInterval =
                    (23 - datetime.getHours()) * 60 * 60 * 1000 +
                    (59 - datetime.getMinutes()) * 60 * 1000 +
                    (59 - datetime.getSeconds()) * 1000 +
                    (1000 - datetime.getMilliseconds()) +
                    1;
            }
        }
        
        if (getDate < 10) {
            getDate = "0" + getDate;
        }
        if (getMonth < 10) {
        	getMonth = "0" + getMonth;
		}

        strFullDate = getMonth + "월" + getDate + "일&nbsp" + arrDay[getDay];
        strTictok.innerHTML = strFullDate;

        // If an updateDate timer already exists, clear the previous timer.
        if (timerUpdateDate) {
            clearTimeout(timerUpdateDate);
        }

        // Set next timeout for date update.
        timerUpdateDate = setTimeout(function() {
            updateDate(getDay);
        }, nextInterval);
    }

    /**
     * Updates the current time.
     * @private
     */
    function updateTime() {
        var datetime = tizen.time.getCurrentDateTime(),
        	hour = datetime.getHours(),
        	minute = datetime.getMinutes(),
        	second = datetime.getSeconds();
        
        settingSecond(second);
        
        
        
        if (lastestMinute != minute)
        {
        	resetView(false);
			settingView(false, hour, minute);
			lastestMinute = minute;
        	if (lastestHour != hour) {
				resetView(true);
				settingView(true, hour, minute);
				lastestHour = hour;
			}
        }
        /*
        if(flagDigital) {
            if (flagConsole) {
            	strTictok.style.visibility = "visible";
                flagConsole = false;
            } else {
            	strTictok.style.visibility = "hidden";
                flagConsole = true;
            }
        }
        else {
        	strTictok.style.visibility = "visible";
            flagConsole = false;
        }
         */
        /*
        strHours.innerHTML = hour;
        strMinutes.innerHTML = minute;

        if (hour < 12) {
            strAmpm.innerHTML = "AM";
            if (hour < 10) {
                strHours.innerHTML = "0" + hour;
            }
        } else {
            strAmpm.innerHTML = "PM";
        }

        if (minute < 10) {
            strMinutes.innerHTML = "0" + minute;
        }
        

        // Each 0.5 second the visibility of flagConsole is changed.
        if(flagDigital) {
            if (flagConsole) {
                strConsole.style.visibility = "visible";
                flagConsole = false;
            } else {
                strConsole.style.visibility = "hidden";
                flagConsole = true;
            }
        }
        else {
            strConsole.style.visibility = "visible";
            flagConsole = false;
        }
        */
        
    }

    /**
     * Sets to background image as BACKGROUND_URL,
     * and starts timer for normal digital watch mode.
     * @private
     */
    function initDigitalWatch() {
        flagDigital = true;
        document.getElementById("digital-body").style.backgroundImage = BACKGROUND_URL;
        interval = setInterval(updateTime, 500);
    }

    /**
     * Clears timer and sets background image as none for ambient digital watch mode.
     * @private
     */
    function ambientDigitalWatch() {
        flagDigital = false;
        clearInterval(interval);
        document.getElementById("digital-body").style.backgroundImage = "none";
        updateTime();
    }

    /**
     * Gets battery state.
     * Updates battery level.
     * @private
     */
//    function getBatteryState() {
//        var batteryLevel = Math.floor(battery.level * 10),
//            batteryFill = document.getElementById("battery-fill");
//        batteryLevel = batteryLevel + 1;
//        batteryFill.style.width = batteryLevel + "%";
//    }

    /**
     * Updates watch screen. (time and date)
     * @private
     */
    function updateWatch() {
        updateTime();
        updateDate(0);
    }

    /**
     * Binds events.
     * @private
     */
    function bindEvents() {
        // add eventListener for battery state
//        battery.addEventListener("chargingchange", getBatteryState);
//        battery.addEventListener("chargingtimechange", getBatteryState);
//        battery.addEventListener("dischargingtimechange", getBatteryState);
//        battery.addEventListener("levelchange", getBatteryState);

        // add eventListener for timetick
        window.addEventListener("timetick", function() {
            ambientDigitalWatch();
        });

        // add eventListener for ambientmodechanged
        window.addEventListener("ambientmodechanged", function(e) {
            if (e.detail.ambientMode === true) {
                // rendering ambient mode case
                ambientDigitalWatch();

            } else {
                // rendering normal digital mode case
                initDigitalWatch();
            }
        });

        // add eventListener to update the screen immediately when the device wakes up.
        document.addEventListener("visibilitychange", function() {
            if (!document.hidden) {
                updateWatch();
            }
        });

        // add event listeners to update watch screen when the time zone is changed.
        tizen.time.setTimezoneChangeListener(function() {
            updateWatch();
        });
    }

    /**
     * Initializes date and time.
     * Sets to digital mode.
     * @private
     */
    function init() {
        initDigitalWatch();
        updateDate(0);

        bindEvents();
    }

    window.onload = init();
}());
