const express = require("express");
const router = express.Router();
const db = require("../database/db");
const sendResposne = require("../helpers/sendResponse");

const multer  = require('multer')
const upload = multer({ dest: 'media/fields' })

router.get("/get-all", (request, response) => {
   const { lang } = request.query;
   const query = 'SELECT * FROM content WHERE language = $1';
   const values = [lang];
   db.query(query, values, (err, res) => {
      if(res) sendResposne(response, res.rows);
      else sendResposne(response, 0);
   });
});

router.post('/update', (request, response) => {
    const allValues = Object.values(request.body).flat();
    const values = allValues.slice(1);
    const lang = allValues[0];
    values.push(lang);

    const query = `UPDATE content SET 
        menu_before_login = $1,
        menu_player = $2,
        menu_club = $3,
        carousel_title = $4,
        footer_header1 = $5,
        footer_header2 = $6,
        footer_header3 = $7,
        phone = $8,
        email = $9,
        footer_col2_1 = $10,
        footer_col2_2 = $11,
        footer_col2_3 = $12,
        contact_header = $13,
        contact_input1 = $14,
        contact_input2 = $15,
        contact_input3 = $16,
        contact_text = $17,
        about_us_michal_1 = $18,
        about_us_michal_2 = $19,
        about_us_michal_3 = $20,
        about_us_bartosz_1 = $21,
        about_us_bartosz_2 = $22,
        about_us_bartosz_3 = $23,
        about_us_header = $24,
        register_header = $25,
        register_step = $26,
        marketing_consent = $27,
        register_input2 = $28,
        register_input3 = $29,
        register_input4 = $30,
        register_input5 = $31,
        register_input6 = $32,
        register_input7 = $33,
        register_input8 = $34,
        register_consent1 = $35,
        register_consent2 = $36,
        login_input1 = $37,
        login_input2 = $38,
        login_input3 = $39,
        login_box1 = $40,
        login_box2 = $41,
        player_zone_header1 = $42,
        player_zone_header2 = $43,
        player_zone_header3 = $44,
        player_zone_header4 = $45,
        player_zone_header5 = $46,
        player_zone_header6 = $47,
        player_zone_text1 = $48,
        player_zone_text2 = $49,
        player_zone_text3 = $50,
        player_zone_text4 = $51,
        player_zone_text5 = $52,
        player_zone_text6 = $53,
        player_zone_circle1 = $54,
        player_zone_circle2 = $55,
        player_zone_circle3 = $56,
        player_zone_buy_frame1 = $57,
        player_zone_buy_frame2 = $58,
        faq_header_1 = $59,
        faq_header_2 = $60,
        faq_header_3 = $61,
        faq_header_4 = $62,
        faq_question_1 = $63,
        faq_question_2 = $64,
        faq_question_3 = $65,
        faq_question_4 = $66,
        faq_question_5 = $67,
        faq_question_6 = $68,
        faq_question_7 = $69,
        faq_question_8 = $70,
        faq_question_9 = $71,
        faq_question_10 = $72,
        faq_question_11 = $73,
        faq_question_12 = $74,
        faq_question_13 = $75,
        faq_question_14 = $76,
        faq_question_15 = $77,
        faq_question_16 = $78,
        faq_answer_1 = $79,
        faq_answer_2 = $80,
        faq_answer_3 = $81,
        faq_answer_4 = $82,
        faq_answer_5 = $83,
        faq_answer_6 = $84,
        faq_answer_7 = $85,
        faq_answer_8 = $86,
        faq_answer_9 = $87,
        faq_answer_10 = $88,
        faq_answer_11 = $89,
        faq_answer_12 = $90,
        faq_answer_13 = $91,
        faq_answer_14 = $92,
        faq_answer_15 = $93,
        faq_answer_16 = $94,
        club_zone_header1 = $95,
        club_zone_header2 = $96,
        club_zone_header3 = $97,
        club_zone_header4 = $98,
        club_zone_header5 = $99,
        club_zone_text1 = $100,
        club_zone_text2 = $101,
        club_zone_text3 = $102,
        club_zone_text4 = $103,
        club_zone_text5 = $104,
        club_zone_contact_form_header = $105,
        club_zone_contact_form_input1 = $106,
        club_zone_contact_form_input2 = $107,
        club_zone_contact_form_input3 = $108,
        club_zone_contact_form_input4 = $109,
        map_header = $110,
        map_gender = $111,
        map_leagues = $112,
        map_league1 = $113,
        map_league2 = $114,
        map_league3 = $115,
        map_location = $116,
        player_profile_no_messages = $117,
        player_profile_all_messages = $118,
        welcome_header = $119,
        welcome_text = $120,
        read_more = $121,
        club_activities_header1 = $122,
        club_activities_header2 = $123,
        club_activities_text1 = $124,
        club_activities_text2 = $125,
        your_subscription = $126,
        your_subscription_text_ok = $127,
        your_subscription_text_expire = $128,
        your_subscription_days = $129,
        dropdown_menu_player = $130,
        dropdown_menu_club = $131,
        player_parameter_1 = $132,
        player_parameter_2 = $133,
        player_parameter_3 = $134,
        player_parameter_4 = $135,
        player_parameter_5 = $136,
        player_parameter_6 = $137,
        player_parameter_7 = $138,
        player_parameter_8 = $139,
        player_parameter_9 = $140,
        player_parameter_10 = $141,
        player_parameter_11 = $142,
        player_parameter_12 = $143,
        player_parameter_13 = $144,
        add_action = $145,
        back_to_profile = $146,
        video = $147,
        play = $148,
        add_date = $149,
        element1 = $150,
        element2 = $151,
        element3 = $152,
        element4 = $153,
        element5 = $154,
        element6 = $155,
        add_video_header = $156,
        add_video_text = $157,
        add_video_text2 = $158,
        video_added = $159,
        delete_video_text = $160,
        video_deleted = $161,
        payment_header = $162,
        payment_text = $163,
        pay_with = $164,
        discount_code = $165,
        discount_code_input = $166,
        ty_page_header = $167,
        ty_page_text = $168,
        famale = $169,
        male = $170,
        after_register_text_1 = $171,
        after_register_text_2 = $172,
        after_verification_text = $173,
        age = $174,
        more_about_player = $175,
        create_your_team = $176,
        continue_text = $177,
        first_and_last_name = $178,
        find_new_player = $179,
        favorite_players = $180,
        no_favorite_players = $181,
        no_players_found = $182,
        no_teams_found = $183,
        error_text_1 = $184,
        error_text_2 = $185,
        messages = $186,
        no_videos_yet = $187,
        all_players = $188,
        team_name = $189,
        cost_of_the_team = $190,
        position = $191,
        position1 = $192,
        position2 = $193,
        position3 = $194,
        position4 = $195,
        position5 = $196,
        register = $197,
        login = $198,
        sign_in = $199,
        contact_header2 = $200,
        name_error = $201,
        email_error = $202,
        confirm_msg = $203,
        all_text = $204,
        no_clubs = $205,
        register_header_2 = $206,
        register_header_3 = $207,
        identical_password_error = $208,
        weak_password_error = $209,
        email_already_in_use = $210,
        first_name_error = $211,
        last_name_error = $212,
        sex_error = $213,
        date_of_birth_error = $214,
        minimal_age_error = $215,
        phone_number_error = $216,
        wrong_phone_number = $217,
        error = $218,
        after_register_text_3 = $219,
        login_error = $220,
        element_7 = $221,
        element_8 = $222,
        choose_position = $223,
        video_to_large = $224,
        payment_text2 = $225,
        payment_code = $226,
        payment_discount = $227,
        payment_code_not_exists = $228,
        pay_with2 = $229,
        no_messages = $230,
        notifications = $231,
        your_result = $232,
        result_text = $233,
        back_text = $234,
        filters = $235,
        players = $236,
        change_password1 = $237,
        change_password2 = $238,
        change_password3 = $239,
        change_password4 = $240,
        change_password5 = $241,
        change_password_input1 = $242,
        change_password_input2 = $243,
        team_updated = $244,
        team_added = $245,
        team_error1 = $246,
        team_error2 = $247,
        saved_teams = $248,
        teams_col1 = $249,
        teams_col2 = $250,
        teams_col3 = $251,
        teams_col4 = $252,
        delete_team = $253,
        delete_team_yes = $254,
        delete_team_no = $255,
        team_deleted = $256,
        reset_password1 = $257,
        reset_password2 = $258,
        reset_password3 = $259,
        reset_password4 = $260,
        reset_password5 = $261,
        reset_password6 = $262,
        reset_password7 = $263,
        register_input1 = $264,
        messages_header1 = $265,
        messages_header2 = $266,
        messages_header3 = $267,
        messages_header4 = $268,
        messages_header5 = $269,
        messages_header6 = $270,
        messages_header7 = $271,
        messages_header8 = $272,
        messages_read = $273,
        stuff_zone_header1 = $274,
        stuff_zone_header2 = $275,
        stuff_zone_header3 = $276,
        stuff_zone_header4 = $277,
        stuff_zone_header5 = $278,
        stuff_zone_header6 = $279,
        stuff_zone_text1 = $280,
        stuff_zone_text2 = $281,
        stuff_zone_text3 = $282,
        stuff_zone_text4 = $283,
        stuff_zone_text5 = $284,
        stuff_zone_text6 = $285,
        stuff_zone_circle1 = $286,
        stuff_zone_circle2 = $287,
        stuff_zone_circle3 = $288,
        post = $289,
        post1 = $290,
        post2 = $291,
        post3 = $292,
        post4 = $293,
        post5 = $294,
        cv_type1 = $295,
        cv_type2 = $296,
        cv_type3 = $297,
        add_new = $298,
        find_new_stuff = $299,
        see_cv = $300,
        cv_input1 = $301,
        cv_input2 = $302,
        cv_input3 = $303,
        club_search_dropdown1 = $304,
        club_search_dropdown2 = $305,
        delete_cv_text = $306,
        cv_deleted = $307,
        cv_added = $308,
        cv_updated = $309,
        cv_input_error1 = $310,
        cv_input_error2 = $311,
        cv_input_error3 = $312,
        delete_cv_yes = $313,
        delete_cv_no = $314,
        add_account_type_header = $315,
        add_account_type_text_user = $316,
        add_account_type_text_staff =$317,
        after_add_account_type_user = $318,
        after_add_account_type_staff = $319,
        switch_account_type_user = $320,
        switch_account_type_staff = $321 
        WHERE language = $322`;

    db.query(query, values, (err, res) => {
        console.log(err);
        if(res) {
            response.send({
                result: 1
            });
        }
        else {
            response.send({
                result: 0
            });
        }
    });
});

router.post('/update-images', upload.fields([
    { name: 'img1', maxCount: 1 },
    { name: 'img2', maxCount: 1 },
    { name: 'img3', maxCount: 1 },
    { name: 'img4', maxCount: 1 },
    { name: 'img5', maxCount: 1 },
    { name: 'img6', maxCount: 1 },
    { name: 'img7', maxCount: 1 },
    { name: 'img8', maxCount: 1 },
    { name: 'img9', maxCount: 1 },
    { name: 'img10', maxCount: 1 },
    { name: 'img11', maxCount: 1 },
    { name: 'img12', maxCount: 1 },
    { name: 'img13', maxCount: 1 },
    { name: 'img14', maxCount: 1 },
    { name: 'img15', maxCount: 1 },
    { name: 'img16', maxCount: 1 },
    { name: 'img17', maxCount: 1 },
    { name: 'img18', maxCount: 1 },
    { name: 'img19', maxCount: 1 },
    { name: 'img20', maxCount: 1 },
    { name: 'img21', maxCount: 1 },
    { name: 'img22', maxCount: 1 },
    { name: 'img23', maxCount: 1 },
    { name: 'img24', maxCount: 1 },
    { name: 'img25', maxCount: 1 },
    { name: 'img26', maxCount: 1 },
    { name: 'img27', maxCount: 1 },
    { name: 'img28', maxCount: 1 },
    { name: 'img29', maxCount: 1 },
    { name: 'img30', maxCount: 1 },
    { name: 'img31', maxCount: 1 },
    { name: 'img32', maxCount: 1 },
    { name: 'img33', maxCount: 1 },
    { name: 'img34', maxCount: 1 },
    { name: 'img35', maxCount: 1 },
    { name: 'img36', maxCount: 1 }
]), (request, response) => {
    const files = request.files;
    let img1 = null,
        img2 = null,
        img3 = null,
        img4 = null,
        img5 = null,
        img6 = null,
        img7 = null,
        img8 = null,
        img9 = null,
        img10 = null,
        img11 = null,
        img12 = null,
        img13 = null,
        img14 = null,
        img15 = null,
        img16 = null,
        img17 = null,
        img18 = null,
        img19 = null,
        img20 = null,
        img21 = null,
        img22 = null,
        img23 = null,
        img24 = null,
        img25 = null,
        img26 = null,
        img27 = null,
        img28 = null,
        img29 = null,
        img30 = null,
        img31 = null,
        img32 = null,
        img33 = null,
        img34 = null,
        img35 = null,
        img36 = null;
    if(files.img1) img1 = files.img1[0].filename;
    if(files.img2) img2 = files.img2[0].filename;
    if(files.img3) img3 = files.img3[0].filename;
    if(files.img4) img4 = files.img4[0].filename;
    if(files.img5) img5 = files.img5[0].filename;
    if(files.img6) img6 = files.img6[0].filename;
    if(files.img7) img7 = files.img7[0].filename;
    if(files.img8) img8 = files.img8[0].filename;
    if(files.img9) img9 = files.img9[0].filename;
    if(files.img10) img10 = files.img10[0].filename;
    if(files.img11) img11 = files.img11[0].filename;
    if(files.img12) img12 = files.img12[0].filename;
    if(files.img13) img13 = files.img13[0].filename;
    if(files.img14) img14 = files.img14[0].filename;
    if(files.img15) img15 = files.img15[0].filename;
    if(files.img16) img16 = files.img16[0].filename;
    if(files.img17) img17 = files.img17[0].filename;
    if(files.img18) img18 = files.img18[0].filename;
    if(files.img19) img19 = files.img19[0].filename;
    if(files.img20) img20 = files.img20[0].filename;
    if(files.img21) img21 = files.img21[0].filename;
    if(files.img22) img22 = files.img22[0].filename;
    if(files.img23) img23 = files.img23[0].filename;
    if(files.img24) img24 = files.img24[0].filename;
    if(files.img25) img25 = files.img25[0].filename;
    if(files.img26) img26 = files.img26[0].filename;
    if(files.img27) img27 = files.img27[0].filename;
    if(files.img28) img28 = files.img28[0].filename;
    if(files.img29) img29 = files.img29[0].filename;
    if(files.img30) img30 = files.img30[0].filename;
    if(files.img31) img31 = files.img31[0].filename;
    if(files.img32) img32 = files.img32[0].filename;
    if(files.img33) img33 = files.img33[0].filename;
    if(files.img34) img34 = files.img34[0].filename;
    if(files.img35) img35 = files.img35[0].filename;
    if(files.img36) img36 = files.img36[0].filename;

    const lang = request.body.lang;

    const query = `UPDATE content SET img1 = COALESCE($1, img1),
                    img2 = COALESCE($2, img2), 
                    img3 = COALESCE($3, img3), 
                    img4 = COALESCE($4, img4), 
                    img5 = COALESCE($5, img5), 
                    img6 = COALESCE($6, img6), 
                    img7 = COALESCE($7, img7), 
                    img8 = COALESCE($8, img8), 
                    img9 = COALESCE($9, img9), 
                    img10 = COALESCE($10, img10), 
                    img11 = COALESCE($11, img11), 
                    img12 = COALESCE($12, img12), 
                    img13 = COALESCE($13, img13), 
                    img14 = COALESCE($14, img14), 
                    img15 = COALESCE($15, img15), 
                    img16 = COALESCE($16, img16), 
                    img17 = COALESCE($17, img17), 
                    img18 = COALESCE($18, img18), 
                    img19 = COALESCE($19, img19), 
                    img20 = COALESCE($20, img20), 
                    img21 = COALESCE($21, img21), 
                    img22 = COALESCE($22, img22), 
                    img23 = COALESCE($23, img23), 
                    img24 = COALESCE($24, img24), 
                    img25 = COALESCE($25, img25), 
                    img26 = COALESCE($26, img26), 
                    img27 = COALESCE($27, img27), 
                    img28 = COALESCE($28, img28),
                    img30 = COALESCE($29, img30),
                    img31 = COALESCE($30, img31),
                    img32 = COALESCE($31, img32),
                    img33 = COALESCE($32, img33),
                    img34 = COALESCE($33, img34),
                    img35 = COALESCE($34, img35),
                    img36 = COALESCE($35, img36),
                    img37 = COALESCE($36, img37)
                    WHERE language = $37`
    const values = [img1, img2, img3, img4, img5,
                    img6, img7, img8, img9, img10,
                    img11, img12, img13, img14, img15,
                    img16, img17, img18, img19, img20,
                    img21, img22, img23, img24, img25,
                    img26, img27, img28, img29, img30,
                    img31, img32, img33, img34, img35,
                    img36, lang];

    db.query(query, values, (err, res) => {
        console.log(err);
        console.log(res);
        if(res) {
            response.send({
                result: 1
            });
        }
        else {
            response.send({
                result: 0
            });
        }
    });
});

router.post('/update-terms', (request, response) => {
    const { terms, policy, cookies, language } = request.body;

    const query = 'UPDATE content SET terms_of_service = $1, privacy_policy = $2, cookies_policy = $3 WHERE language = $4';
    const values = [terms, policy, cookies, language];

    console.log(values);

    db.query(query, values, (err, res) => {
        console.log(err);
        if(res) {
            response.send({
                result: 1
            });
        }
        else {
            response.send({
                result: 0
            });
        }
    });
});

router.get('/get-terms', (request, response) => {
    const query = 'SELECT terms_of_service, privacy_policy, cookies_policy FROM content WHERE language = $1';
    const values = [request.query.lang];

    db.query(query, values, (err, res) => {
        if(res) {
            if(res.rows) {
                response.send({
                    result: res.rows[0]
                });
            }
            else {
                response.send({
                    result: 0
                });
            }
        }
        else {
            response.send({
                result: 0
            });
        }
    })
});

router.get("/get-single-field", (request, response) => {
    const key = request.query.key;

    if(key) {
        const query = 'SELECT * FROM custom_fields WHERE key = $1';
        const values = [key];
        db.query(query, values, (err, res) => {
           if(res) sendResposne(response, res.rows);
           else sendResposne(response, 0);
        });
    }
    else {
        sendResposne(response, 0);
    }
});

router.get("/get-single-image", (request, response) => {

});

router.post("/add-field", (request, response) => {
    const { key, value } = request.body;

    const query = 'INSERT INTO custom_fields VALES ($1, $2)';
    const values = [key, value];

    db.query(query, values, (err, res) => {
       if(res) sendResposne(response, 1);
       else sendResposne(response, 0);
    });
});

router.post("/add-image", (request, response) => {

});

router.put("/update-field", (request, response) => {
    const { key, value } = request.body;

    const query = 'UPDATE custom_fields SET value = $1 WHERE key = $2';
    const values = [value, key];
    db.query(query, values, (err, res) => {
       if(res) sendResposne(response, res.rows);
       else sendResposne(response, 0);
    });
});

router.put("/update-image", (request, response) => {

});

router.delete("/delete-field", (request, response) => {
    const { key } = request.body;

    const query = 'UPDATE custom_fields SET value = NULL WHERE key = $1';
    const values = [key];
    db.query(query, values, (err, res) => {
       if(res) sendResposne(response, 1);
       else sendResposne(response, 0);
    });
});

router.delete("/delete-image", (request, response) => {
    const { key } = request.body;

    const query = 'UPDATE custom_images SET value = NULL WHERE key = $1';
    const values = [key];
    db.query(query, values, (err, res) => {
        if(res) sendResposne(response, 1);
        else sendResposne(response, 0);
    });
});

module.exports = router;
