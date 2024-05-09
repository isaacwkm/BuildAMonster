class Monster extends Phaser.Scene {
    constructor() {
        super("monsterScene");
        this.my = {sprite: {}};  // Create an object to hold sprite bindings

        //Create constants for the monster location
        this.bodyX = 300;
        this.bodyY = 350;

        // Define the locations of the smile and hands relative to the
        // main body location. This way, if we change the main body
        // location, the other values update too.
        this.smileX = this.bodyX;
        this.smileY = this.bodyY + 40;

        this.leftHandX = this.bodyX - 125;
        this.leftHandY = this.bodyY + 80;

        this.rightHandX = this.bodyX + 110;
        this.rightHandY = this.bodyY + 80;

        this.leftLegX = this.bodyX - 70;
        this.leftLegY = this.bodyY + 140;

        this.rightLegX = this.bodyX + 70;
        this.rightLegY = this.bodyY + 140;

        this.rightEarX = this.bodyX + 80;
        this.rightEarY = this.bodyY - 65;

        this.leftEarX = this.bodyX - 80;
        this.leftEarY = this.bodyY - 65;

        this.eyeX = this.bodyX;
        this.eyeY = this.bodyY - 10;

        this.eyebrowHappyX = this.bodyX;
        this.eyebrowHappyY = this.bodyY - 60;
        this.eyebrowAngryX = this.bodyX;
        this.eyebrowAngryY = this.bodyY - 50;

        /*this.leftEyeX = this.bodyX - 50;
        this.leftEyeY = this.bodyY + 20;

        this.rightEyeX = this.bodyX + 50;
        this.rightEyeY = this.bodyY + 20;
        */
        
        this.counter = 0;
        this.smileType = 'Smile';

        this.sKey = null;
        this.dKey = null;
        this.pKey = null;
    }

    // Use preload to load art and sound assets before the scene starts running.
    preload() {
        // Assets from Kenny Assets pack "Monster Builder Pack"
        // https://kenney.nl/assets/monster-builder-pack
        this.load.setPath("./assets/");

        // Load sprite atlas
        this.load.atlasXML("monsterParts", "spritesheet_default.png", "spritesheet_default.xml");
        
        // update instruction text
        document.getElementById('description').innerHTML = '<h2>Monster.js<br>S - smile // F - show fangs<br>A - move left // D - move right</h2>'
    }

    create() {
        let my = this.my;   // create an alias to this.my for readability

        // Create the main body sprite
        //
        // this.add.sprite(x,y, "{atlas key name}", "{name of sprite within atlas}")
        //
        // look in spritesheet_default.xml for the individual sprite names
        // You can also download the asset pack and look in the PNG/default folder.
        
        // Body
        my.sprite.body = this.add.sprite(this.bodyX, this.bodyY, "monsterParts", "body_redB.png");

        // Arms
        my.sprite.rightArm = this.add.sprite(this.rightHandX, this.rightHandY, "monsterParts", "arm_redB.png");
        my.sprite.leftArm = this.add.sprite(this.leftHandX, this.leftHandY, "monsterParts", "arm_redA.png");
        my.sprite.leftArm.flipX = true; // flip left 

        // Legs
        my.sprite.rightLeg = this.add.sprite(this.rightLegX, this.rightLegY, "monsterParts", "leg_redA.png");
        my.sprite.leftLeg = this.add.sprite(this.leftLegX, this.leftLegY, "monsterParts", "leg_redA.png");
        my.sprite.leftLeg.flipX = true; // flip left 

        // Ears
        my.sprite.rightEar = this.add.sprite(this.rightEarX, this.rightEarY, "monsterParts", "detail_red_ear.png");
        my.sprite.leftEar = this.add.sprite(this.leftEarX, this.leftEarY, "monsterParts", "detail_red_ear.png");
        my.sprite.leftEar.flipX = true; // flip left 


        // Face
        my.sprite.smile = this.add.sprite(this.smileX, this.smileY, "monsterParts", "mouth_closed_happy.png");
        my.sprite.sad = this.add.sprite(this.smileX, this.smileY, "monsterParts", "mouth_closed_sad.png");
        my.sprite.angry = this.add.sprite(this.smileX, this.smileY, "monsterParts", "mouth_closed_fangs.png");

        my.sprite.eye = this.add.sprite(this.eyeX, this.eyeY, "monsterParts", "eye_human_green.png");
        my.sprite.eyebrowHappy = this.add.sprite(this.eyebrowHappyX, this.eyebrowHappyY, "monsterParts", "mouth_closed_sad.png");
        my.sprite.eyebrowAngry = this.add.sprite(this.eyebrowAngryX, this.eyebrowAngryY, "monsterParts", "mouth_closed_sad.png");
        my.sprite.eyebrowAngry.flipY = true; // flip upside down 
        //my.sprite.rightEye = this.add.sprite(this.rightEyeX, this.rightEyeY, "monsterParts", "eye_human_green.png");
        //my.sprite.leftEye = this.add.sprite(this.leftEyeX, this.leftEyeY, "monsterParts", "eye_human_green.png");
        //my.sprite.leftEye.flipX = true; // flip left 

        my.sprite.smile.visible = false;
        my.sprite.sad.visible = true;
        my.sprite.angry.visible = false;
        my.sprite.eyebrowHappy.visible = true;
        my.sprite.eyebrowAngry.visible = false;

        // Event handling: smile
        this.input.keyboard.on('keydown-S', (event) => {
            my.sprite.smile.visible = true;
            my.sprite.sad.visible = false;
            my.sprite.angry.visible = false;
            my.sprite.eyebrowHappy.visible = true;
            my.sprite.eyebrowAngry.visible = false;
        });

        // Event handling: fangs
        this.input.keyboard.on('keydown-F', (event) => {
            my.sprite.smile.visible = false;
            my.sprite.sad.visible = false;
            my.sprite.angry.visible = true;
            my.sprite.eyebrowHappy.visible = false;
            my.sprite.eyebrowAngry.visible = true;
        });

        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        let my = this.my;

        // Polling Input
        if (this.leftKey.isDown) {
            for(let property in my.sprite){
                my.sprite[property].x -= 1;
            }
        }

        if (this.rightKey.isDown) {
            for(let property in my.sprite){
                my.sprite[property].x += 1;
            }
        }
       
    }

}