
var Radio = function (stations) {
    var self = this;

    self.stations = stations;
    self.index = 0;

    // Setup the display for each station.
    for (var i = 0; i < self.stations.length; i++) {
        window['title' + i].innerHTML = '<b>' + self.stations[i].freq + '</b> ' + self.stations[i].title;
        window['station' + i].addEventListener('click', function (index) {
            var isNotPlaying = (self.stations[index].howl && !self.stations[index].howl.playing());

            radio.stop();

            if (isNotPlaying || !self.stations[index].howl) {
                radio.play(index);
            }
        }.bind(self, i));
    }
};

Radio.prototype = {
    play: function (index) {
        var self = this;
        var sound;

        index = typeof index === 'number' ? index : self.index;
        var data = self.stations[index];

        if (data.howl) {
            sound = data.howl;
        } else {
            sound = data.howl = new Howl({
                src: data.src,
                html5: true,
                format: ['mp3', 'aac']
            });
        }

        sound.play();

        self.toggleStationDisplay(index, true);

        self.index = index;
    },

    stop: function () {
        var self = this;

        var sound = self.stations[self.index].howl;

        self.toggleStationDisplay(self.index, false);

        if (sound) {
            sound.stop();
        }
    },

    toggleStationDisplay: function (index, state) {
        var self = this;

        window['station' + index].style.backgroundColor = state ? 'rgba(255, 255, 255, 0.33)' : '';

        window['live' + index].style.opacity = state ? 1 : 0;

        window['playing' + index].style.display = state ? 'block' : 'none';
    }
};


var radio = new Radio([
    {
        freq: '91.1',
        title: "Radio City",
        src: '../tracks/Closer (Demo).mp3',
        howl: null
    },
    {
        freq: '81.4',
        title: "BBC Radio 1",
        src: 'http://bbcmedia.ic.llnwd.net/stream/bbcmedia_radio1_mf_q',
        howl: null
    },
    {
        freq: '89.9',
        title: "Hip Hop Hits",
        src: 'http://tunein4.streamguys1.com/hhbeafree5',
        howl: null
    },
    {
        freq: '98.3',
        title: "Radio  Mirchi",
        src: 'http://peridot.streamguys.com:7150/Mirchi',
        howl: null
    },
    {
        freq: '103.3',
        title: "80's Hits",
        src: 'http://tunein4.streamguys1.com/80shtfree1',
        howl: null
    }]);
//view rawradio.js hosted with ❤ by GitHub