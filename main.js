song_1 = "";
song_2 = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
Song_status = ""

function preload() {
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");

}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, ModelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreLeftWrist = " + scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X= " + leftWristX + " Left Wrist Y= " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X= " + rightWristX + " Right Wrist Y= " + rightWristY);
    }


}

function ModelLoaded() {
    console.log("PoseNet is initialized");
}

function draw() {
    image(video, 0, 0, 600, 500)

    Song_status = song_1.isPlaying();

    if (scoreLeftWrist > 0.2) {
        fill("#FF0000")
        stroke("#FF0000")
        song_2.stop();
        if(Song_status=="false"){
            song_1.play();
            document.getElementById("song_name").innerHTML="Song Name: " + "Peter Pan Song"
        }
    }
}

function play() {
    song.play();
}