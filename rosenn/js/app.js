/**
 * @author raito.ochi
 */

/**
 * メインのクラス
 */
function App() {
    //================== コンストラクタ ==================//
    // Google Mapの初期化
    var map = new google.maps.Map(document.getElementById('map-canvas'), {
        zoom: 12,
        center: new google.maps.LatLng(35.694668, 139.743212)
    });

    // 各インスタンスを作成
    //var rosen_eki = new rosen_eki();
    var dataManager = new DataManager();
    var formManager = new FormManager();
    var bukkenViewManager = new BukkenViewManager(map);


    // 検索ボタンが押されたかどうかを50msごとに監視
    setInterval('app.watchButtonClicked();', 50);

    //===================== メソッド =====================//
    /**
     * 検索ボタンが押されていれば地図を更新する
     */
    this.watchButtonClicked = function() {
        // 検索ボタンが押されていなければ何もしない
        if (!formManager.isClicked()) return;
        search_count = 0;
        // 入力されている検索条件を取得
        var cond = formManager.getCond();

        // 検索条件に合致する物件のリストを取得
        var bukkenInfoList = dataManager.search(cond);
        //物件数取得
        search_count = bukkenInfoList.length;

        // 物件リストの各物件のピンを地図上に立てる
        bukkenViewManager.update(bukkenInfoList);
        
        //検索件数の表示
        //$("#total").html(Math.ceil(count_rosen_su));

    }
}

var app = new App();
