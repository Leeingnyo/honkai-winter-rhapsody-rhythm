var judger = {
  // 기준
  // 0 perfect 50 good 200 miss
  rule: {
    perfect: 50,
    good: 150,
    miss: 300
  },
  // 현재 시각과 노래 데이터를 주고 입력을 주면
  // 퍼펙트 굿 미스 를 판별하는 것
  judge: function (currentTime, song, input) {
    // 현재 시각과 근접한 판명 대상이 될 노트만 가져옴
    var missBound = this.rule.miss;
    var goodBound = this.rule.good;
    var perfectBound = this.rule.perfect;
    var bps = song.bpm / 60;
    var targetNote = song.notes.map(function (note, index) {
      var noteTime = note.beat / bps * 1000;
      note.noteTime = noteTime;
      note.index = index;
      return note;
    }).filter(function (note) {
      if (note.invalid) return false;
      return (currentTime - song.preDelay - missBound < note.noteTime && note.noteTime < currentTime - song.preDelay + missBound);
    }).map(function (note) {
      note.delta = note.noteTime - currentTime + song.preDelay;
      return note;
    }).sort(former)[0];
    if (!targetNote) return null;
    song.notes[targetNote.index].invalid = true;
    var score;
      var delta = targetNote.delta;
    if (targetNote.type !== input.type) score = MISS;
    else if (delta < -goodBound || goodBound < delta) score = MISS;
    else if (delta < -perfectBound || perfectBound < delta) score = GOOD;
    else score = PERFECT;
    song.notes[targetNote.index].score = score;
    return { score: score, note: targetNote };
  }
};
