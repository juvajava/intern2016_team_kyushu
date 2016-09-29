/**
 * 物件データのロード、加工、検索を行う
 * ロードと加工に関しては別クラスに分離している
 */
function DataManager() {
    "use strict";
    //================== コンストラクタ ==================//
    var loader = new BukkenDataLoader();

    //===================== 内部関数 =====================//
    function makeFilters(cond) {
        /**
         * フィルター関数の作成を行う関数群
         */
        function makeEqFilter(key) {
            console.log("Eq");
            var cond_value = cond[key];
            return function (data) {
                return data[key] === cond_value;
            }
        }

        //路線（部分一致）フィルター
        function makePmFilter(key,rosen_num_1,rosen_num_2) {
            console.log("Pm");
            //console.log(key);
            //console.log(rosen_num);
            var cond_value = cond[key];
            //var data_key = key.slice(0, -3);
            var data_key_1 = rosen_num_1;
            var data_key_2 = rosen_num_2;
            return function (data) {

                if (data[data_key_1] == null) {
                    console.log("null");
                    return false;
                }
                
                
                switch(cond_value){
                    case 28001://
                        return multi_serch_rosen(data[data_key_1],data[data_key_2],GINZA);
                        break;
                    case 28002://
                        return multi_serch_rosen(data[data_key_1],data[data_key_2],MARUNOUCHI);
                        break;
                    case 28003://
                        return multi_serch_rosen(data[data_key_1],data[data_key_2],HIBIYA);
                        break;
                    case 28004://
                        return multi_serch_rosen(data[data_key_1],data[data_key_2],TOUZAI);
                        break;
                    case 28005://
                        return multi_serch_rosen(data[data_key_1],data[data_key_2],CHIYODA);
                        break;
                    case 28006://
                        return multi_serch_rosen(data[data_key_1],data[data_key_2],YURAKU);
                        break;
                    case 28007://
                        return multi_serch_rosen(data[data_key_1],data[data_key_2],HANZO);
                        break;
                    case 28009://
                        return multi_serch_rosen(data[data_key_1],data[data_key_2],NANBOKU);
                        break;
                    case 28010://
                        return multi_serch_rosen(data[data_key_1],data[data_key_2],HUKUTOSHIN);
                        break;
                    case 99302://
                        return multi_serch_rosen(data[data_key_1],data[data_key_2],T_ASAKUSA);
                        break;
                    case 99303://
                        return multi_serch_rosen(data[data_key_1],data[data_key_2],T_MITA);
                        break;
                    case 99304://
                        return multi_serch_rosen(data[data_key_1],data[data_key_2],T_SHINJUKU);
                        break;
                    case 99301://
                        return multi_serch_rosen(data[data_key_1],data[data_key_2],T_OEDO);
                        break;
                    case 11302://
                        return multi_serch_rosen(data[data_key_1],data[data_key_2],JR_YAMANOTE);
                        break;
                    case 101://
                        return multi_serch_rosen(data[data_key_1],data[data_key_2],JR_TYUOH);
                        break;
                }
                

                //return data[data_key].match(cond_value);
            }
        }
        
        // 路線判定関数（駅名完全一致）
        function rosen_search(ekimei_data,eki_list){
            
            var ekimei = ensen_eki_cut(ekimei_data);
            
            for (var i = 0; i < eki_list.length; i++) {
                
                //console.log("駅名 = " + ekimei);
                //console.log("駅リスト = " + eki_list[i]);
                
                if ( ekimei == eki_list[i] ) {
                    //console.log("true");
                    return true;
                } else {
                    //console.log("false");
                }
            }
            
            /*  部分一致版
                //console.log(i);
                    if (ekimei.indexOf(eki_list[i]) != -1) {
                        //console.log("data" + data);
                        //console.log("array" + array[i]);
                        return true;
                    } else {
                        //console.log("data" + data);
                        //console.log("array" + array[i]);
                        //return false;
                    }
                }
            */
            
            return false;
        }
        
        
        // 路線判定関数（複数）
        function multi_serch_rosen(data_1,data_2,ROSEN){
            
            if ( rosen_search(data_1,ROSEN) == true ){
                //search_count++;
                return true;
            } else {
                if ( data_2 == null ){
                    return false;
                }
                
                
                if (rosen_search(data_2,ROSEN) == true ){
                    console.log(count_rosen_su += 1);
                    //search_count++;
                    return true;
                } else {
                    return false;
                }
            }
        }
        
        // 物件データから沿線名,駅名を分離する関数
        function ensen_eki_cut(eki_info){
            
            var ekimei;
            
            if ( eki_info.indexOf("各停") != -1 ){
                ekimei = eki_info.slice( eki_info.indexOf("各停") + 3 );
            } else if ( eki_info.indexOf("快速") != -1 ){
                 ekimei = eki_info.slice( eki_info.indexOf("快速") + 3 ); 
            
                
            } else if ( eki_info.indexOf("線") != -1){
                ekimei = eki_info.slice( eki_info.indexOf("線") + 2 ); 
            } else {
                ekimei = eki_info;
            }
            
            //console.log(ekimei);
            
            return ekimei.slice(0,-1);
            
        }

        function makeLeFilter(key) {
            console.log("Le");
            var cond_value = cond[key];
            var data_key = key.slice(0, -3);
            return function (data) {
                if (data[data_key] == null){
                    return false;
                }else{
                    return data[data_key] <= cond_value;
                }
            }
        }
        
        // MultiLeFilter
        function makeMultiLeFilter(key,data1,data2) {
            console.log("MulLe");
            var cond_value = cond[key];
            
            return function (data) {
                if (data[data1] == null){
                    return false;
                }
                
                if ( data[data1] <= cond_value ){
                    return true;
                } else if ( data[data2] <= cond_value ) {
                    return true;
                } else {
                    return false;
                } 
            } 
        }

        function makeGeFilter(key) {
            console.log("Ge");
            var cond_value = cond[key];
            var data_key = key.slice(0, -5);
            return function (data) {
                return data[data_key] >= cond_value;
            }
        }


        function makeInFilter(key) {
            console.log("In");
            var cond_value = cond[key];
            var data_key = key.slice(0, -3);
            return function (data) {
                return cond_value.includes(data[data_key]);
            }
        }

        /**
         * 配列に対して適用するフィルター群を検索条件をもとに作成する
         * key の末尾に応じて検索方法を変更する
         *    + '.to'：上限
         *    + '.from'：下限
         *    + '.in': 包含
         *    + その他：厳密一致
         *    + '.pm':部分一致
         */
        var filters = [];
        for (var key in cond) {
            if (cond[key] == null) continue;
            if (key.slice(-3) === '.to') {
                filters.push(makeLeFilter(key));
            } else if (key.slice(-3) === '.et') {      // 駅徒歩用
                filters.push(makeMultiLeFilter(key,'ekitoho1','ekitoho2'));
            } else if (key.slice(-5) === '.from') {
                filters.push(makeGeFilter(key));
            } else if (key.slice(-3) === '.in') {
                filters.push(makeInFilter(key));
            } else if (key.slice(-3) === '.pm') { // 部分一致フィルター
                filters.push(makePmFilter(key,'rosen1','rosen2'));
                //filters.push(makePmFilter(key,'rosen2'));
            } else {
                filters.push(makeEqFilter(key));
            }
        }
    }

    //===================== メソッド =====================//
    this.search = function (cond) {
        var dataList = loader.getDataList(); //物件データ
        var filters = makeFilters(cond); //フォームの情報をフィルターに渡す
        return dataList.filter(function (data) {
            return filters.every(function (e, i, a) {
                return e(data);
            });
        })
    }
}


/**
 * 物件データのロードと加工を行う
 */
function BukkenDataLoader() {
    //================== コンストラクタ ==================//
    var bukkenDataList = [];
    load();

    //===================== 内部関数 =====================//
    /**
     * 物件データを取得する
     */
    function load() {
        for (var i = 0; i < 10; i++) {
            $.get('http://192.168.10.2/chinshaku_' + ('00' + i).slice(-3) + '_.json',
                function (items) {
                    for (var rawData of items) {
                        bukkenDataList.push(modifyChinshaku(rawData));
                    }
                }
            )
        }
    }

    /**
     * いい生活データをパースする
     */
    function modifyChinshaku(rawData) {
        var data = {};
        // 物件名称
        if (rawData.tatemono_name) {
            data.tatemono_name = rawData.tatemono_name.trim();
        } else {
            data.tatemono_name = '';
        }
        // 緯度・経度
        data.lat = rawData.ido / 3600000;
        data.lng = rawData.keido / 3600000;
        // 賃料、敷金、礼金[円]
        data.chinryo = rawData.chinshaku_boshu_joken_view.chinryo;
        data.shikikin = rawData.chinshaku_boshu_joken_view.shikikin_en;
        data.reikin = rawData.chinshaku_boshu_joken_view.reikin_en;
        // 築年数
        if (rawData.shunko_datejun) {
            shunko_date = parseDatejun(rawData.shunko_datejun);
            var now = new Date();
            // 近似的に年数を計算。うるう年があるとずれる
            data.chikunensu = Math.floor((now - shunko_date) / (1000 * 60 * 60 * 24 * 365));
        }
        // 間取り。like 1K、1R、2LDK
        data.madori = rawData.madori_name;

        // 最寄駅。
        data.rosen1 = rawData.kotsu_ensen_eki_1;
        data.rosen2 = rawData.kotsu_ensen_eki_2;
        
        data.ekitoho1 = rawData.kotsu_ekitoho_1;
        data.ekitoho2 = rawData.kotsu_ekitoho_2;

        //console.log(data);

        return data;
    }

    /**
     * 年月日旬[int]→年月日[Date]
     */
    function parseDatejun(datejun) {
        var jun = datejun % 10;
        var day = datejun / 10 % 100;
        var month = datejun / 1000 % 100;
        var year = datejun / 100000;
        // 近似的に上旬→1日、中旬→11日、下旬→21日
        if (day === 0) {
            if (jun === 1) {
                day = 1;
            } else if (jun === 2) {
                day = 11;
            } else if (jun === 3) {
                day = 21;
            }
        }
        // JSでは1月=0、2月=1、・・・、12月=11
        return new Date(year, month - 1, day);
    }

    //===================== メソッド =====================//
    this.getDataList = function () {
        return bukkenDataList;
    }
}