function FormManager() {
    //================== コンストラクタ ==================//
    var searchButton = document.getElementById('search-button');
    searchButton.onclick = function () {
        clicked = true;
    }
    
    var rosen1 = new FormPulldowm('rosen1',//Html上の名前
        [
            {'text': '路線名を選択して下さい', 'cond': {}},
            {'text': '銀座線', 'cond': {'rosen1.pm': '銀座線'}},
            {'text': '丸ノ内線', 'cond': {'rosen1.pm': '丸ノ内線'}},
            {'text': '日比谷線', 'cond': {'rosen1.pm': '日比谷線'}},
            {'text': '東西線', 'cond': {'rosen1.pm': '東西線'}},
            {'text': '千代田線', 'cond': {'rosen1.pm': '千代田線'}},
            {'text': '有楽町線', 'cond': {'rosen1.pm': '有楽町線'}},
            {'text': '半蔵門線', 'cond': {'rosen1.pm': '半蔵門線'}},
            {'text': '南北線', 'cond': {'rosen1.pm': '南北線'}},
            {'text': '副都心線', 'cond': {'rosen1.pm': '副都心線'}},
            {'text': '都営浅草線', 'cond': {'rosen1.pm': '都営浅草線'}},
            {'text': '都営三田線', 'cond': {'rosen1.pm': '都営三田線'}},
            {'text': '都営新宿線', 'cond': {'rosen1.pm': '都営新宿線'}},
            {'text': '都営大江戸線', 'cond': {'rosen1.pm': '都営大江戸線'}},
            {'text': 'JR山手線', 'cond': {'rosen1.pm': 'JR山手線'}},
        ]
    );

    var chikunensu = new FormPulldowm('chikunensu', [
        {
            'text': '',
            'cond': {}
        },
        {
            'text': '新築（築1年以内）',
            'cond': {
                'chikunensu.to': 1
            }
        },
        {
            'text': '3年以内',
            'cond': {
                'chikunensu.to': 3
            }
        },
        {
            'text': '5年以内',
            'cond': {
                'chikunensu.to': 5
            }
        },
        {
            'text': '10年以内',
            'cond': {
                'chikunensu.to': 10
            }
        },
        {
            'text': '15年以内',
            'cond': {
                'chikunensu.to': 15
            }
        },
        {
            'text': '20年以内',
            'cond': {
                'chikunensu.to': 20
            }
        },
        {
            'text': '30年以内',
            'cond': {
                'chikunensu.to': 30
            }
        },
        ]);
    var sikikin = new FormCheckboxChecked('shikikin', 'shikikin');
    var reikin = new FormCheckboxChecked('reikin', 'reikin');
    var chinryo_from = new FormTextNumber('chinryo_from', 'chinryo.from');
    var chinryo_to = new FormTextNumber('chinryo_to', 'chinryo.to');
    var madori = new FormCheckboxList('madori', 'madori');
    var forms = [
        chikunensu,
        sikikin,
        reikin,
        chinryo_from,
        chinryo_to,
        madori,
    ];

    var clicked = false;

    //===================== メソッド =====================//
    this.isClicked = function () {
        return clicked;
    }

    this.getCond = function () {
        clicked = false;
        var cond = {};
        for (var form of forms) {
            var c = form.getCond()
            for (var key in c) {
                cond[key] = c[key];
            }
        }
        return cond;
    }
}

function FormCheckboxChecked(elemId, columnName) {
    //================== コンストラクタ ==================//
    var element = document.getElementById(elemId);

    //===================== メソッド =====================//
    this.getCond = function () {
        var cond = {};
        if (element.checked) {
            cond[columnName] = 0;
        }
        return cond;
    }
}

function FormCheckboxList(elemName, columnName) {
    //================== コンストラクタ ==================//
    var elements = document.getElementsByName(elemName);

    //===================== メソッド =====================//
    this.getCond = function () {
        var values = [];
        for (var elem of elements) {
            if (elem.checked) {
                values.push(elem.value);
            }
        }
        var cond = {};
        if (values.length) {
            cond[columnName + '.in'] = values;
        }
        return cond;
    }
}

function FormTextNumber(elemId, columnName) {
    //================== コンストラクタ ==================//
    var element = document.getElementById(elemId);

    function isValid() {
        if (element.value.match(/\d+/)) {
            return true;
        } else {
            return false;
        }
    }

    //===================== メソッド =====================//
    this.getCond = function () {
        var cond = {};
        if (isValid()) {
            cond[columnName] = parseInt(element.value);
        }
        return cond;
    }
}

function FormPulldowm(elemId, optionList) {
    //================== コンストラクタ ==================//
    var element = document.getElementById(elemId);

    var conds = [];
    var innerHTML = '';
    for (var option of optionList) {
        var dom = document.createElement('option');
        dom.innerHTML = option.text;
        innerHTML += dom.outerHTML;
        conds.push(option.cond);
    }
    element.innerHTML = innerHTML;

    //===================== メソッド =====================//
    this.getCond = function () {
        var selected = element.selectedIndex;
        return conds[selected];
    }

}