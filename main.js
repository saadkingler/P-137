status = "";
objects=[];
function preload()
{

}

function setup()
{
    canvas = createCanvas(380,250);
    canvas.position(500,280)
    video = createCapture(380,250);
    video.hide();
}

function draw()
{
    image(video,0,0,380,250);
    if(status!="")
    {
        objectDetector.detect(video,gotresults);
        for(i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "status: Detecting Objects";
            fill("#FF0000");
            persent = floor(objects[i].confidence *100);
            text(objects[i].label+""+persent+"%",objects[i].x+15,objects[i].y+15);
            noFill();
            stroke("#FF0000");
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);

            if(objects[i].label==object_name)
            {
                video.stop();
                objectDetector.detect(gotresults);
                document.getElementById("object_status").innerHTML = object_name + "Found";
                synth = window.speechSynthesis;
                utterthis = new SpeechSynthesisUtterance(object_name + "Found");
                synth.speak(utterthis);
            }
            else
            {
                document.getElementById("object_status").innerHTML = object_name + "Not Found";
            }
        }
    }
}

function start()
{
    detector = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    object_name = document.getElementById("id_of_the_input_box").value;
}

function modelloaded()
{
    console.log("Model loaded");
    status = true;
}

function gotresults(error,results)
{
    if(error)
    {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}