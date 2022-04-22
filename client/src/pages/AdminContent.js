import React, {useState, useEffect, useRef} from 'react'
import AdminTop from "../components/AdminTop";
import PanelMenu from "../components/PanelMenu";
import {getCustomFields, updateCustomFields} from "../helpers/admin";
import ChangeContentLabel from "../components/ChangeContentLabel";
import DraftLoader from "../components/Loader";

const AdminContent = ({lang}) => {
    const [menu_before_login, setMenuBeforeLogin] = useState("");
    const [menu_player, setMenuPlayer] = useState("");
    const [menu_club, setMenuClub] = useState("");
    const [carousel_title, setCarouselTitle] = useState("");
    const [footer_header1, setFooterHeader1] = useState("");
    const [footer_header2, setFooterHeader2] = useState("");
    const [footer_header3, setFooterHeader3] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");
    const [footer_col2_1, setFooterCol21] = useState("");
    const [footer_col2_2, setFooterCol22] = useState("");
    const [footer_col2_3, setFooterCol23] = useState("");
    const [contact_header, setContactHeader] = useState("");
    const [contact_input1, setContactInput1] = useState("");
    const [contact_input2, setContactInput2] = useState("");
    const [contact_input3, setContactInput3] = useState("");
    const [contact_text, setContactText] = useState("");
    const [about_us_michal_1, setAboutUsMichal1] = useState("");
    const [about_us_michal_2, setAboutUsMichal2] = useState("");
    const [about_us_michal_3, setAboutUsMichal3] = useState("");
    const [about_us_bartosz_1, setAboutUsBartosz1] = useState("");
    const [about_us_bartosz_2, setAboutUsBartosz2] = useState("");
    const [about_us_bartosz_3, setAboutUsBartosz3] = useState("");
    const [about_us_header, setAboutUsHeader] = useState("");
    const [register_header, setRegisterHeader] = useState("");
    const [register_step, setRegisterStep] = useState("");
    const [marketing_consent, setMarketingConsent] = useState("");
    const [register_input2, setRegisterInput2] = useState("");
    const [register_input3, setRegisterInput3] = useState("");
    const [register_input4, setRegisterInput4] = useState("");
    const [register_input5, setRegisterInput5] = useState("");
    const [register_input6, setRegisterInput6] = useState("");
    const [register_input7, setRegisterInput7] = useState("");
    const [register_input8, setRegisterInput8] = useState("");
    const [register_consent1, setRegisterConsent1] = useState("");
    const [register_consent2, setRegisterConsent2] = useState("");
    const [login_input1, setLoginInput1] = useState("");
    const [login_input2, setLoginInput2] = useState("");
    const [login_input3, setLoginInput3] = useState("");
    const [login_box1, setLoginBox1] = useState("");
    const [login_box2, setLoginBox2] = useState("");
    const [player_zone_header1, setPlayerZoneHeader1] = useState("");
    const [player_zone_header2, setPlayerZoneHeader2] = useState("");
    const [player_zone_header3, setPlayerZoneHeader3] = useState("");
    const [player_zone_header4, setPlayerZoneHeader4] = useState("");
    const [player_zone_header5, setPlayerZoneHeader5] = useState("");
    const [player_zone_header6, setPlayerZoneHeader6] = useState("");
    const [player_zone_text1, setPlayerZoneText1] = useState("");
    const [player_zone_text2, setPlayerZoneText2] = useState("");
    const [player_zone_text3, setPlayerZoneText3] = useState("");
    const [player_zone_text4, setPlayerZoneText4] = useState("");
    const [player_zone_text5, setPlayerZoneText5] = useState("");
    const [player_zone_text6, setPlayerZoneText6] = useState("");
    const [player_zone_circle1, setPlayerZoneCircle1] = useState("");
    const [player_zone_circle2, setPlayerZoneCircle2] = useState("");
    const [player_zone_circle3, setPlayerZoneCircle3] = useState("");
    const [player_zone_buy_frame1, setPlayerZoneBuyFrame1] = useState("");
    const [player_zone_buy_frame2, setPlayerZoneBuyFrame2] = useState("");
    const [faq_header_1, setFaqHeader1] = useState("");
    const [faq_header_2, setFaqHeader2] = useState("");
    const [faq_header_3, setFaqHeader3] = useState("");
    const [faq_header_4, setFaqHeader4] = useState("");
    const [faq_question_1, setFaqQuestion1] = useState("");
    const [faq_question_2, setFaqQuestion2] = useState("");
    const [faq_question_3, setFaqQuestion3] = useState("");
    const [faq_question_4, setFaqQuestion4] = useState("");
    const [faq_question_5, setFaqQuestion5] = useState("");
    const [faq_question_6, setFaqQuestion6] = useState("");
    const [faq_question_7, setFaqQuestion7] = useState("");
    const [faq_question_8, setFaqQuestion8] = useState("");
    const [faq_question_9, setFaqQuestion9] = useState("");
    const [faq_question_10, setFaqQuestion10] = useState("");
    const [faq_question_11, setFaqQuestion11] = useState("");
    const [faq_question_12, setFaqQuestion12] = useState("");
    const [faq_question_13, setFaqQuestion13] = useState("");
    const [faq_question_14, setFaqQuestion14] = useState("");
    const [faq_question_15, setFaqQuestion15] = useState("");
    const [faq_question_16, setFaqQuestion16] = useState("");
    const [faq_answer_1, setFaqAnswer1] = useState("");
    const [faq_answer_2, setFaqAnswer2] = useState("");
    const [faq_answer_3, setFaqAnswer3] = useState("");
    const [faq_answer_4, setFaqAnswer4] = useState("");
    const [faq_answer_5, setFaqAnswer5] = useState("");
    const [faq_answer_6, setFaqAnswer6] = useState("");
    const [faq_answer_7, setFaqAnswer7] = useState("");
    const [faq_answer_8, setFaqAnswer8] = useState("");
    const [faq_answer_9, setFaqAnswer9] = useState("");
    const [faq_answer_10, setFaqAnswer10] = useState("");
    const [faq_answer_11, setFaqAnswer11] = useState("");
    const [faq_answer_12, setFaqAnswer12] = useState("");
    const [faq_answer_13, setFaqAnswer13] = useState("");
    const [faq_answer_14, setFaqAnswer14] = useState("");
    const [faq_answer_15, setFaqAnswer15] = useState("");
    const [faq_answer_16, setFaqAnswer16] = useState("");
    const [club_zone_header1, setClubZoneHeader1] = useState("");
    const [club_zone_header2, setClubZoneHeader2] = useState("");
    const [club_zone_header3, setClubZoneHeader3] = useState("");
    const [club_zone_header4, setClubZoneHeader4] = useState("");
    const [club_zone_header5, setClubZoneHeader5] = useState("");
    const [club_zone_text1, setClubZoneText1] = useState("");
    const [club_zone_text2, setClubZoneText2] = useState("");
    const [club_zone_text3, setClubZoneText3] = useState("");
    const [club_zone_text4, setClubZoneText4] = useState("");
    const [club_zone_text5, setClubZoneText5] = useState("");
    const [club_zone_contact_form_header, setClubZoneContactFormHeader] = useState("");
    const [club_zone_contact_form_input1, setClubZoneContactFormInput1] = useState("");
    const [club_zone_contact_form_input2, setClubZoneContactFormInput2] = useState("");
    const [club_zone_contact_form_input3, setClubZoneContactFormInput3] = useState("");
    const [club_zone_contact_form_input4, setClubZoneContactFormInput4] = useState("");
    const [map_header, setMapHeader] = useState("");
    const [map_gender, setMapGender] = useState("");
    const [map_leagues, setMapLeagues] = useState("");
    const [map_league1, setMapLeague1] = useState("");
    const [map_league2, setMapLeague2] = useState("");
    const [map_league3, setMapLeague3] = useState("");
    const [map_location, setMapLocation] = useState("");
    const [player_profile_no_messages, setPlayerProfileNoMessages] = useState("");
    const [player_profile_all_messages, setPlayerProfileAllMessages] = useState("");
    const [welcome_header, setWelcomeHeader] = useState("");
    const [welcome_text, setWelcomeText] = useState("");
    const [read_more, setReadMore] = useState("");
    const [club_activities_header1, setClubActivitiesHeader1] = useState("");
    const [club_activities_header2, setClubActivitiesHeader2] = useState("");
    const [club_activities_text1, setClubActivitiesText1] = useState("");
    const [club_activities_text2, setClubActivitiesText2] = useState("");
    const [your_subscription, setYourSubscription] = useState("");
    const [your_subscription_text_ok, setYourSubscriptionTextOk] = useState("");
    const [your_subscription_text_expire, setYourSubscriptionTextExpire] = useState("");
    const [your_subscription_days, setYourSubscriptionDays] = useState("");
    const [dropdown_menu_player, setDropdownMenuPlayer] = useState("");
    const [dropdown_menu_club, setDropdownMenuClub] = useState("");
    const [player_parameter_1, setPlayerParameter1] = useState("");
    const [player_parameter_2, setPlayerParameter2] = useState("");
    const [player_parameter_3, setPlayerParameter3] = useState("");
    const [player_parameter_4, setPlayerParameter4] = useState("");
    const [player_parameter_5, setPlayerParameter5] = useState("");
    const [player_parameter_6, setPlayerParameter6] = useState("");
    const [player_parameter_7, setPlayerParameter7] = useState("");
    const [player_parameter_8, setPlayerParameter8] = useState("");
    const [player_parameter_9, setPlayerParameter9] = useState("");
    const [player_parameter_10, setPlayerParameter10] = useState("");
    const [player_parameter_11, setPlayerParameter11] = useState("");
    const [player_parameter_12, setPlayerParameter12] = useState("");
    const [player_parameter_13, setPlayerParameter13] = useState("");
    const [add_action, setAddAction] = useState("");
    const [back_to_profile, setBackToProfile] = useState("");
    const [video, setVideo] = useState("");
    const [play, setPlay] = useState("");
    const [add_date, setAddDate] = useState("");
    const [element1, setElement1] = useState("");
    const [element2, setElement2] = useState("");
    const [element3, setElement3] = useState("");
    const [element4, setElement4] = useState("");
    const [element5, setElement5] = useState("");
    const [element6, setElement6] = useState("");
    const [add_video_header, setAddVideoHeader] = useState("");
    const [add_video_text, setAddVideoText] = useState("");
    const [add_video_text2, setAddVideoText2] = useState("");
    const [video_added, setVideoAdded] = useState("");
    const [delete_video_text, setDeleteVideoText] = useState("");
    const [video_deleted, setVideoDeleted] = useState("");
    const [payment_header, setPaymentHeader] = useState("");
    const [payment_text, setPaymentText] = useState("");
    const [pay_with, setPayWith] = useState("");
    const [discount_code, setDiscountCode] = useState("");
    const [discount_code_input, setDiscountCodeInput] = useState("");
    const [ty_page_header, setTyPageHeader] = useState("");
    const [ty_page_text, setTyPageText] = useState("");
    const [famale, setFamale] = useState("");
    const [male, setMale] = useState("");
    const [after_register_text_1, setAfterRegisterText1] = useState("");
    const [after_register_text_2, setAfterRegisterText2] = useState("");
    const [after_verification_text, setAfterVerificationText] = useState("");
    const [age, setAge] = useState("");
    const [more_about_player, setMoreAboutPlayer] = useState("");
    const [create_your_team, setCreateYourTeam] = useState("");
    const [continue_text, setContinueText] = useState("");
    const [first_and_last_name, setFirstAndLastName] = useState("");
    const [find_new_player, setFindNewPlayer] = useState("");
    const [favorite_players, setFavoritePlayers] = useState("");
    const [no_favorite_players, setNoFavoritePlayers] = useState("");
    const [no_players_found, setNoPlayersFound] = useState("");
    const [no_teams_found, setNoTeamsFound] = useState("");
    const [error_text_1, setErrorText1] = useState("");
    const [error_text_2, setErrorText2] = useState("");
    const [messages, setMessages] = useState("");
    const [no_videos_yet, setNoVideosYet] = useState("");
    const [all_players, setAllPlayers] = useState("");
    const [team_name, setTeamName] = useState("");
    const [cost_of_the_team, setCostOfTheTeam] = useState("");
    const [position, setPosition] = useState("");
    const [position1, setPosition1] = useState("");
    const [position2, setPosition2] = useState("");
    const [position3, setPosition3] = useState("");
    const [position4, setPosition4] = useState("");
    const [position5, setPosition5] = useState("");

    const [register, setRegister] = useState("");
    const [login, setLogin] = useState("");
    const [sign_in, setSignIn] = useState("");
    const [contact_header2, setContactHeader2] = useState("");
    const [name_error, setNameError] = useState("");
    const [email_error, setEmailError] = useState("");
    const [confirm_msg, setConfirmMsg] = useState("");
    const [all_text, setAllText] = useState("");
    const [no_clubs, setNoClubs] = useState("");
    const [register_header_2, setRegisterHeader2] = useState("");
    const [register_header_3, setRegisterHeader3] = useState("");
    const [register_input1, setRegisterInput1] = useState("");
    const [identical_password_error, setIdenticalPasswordError] = useState("");
    const [weak_password_error, setWeakPasswordError] = useState("");
    const [email_already_in_use, setEmailAlreadyInUse] = useState("");
    const [first_name_error, setFirstNameError] = useState("");
    const [last_name_error, setLastNameError] = useState("");
    const [sex_error, setSexError] = useState("");
    const [date_of_birth_error, setDateOfBirthError] = useState("");
    const [minimal_age_error, setMinimalAgeError] = useState("");
    const [phone_number_error, setPhoneNumberError] = useState("");
    const [wrong_phone_number, setWrongPhoneNumber] = useState("");
    const [error, setError] = useState("");
    const [after_register_text_3, setAfterRegisterText3] = useState("");
    const [login_error, setLogin_error] = useState("");
    const [element_7, setElement7] = useState("");
    const [element_8, setElement8] = useState("");
    const [choose_position, setChoosePosition] = useState("");
    const [video_to_large, setVideoToLarge] = useState("");
    const [payment_text2, setPaymentText2] = useState("");
    const [payment_code, setPaymentCode] = useState("");
    const [payment_discount, setPaymentDiscount] = useState("");
    const [payment_code_not_exists, setPaymentCodeNotExists] = useState("");
    const [pay_with2, setPayWith2] = useState("");
    const [no_messages, setNoMessages] = useState("");
    const [notifications, setNotifications] = useState("");
    const [your_result, setYourResult] = useState("");
    const [result_text, setResultText] = useState("");
    const [back_text, setBackText] = useState("");
    const [filters, setFilters] = useState("");
    const [players, setPlayers] = useState("");
    const [change_password1, setChangePassword1] = useState("");
    const [change_password2, setChangePassword2] = useState("");
    const [change_password3, setChangePassword3] = useState("");
    const [change_password4, setChangePassword4] = useState("");
    const [change_password5, setChangePassword5] = useState("");
    const [change_password_input1, setChangePassword6] = useState("");
    const [change_password_input2, setChangePassword7] = useState("");
    const [team_updated, setTeamUpdated] = useState("");
    const [team_added, setTeamAdded] = useState("");
    const [team_error1, setTeamError1] = useState("");
    const [team_error2, setTeamError2] = useState("");
    const [saved_teams, setTeamsSaved] = useState("");
    const [teams_col1, setTeamsCol1] = useState("");
    const [teams_col2, setTeamsCol2] = useState("");
    const [teams_col3, setTeamsCol3] = useState("");
    const [teams_col4, setTeamsCol4] = useState("");
    const [delete_team, setDeleteTeam] = useState("");
    const [delete_team_yes, setDeleteTeamYes] = useState("");
    const [delete_team_no, setDeleteTeamNo] = useState("");
    const [team_deleted, setTeamDeleted] = useState("");
    const [reset_password1, setResetPassword1] = useState("");
    const [reset_password2, setResetPassword2] = useState("");
    const [reset_password3, setResetPassword3] = useState("");
    const [reset_password4, setResetPassword4] = useState("");
    const [reset_password5, setResetPassword5] = useState("");
    const [reset_password6, setResetPassword6] = useState("");
    const [reset_password7, setResetPassword7] = useState("");
    const [messages_header1, setMessageHeader1] = useState("");
    const [messages_header2, setMessageHeader2] = useState("");
    const [messages_header3, setMessageHeader3] = useState("");
    const [messages_header4, setMessageHeader4] = useState("");
    const [messages_header5, setMessageHeader5] = useState("");
    const [messages_header6, setMessageHeader6] = useState("");
    const [messages_header7, setMessageHeader7] = useState("");
    const [messages_header8, setMessageHeader8] = useState("");
    const [messages_read, setMessageRead] = useState("");

    const [stuff_zone_header1, setStuffZoneHeader1] = useState("");
    const [stuff_zone_header2, setStuffZoneHeader2] = useState("");
    const [stuff_zone_header3, setStuffZoneHeader3] = useState("");
    const [stuff_zone_header4, setStuffZoneHeader4] = useState("");
    const [stuff_zone_header5, setStuffZoneHeader5] = useState("");
    const [stuff_zone_header6, setStuffZoneHeader6] = useState("");
    const [stuff_zone_text1, setStuffZoneText1] = useState("");
    const [stuff_zone_text2, setStuffZoneText2] = useState("");
    const [stuff_zone_text3, setStuffZoneText3] = useState("");
    const [stuff_zone_text4, setStuffZoneText4] = useState("");
    const [stuff_zone_text5, setStuffZoneText5] = useState("");
    const [stuff_zone_text6, setStuffZoneText6] = useState("");
    const [stuff_zone_circle1, setStuffZoneCircle1] = useState("");
    const [stuff_zone_circle2, setStuffZoneCircle2] = useState("");
    const [stuff_zone_circle3, setStuffZoneCircle3] = useState("");
    const [post, setPost] = useState("");
    const [post1, setPost1] = useState("");
    const [post2, setPost2] = useState("");
    const [post3, setPost3] = useState("");
    const [post4, setPost4] = useState("");
    const [post5, setPost5] = useState("");
    const [cv_type1, setCvType1] = useState("");
    const [cv_type2, setCvType2] = useState("");
    const [cv_type3, setCvType3] = useState("");
    const [add_new, setAddNew] = useState("");
    const [find_new_stuff, setFindNewStuff] = useState("");
    const [see_cv, setSeeCv] = useState("");
    const [cv_input1, setCvInput1] = useState("");
    const [cv_input2, setCvInput2] = useState("");
    const [cv_input3, setCvInput3] = useState("");
    const [club_search_dropdown1, setClubSearchDropdown1] = useState("");
    const [club_search_dropdown2, setClubSearchDropdown2] = useState("");
    const [delete_cv_text, setDeleteCvText] = useState("");
    const [cv_deleted, setCvDeleted] = useState("");
    const [cv_added, setCvAdded] = useState("");
    const [cv_updated, setCvUpdated] = useState("");
    const [cv_input_error1, setCvInputError1] = useState("");
    const [cv_input_error2, setCvInputError2] = useState("");
    const [cv_input_error3, setCvInputError3] = useState("");
    const [delete_cv_yes, setDeleteCvYes] = useState("");
    const [delete_cv_no, setDeleteCvNo] = useState("");
    const [add_account_type_header, setAddAccountTypeHeader] = useState("");
    const [add_account_type_text_user, setAddAccountTypeTextUser] = useState("");
    const [add_account_type_text_staff, setAddAccountTypeTextStaff] = useState("");
    const [after_add_account_type_user, setAfterAddAccountTypeUser] = useState("");
    const [after_add_account_type_staff, setAfterAddAccountTypeStaff] = useState("");
    const [switch_account_type_user, setSwitchAccountTypeUser] = useState("");
    const [switch_account_type_staff, setSwitchAccountTypeStaff] = useState("");

    const [addResult, setAddResult] = useState(-1);
    const [render, setRender] = useState(false);

    useEffect(() => {
        getCustomFields(lang)
            .then((res) => {
                const arr = res?.data?.result;
                if(arr) {
                    const r = arr[0];
                    setMenuBeforeLogin(r.menu_before_login);
                    setMenuPlayer(r.menu_player);
                    setMenuClub(r.menu_club);
                    setCarouselTitle(r.carousel_title);
                    setFooterHeader1(r.footer_header1);
                    setFooterHeader2(r.footer_header2);
                    setFooterHeader3(r.footer_header3);
                    setPhone(r.phone);
                    setEmail(r.email);
                    setFooterCol21(r.footer_col2_1);
                    setFooterCol22(r.footer_col2_2);
                    setFooterCol23(r.footer_col2_3);
                    setContactHeader(r.contact_header);
                    setContactInput1(r.contact_input1);
                    setContactInput2(r.contact_input2);
                    setContactInput3(r.contact_input3);
                    setContactText(r.contact_text);
                    setAboutUsMichal1(r.about_us_michal_1);
                    setAboutUsMichal2(r.about_us_michal_2);
                    setAboutUsMichal3(r.about_us_michal_3);
                    setAboutUsBartosz1(r.about_us_bartosz_1);
                    setAboutUsBartosz2(r.about_us_bartosz_2);
                    setAboutUsBartosz3(r.about_us_bartosz_3);
                    setAboutUsHeader(r.about_us_header);
                    setRegisterHeader(r.register_header);
                    setRegisterStep(r.register_step);
                    setMarketingConsent(r.marketing_consent);
                    setRegisterInput2(r.register_input2);
                    setRegisterInput3(r.register_input3);
                    setRegisterInput4(r.register_input4);
                    setRegisterInput5(r.register_input5);
                    setRegisterInput6(r.register_input6);
                    setRegisterInput7(r.register_input7);
                    setRegisterInput8(r.register_input8);
                    setRegisterConsent1(r.register_consent1);
                    setRegisterConsent2(r.register_consent2);
                    setLoginInput1(r.login_input1);
                    setLoginInput2(r.login_input2);
                    setLoginInput3(r.login_input3);
                    setLoginBox1(r.login_box1);
                    setLoginBox2(r.login_box2);
                    setPlayerZoneHeader1(r.player_zone_header1);
                    setPlayerZoneHeader2(r.player_zone_header2);
                    setPlayerZoneHeader3(r.player_zone_header3);
                    setPlayerZoneHeader4(r.player_zone_header4);
                    setPlayerZoneHeader5(r.player_zone_header5);
                    setPlayerZoneHeader6(r.player_zone_header6);
                    setPlayerZoneText1(r.player_zone_text1);
                    setPlayerZoneText2(r.player_zone_text2);
                    setPlayerZoneText3(r.player_zone_text3);
                    setPlayerZoneText4(r.player_zone_text4);
                    setPlayerZoneText5(r.player_zone_text5);
                    setPlayerZoneText6(r.player_zone_text6);
                    setPlayerZoneCircle1(r.player_zone_circle1);
                    setPlayerZoneCircle2(r.player_zone_circle2);
                    setPlayerZoneCircle3(r.player_zone_circle3);
                    setPlayerZoneBuyFrame1(r.player_zone_buy_frame1);
                    setPlayerZoneBuyFrame2(r.player_zone_buy_frame2);
                    setFaqHeader1(r.faq_header_1);
                    setFaqHeader2(r.faq_header_2);
                    setFaqHeader3(r.faq_header_3);
                    setFaqHeader4(r.faq_header_4);
                    setFaqQuestion1(r.faq_question_1);
                    setFaqQuestion2(r.faq_question_2);
                    setFaqQuestion3(r.faq_question_3);
                    setFaqQuestion4(r.faq_question_4);
                    setFaqQuestion5(r.faq_question_5);
                    setFaqQuestion6(r.faq_question_6);
                    setFaqQuestion7(r.faq_question_7);
                    setFaqQuestion8(r.faq_question_8);
                    setFaqQuestion9(r.faq_question_9);
                    setFaqQuestion10(r.faq_question_10);
                    setFaqQuestion11(r.faq_question_11);
                    setFaqQuestion12(r.faq_question_12);
                    setFaqQuestion13(r.faq_question_13);
                    setFaqQuestion14(r.faq_question_14);
                    setFaqQuestion15(r.faq_question_15);
                    setFaqQuestion16(r.faq_question_16);
                    setFaqAnswer1(r.faq_answer_1);
                    setFaqAnswer2(r.faq_answer_2);
                    setFaqAnswer3(r.faq_answer_3);
                    setFaqAnswer4(r.faq_answer_4);
                    setFaqAnswer5(r.faq_answer_5);
                    setFaqAnswer6(r.faq_answer_6);
                    setFaqAnswer7(r.faq_answer_7);
                    setFaqAnswer8(r.faq_answer_8);
                    setFaqAnswer9(r.faq_answer_9);
                    setFaqAnswer10(r.faq_answer_10);
                    setFaqAnswer11(r.faq_answer_11);
                    setFaqAnswer12(r.faq_answer_12);
                    setFaqAnswer13(r.faq_answer_13);
                    setFaqAnswer14(r.faq_answer_14);
                    setFaqAnswer15(r.faq_answer_15);
                    setFaqAnswer16(r.faq_answer_16);
                    setClubZoneHeader1(r.club_zone_header1);
                    setClubZoneHeader2(r.club_zone_header2);
                    setClubZoneHeader3(r.club_zone_header3);
                    setClubZoneHeader4(r.club_zone_header4);
                    setClubZoneHeader5(r.club_zone_header5);
                    setClubZoneText1(r.club_zone_text1);
                    setClubZoneText2(r.club_zone_text2);
                    setClubZoneText3(r.club_zone_text3);
                    setClubZoneText4(r.club_zone_text4);
                    setClubZoneText5(r.club_zone_text5);
                    setClubZoneContactFormHeader(r.club_zone_contact_form_header);
                    setClubZoneContactFormInput1(r.club_zone_contact_form_input1);
                    setClubZoneContactFormInput2(r.club_zone_contact_form_input2);
                    setClubZoneContactFormInput3(r.club_zone_contact_form_input3);
                    setClubZoneContactFormInput4(r.club_zone_contact_form_input4);
                    setMapHeader(r.map_header);
                    setMapGender(r.map_gender);
                    setMapLeagues(r.map_leagues);
                    setMapLeague1(r.map_league1);
                    setMapLeague2(r.map_league2);
                    setMapLeague3(r.map_league3);
                    setMapLocation(r.map_location);
                    setPlayerProfileNoMessages(r.player_profile_no_messages);
                    setPlayerProfileAllMessages(r.player_profile_all_messages);
                    setWelcomeHeader(r.welcome_header);
                    setWelcomeText(r.welcome_text);
                    setReadMore(r.read_more);
                    setClubActivitiesHeader1(r.club_activities_header1);
                    setClubActivitiesHeader2(r.club_activities_header2);
                    setClubActivitiesText1(r.club_activities_text1);
                    setClubActivitiesText2(r.club_activities_text2);
                    setYourSubscription(r.your_subscription);
                    setYourSubscriptionTextOk(r.your_subscription_text_ok);
                    setYourSubscriptionTextExpire(r.your_subscription_text_expire);
                    setYourSubscriptionDays(r.your_subscription_days);
                    setDropdownMenuPlayer(r.dropdown_menu_player);
                    setDropdownMenuClub(r.dropdown_menu_club);
                    setPlayerParameter1(r.player_parameter_1);
                    setPlayerParameter2(r.player_parameter_2);
                    setPlayerParameter3(r.player_parameter_3);
                    setPlayerParameter4(r.player_parameter_4);
                    setPlayerParameter5(r.player_parameter_5);
                    setPlayerParameter6(r.player_parameter_6);
                    setPlayerParameter7(r.player_parameter_7);
                    setPlayerParameter8(r.player_parameter_8);
                    setPlayerParameter9(r.player_parameter_9);
                    setPlayerParameter10(r.player_parameter_10);
                    setPlayerParameter11(r.player_parameter_11);
                    setPlayerParameter12(r.player_parameter_12);
                    setPlayerParameter13(r.player_parameter_13);
                    setAddAction(r.add_action);
                    setPlay(r.play);
                    setBackToProfile(r.back_to_profile);
                    setVideo(r.video);
                    setAddDate(r.add_date);
                    setElement1(r.element1);
                    setElement2(r.element2);
                    setElement3(r.element3);
                    setElement4(r.element4);
                    setElement5(r.element5);
                    setElement6(r.element6);
                    setAddVideoHeader(r.add_video_header);
                    setAddVideoText(r.add_video_text);
                    setAddVideoText2(r.add_video_text2);
                    setVideoAdded(r.video_added);
                    setDeleteVideoText(r.delete_video_text);
                    setVideoDeleted(r.video_deleted);
                    setPaymentHeader(r.payment_header);
                    setPaymentText(r.payment_text);
                    setPayWith(r.pay_with);
                    setDiscountCode(r.discount_code);
                    setDiscountCodeInput(r.discount_code_input);
                    setTyPageHeader(r.ty_page_header);
                    setTyPageText(r.ty_page_text);
                    setFamale(r.famale);
                    setMale(r.male);
                    setAfterRegisterText1(r.after_register_text_1);
                    setAfterRegisterText2(r.after_register_text_2);
                    setAfterVerificationText(r.after_verification_text);
                    setAge(r.age);
                    setMoreAboutPlayer(r.more_about_player);
                    setCreateYourTeam(r.create_your_team);
                    setContinueText(r.continue_text);
                    setFirstAndLastName(r.first_and_last_name);
                    setFindNewPlayer(r.find_new_player);
                    setFavoritePlayers(r.favorite_players);
                    setNoFavoritePlayers(r.no_favorite_players);
                    setNoPlayersFound(r.no_players_found);
                    setErrorText1(r.error_text_1);
                    setErrorText2(r.error_text_2);
                    setMessages(r.messages);
                    setNoVideosYet(r.no_videos_yet);
                    setAllPlayers(r.all_players);
                    setTeamName(r.team_name);
                    setCostOfTheTeam(r.cost_of_the_team);
                    setPosition(r.position);
                    setPosition1(r.position1);
                    setPosition2(r.position2);
                    setPosition3(r.position3);
                    setPosition4(r.position4);
                    setPosition5(r.position5);

                    setRegister(r.register);
                    setLogin(r.login);
                    setSignIn(r.sign_in);
                    setContactHeader2(r.contact_header2);
                    setNameError(r.name_error);
                    setEmailError(r.email_error);
                    setConfirmMsg(r.confirm_msg);
                    setAllText(r.all_text);
                    setNoClubs(r.no_clubs);
                    setRegisterHeader2(r.register_header_2);
                    setRegisterHeader3(r.register_header_3);
                    setRegisterInput1(r.register_input1);
                    setIdenticalPasswordError(r.identical_password_error);
                    setWeakPasswordError(r.weak_password_error);
                    setEmailAlreadyInUse(r.email_already_in_use);
                    setFirstNameError(r.first_name_error);
                    setLastNameError(r.last_name_error);
                    setSexError(r.sex_error);
                    setDateOfBirthError(r.date_of_birth_error);
                    setMinimalAgeError(r.minimal_age_error);
                    setPhoneNumberError(r.phone_number_error);
                    setWrongPhoneNumber(r.wrong_phone_number);
                    setError(r.error);
                    setAfterRegisterText3(r.after_register_text_3);
                    setLogin_error(r.login_error);
                    setElement7(r.element_7);
                    setElement8(r.element_8);
                    setChoosePosition(r.choose_position);
                    setVideoToLarge(r.video_to_large);
                    setPaymentText2(r.payment_text2);
                    setPaymentCode(r.payment_code);
                    setPaymentDiscount(r.payment_discount);
                    setPaymentCodeNotExists(r.payment_code_not_exists);
                    setPayWith2(r.pay_with2);
                    setNoMessages(r.no_messages);
                    setNotifications(r.notifications);
                    setYourResult(r.your_result);
                    setResultText(r.result_text);
                    setBackText(r.back_text);
                    setFilters(r.filters);
                    setPlayers(r.players);
                    setChangePassword1(r.change_password1);
                    setChangePassword2(r.change_password2);
                    setChangePassword3(r.change_password3);
                    setChangePassword4(r.change_password4);
                    setChangePassword5(r.change_password5);
                    setChangePassword6(r.change_password_input1);
                    setChangePassword7(r.change_password_input2);
                    setTeamUpdated(r.team_updated);
                    setTeamAdded(r.team_added);
                    setTeamError1(r.team_error1);
                    setTeamError2(r.team_error2);
                    setTeamsSaved(r.saved_teams);
                    setTeamsCol1(r.teams_col1);
                    setTeamsCol2(r.teams_col2);
                    setTeamsCol3(r.teams_col3);
                    setTeamsCol4(r.teams_col4);
                    setDeleteTeam(r.delete_team);
                    setDeleteTeamYes(r.delete_team_yes);
                    setDeleteTeamNo(r.delete_team_no);
                    setTeamDeleted(r.team_deleted);
                    setResetPassword1(r.reset_password1);
                    setResetPassword2(r.reset_password2);
                    setResetPassword3(r.reset_password3);
                    setResetPassword4(r.reset_password4);
                    setResetPassword5(r.reset_password5);
                    setResetPassword6(r.reset_password6);
                    setResetPassword7(r.reset_password7);
                    setMessageHeader1(r.messages_header1)
                    setMessageHeader2(r.messages_header2)
                    setMessageHeader3(r.messages_header3)
                    setMessageHeader4(r.messages_header4)
                    setMessageHeader5(r.messages_header5)
                    setMessageHeader6(r.messages_header6)
                    setMessageHeader7(r.messages_header7)
                    setMessageHeader8(r.messages_header8)
                    setMessageRead(r.messages_read);

                    setStuffZoneHeader1(r.stuff_zone_header1);
                    setStuffZoneHeader2(r.stuff_zone_header2);
                    setStuffZoneHeader3(r.stuff_zone_header3);
                    setStuffZoneHeader4(r.stuff_zone_header4);
                    setStuffZoneHeader5(r.stuff_zone_header5);
                    setStuffZoneHeader6(r.stuff_zone_header6);
                    setStuffZoneText1(r.stuff_zone_text1);
                    setStuffZoneText2(r.stuff_zone_text2);
                    setStuffZoneText3(r.stuff_zone_text3);
                    setStuffZoneText4(r.stuff_zone_text4);
                    setStuffZoneText5(r.stuff_zone_text5);
                    setStuffZoneText6(r.stuff_zone_text6);
                    setStuffZoneCircle1(r.stuff_zone_circle1);
                    setStuffZoneCircle2(r.stuff_zone_circle2);
                    setStuffZoneCircle3(r.stuff_zone_circle3);
                    setPost(r.post);
                    setPost1(r.post1);
                    setPost2(r.post2);
                    setPost3(r.post3);
                    setPost4(r.post4);
                    setPost5(r.post5);
                    setCvType1(r.cv_type1);
                    setCvType2(r.cv_type2);
                    setCvType3(r.cv_type3);
                    setAddNew(r.add_new);
                    setFindNewStuff(r.find_new_stuff);
                    setSeeCv(r.see_cv);
                    setCvInput1(r.cv_input1);
                    setCvInput2(r.cv_input2);
                    setCvInput3(r.cv_input3);
                    setClubSearchDropdown1(r.club_search_dropdown1);
                    setClubSearchDropdown2(r.club_search_dropdown2);
                    setDeleteCvText(r.delete_cv_text);
                    setCvDeleted(r.cv_deleted);
                    setCvAdded(r.cv_added);
                    setCvUpdated(r.cv_updated);
                    setCvInputError1(r.cv_input_error1);
                    setCvInputError2(r.cv_input_error2);
                    setCvInputError3(r.cv_input_error3);
                    setDeleteCvYes(r.delete_cv_yes);
                    setDeleteCvNo(r.delete_cv_no);
                    setAddAccountTypeHeader(r.add_account_type_header);
                    setAddAccountTypeTextUser(r.add_account_type_text_user);
                    setAddAccountTypeTextStaff(r.add_account_type_text_staff);
                    setAfterAddAccountTypeUser(r.after_add_account_type_user);
                    setAfterAddAccountTypeStaff(r.after_add_account_type_staff);
                    setSwitchAccountTypeUser(r.switch_account_type_user);
                    setSwitchAccountTypeStaff(r.switch_account_type_staff);

                    setRender(true);
                }
            });
    }, []);

    const handleSubmit = () => {
        updateCustomFields({
            lang, menu_before_login, menu_player, menu_club, carousel_title, footer_header1,
            footer_header2, footer_header3, phone, email, footer_col2_1, footer_col2_2,
            footer_col2_3, contact_header, contact_input1, contact_input2, contact_input3,
            contact_text, about_us_michal_1, about_us_michal_2, about_us_michal_3,
            about_us_bartosz_1, about_us_bartosz_2, about_us_bartosz_3, about_us_header,
            register_header, register_step, marketing_consent, register_input2,
            register_input3, register_input4, register_input5, register_input6,
            register_input7, register_input8, register_consent1, register_consent2,
            login_input1, login_input2, login_input3, login_box1, login_box2,
            player_zone_header1, player_zone_header2, player_zone_header3, player_zone_header4,
            player_zone_header5, player_zone_header6, player_zone_text1, player_zone_text2, player_zone_text3,
            player_zone_text4, player_zone_text5, player_zone_text6, player_zone_circle1, player_zone_circle2,
            player_zone_circle3, player_zone_buy_frame1, player_zone_buy_frame2, faq_header_1,
            faq_header_2, faq_header_3, faq_header_4,
            faq_question_1, faq_question_2, faq_question_3, faq_question_4,
            faq_question_5, faq_question_6, faq_question_7, faq_question_8,
            faq_question_9, faq_question_10, faq_question_11, faq_question_12,
            faq_question_13, faq_question_14, faq_question_15, faq_question_16,
            faq_answer_1, faq_answer_2, faq_answer_3, faq_answer_4,
            faq_answer_5, faq_answer_6, faq_answer_7, faq_answer_8,
            faq_answer_9, faq_answer_10, faq_answer_11, faq_answer_12,
            faq_answer_13, faq_answer_14, faq_answer_15, faq_answer_16,
            club_zone_header1, club_zone_header2, club_zone_header3, club_zone_header4,
            club_zone_header5, club_zone_text1, club_zone_text2, club_zone_text3, club_zone_text4,
            club_zone_text5, club_zone_contact_form_header, club_zone_contact_form_input1, club_zone_contact_form_input2,
            club_zone_contact_form_input3, club_zone_contact_form_input4, map_header, map_gender,
            map_leagues, map_league1, map_league2, map_league3, map_location,
            player_profile_no_messages, player_profile_all_messages, welcome_header, welcome_text,
            read_more, club_activities_header1, club_activities_header2, club_activities_text1, club_activities_text2,
            your_subscription, your_subscription_text_ok, your_subscription_text_expire, your_subscription_days,
            dropdown_menu_player, dropdown_menu_club, player_parameter_1, player_parameter_2, player_parameter_3,
            player_parameter_4, player_parameter_5, player_parameter_6, player_parameter_7, player_parameter_8,
            player_parameter_9, player_parameter_10, player_parameter_11, player_parameter_12, player_parameter_13,
            add_action, back_to_profile, video, play, add_date, element1, element2, element3, element4, element5, element6,
            add_video_header, add_video_text, add_video_text2, video_added, delete_video_text, video_deleted,
            payment_header, payment_text, pay_with, discount_code, discount_code_input, ty_page_header, ty_page_text,
            famale, male, after_register_text_1, after_register_text_2, after_verification_text, age,
            more_about_player, create_your_team, continue_text, first_and_last_name, find_new_player,
            favorite_players, no_favorite_players, no_players_found, no_teams_found, error_text_1, error_text_2,
            messages, no_videos_yet, all_players, team_name, cost_of_the_team, position,
            position1, position2, position3, position4, position5, register, login, sign_in,
            contact_header2, name_error, email_error, confirm_msg, all_text, no_clubs,
            register_header_2, register_header_3, identical_password_error,
            weak_password_error, email_already_in_use, first_name_error, last_name_error,
            sex_error, date_of_birth_error, minimal_age_error, phone_number_error, wrong_phone_number,
            error, after_register_text_3, login_error, element_7, element_8, choose_position,
            video_to_large, payment_text2, payment_code, payment_discount, payment_code_not_exists,
            pay_with2, no_messages, notifications, your_result, result_text, back_text,
            filters, players, change_password1, change_password2, change_password3, change_password4,
            change_password5, change_password_input1, change_password_input2, team_updated, team_added,
            team_error1, team_error2, saved_teams, teams_col1, teams_col2, teams_col3, teams_col4,
            delete_team, delete_team_yes, delete_team_no, team_deleted, reset_password1,
            reset_password2, reset_password3, reset_password4, reset_password5, reset_password6, reset_password7, register_input1,
            messages_header1, messages_header2, messages_header3, messages_header4, messages_header5, messages_header6,
            messages_header7, messages_header8, messages_read,
            stuff_zone_header1, stuff_zone_header2, stuff_zone_header3,
            stuff_zone_header4, stuff_zone_header5, stuff_zone_header6,
            stuff_zone_text1, stuff_zone_text2, stuff_zone_text3,
            stuff_zone_text4, stuff_zone_text5, stuff_zone_text6,
            stuff_zone_circle1, stuff_zone_circle2, stuff_zone_circle3,
            post, post1, post2, post3, post4, post5,
            cv_type1, cv_type2, cv_type3, add_new, find_new_stuff, see_cv,
            cv_input1, cv_input2, cv_input3, club_search_dropdown1, club_search_dropdown2,
            delete_cv_text, cv_deleted, cv_added, cv_updated, cv_input_error1, cv_input_error2, cv_input_error3,
            delete_cv_yes, delete_cv_no, add_account_type_header, add_account_type_text_user, add_account_type_text_staff,
            after_add_account_type_user, after_add_account_type_staff, switch_account_type_user, switch_account_type_staff
        })
            .then((res) => {
                if(res?.data?.result) {
                    setAddResult(1);
                }
                else {
                    setAddResult(0);
                }
            });
    }

    useEffect(() => {
        if(addResult !== -1) {
            window.scrollTo(0, 0);
            setAddResult(-1);
        }
    }, [addResult]);

    return <div className="container container--dark container--admin">
        <AdminTop />
        <main className="admin">
            <PanelMenu menuOpen={6} />
            {render ? <main className="admin__main">
                <header className="admin__flex">
                    <h1 className="admin__main__header">
                        Edytuj treści - wersja {lang === 'pl' ? 'polska' : 'angielska'}
                    </h1>
                    {addResult !== -1 ? <span className="admin__status">
                        {addResult === 1 ? <span className="admin__status__inner admin__status--success">
                            Treści zostały zaktualizowane
                        </span> : (addResult === 2) ? <span className="admin__status__inner admin__status--success">
                            Treści zostały zaktualizowane
                        </span> : (addResult === 0 ? <span className="admin__status__inner admin__status--error">
                            Coś poszło nie tak... Skontaktuj się z administratorem systemu
                        </span> : <span className="admin__status__inner admin__status--error">
                            Coś poszło nie tak... Skontaktuj się z administratorem systemu
                        </span>)}
                    </span> : ""}
                </header>
                <main className="admin__flex">
                    <section className="admin__main__form admin__main__form--addClub admin__main__form--cms">
                        <ChangeContentLabel label="Menu przed zalogowaniem (rozdzielone średnikiem)" value={menu_before_login} func={setMenuBeforeLogin} name="menu_before_login" />
                        <ChangeContentLabel label="Menu zawodnika (rozdzielone średnikiem)" value={menu_player} func={setMenuPlayer} name="menu_player" />
                        <ChangeContentLabel label="Menu klubu (rozdzielone średnikiem)" value={menu_club} func={setMenuClub} name="menu_club" />
                        <ChangeContentLabel label="Nagłówek nad sliderem klubów" value={carousel_title} func={setCarouselTitle} name="carousel_title" />
                        <ChangeContentLabel label="Nagłówek w stopce 1" value={footer_header1} func={setFooterHeader1} name="footer_header1" />
                        <ChangeContentLabel label="Nagłówek w stopce 2" value={footer_header2} func={setFooterHeader2} name="footer_header2" />
                        <ChangeContentLabel label="Nagłówek w stopce 3" value={footer_header3} func={setFooterHeader3} name="footer_header3" />
                        <ChangeContentLabel label="Telefon" value={phone} func={setPhone} name="phone" />
                        <ChangeContentLabel label="Email" value={email} func={setEmail} name="email" />
                        <ChangeContentLabel label="Stopka - druga kolumna, 1" value={footer_col2_1} func={setFooterCol21} name="footer_col_2_1" />
                        <ChangeContentLabel label="Stopka - druga kolumna, 2" value={footer_col2_2} func={setFooterCol22} name="footer_col_2_2" />
                        <ChangeContentLabel label="Stopka - druga kolumna, 3" value={footer_col2_3} func={setFooterCol23} name="footer_col_2_3" />
                        <ChangeContentLabel label="Kontakt" value={contact_header} func={setContactHeader} name="contact_header" />
                        <ChangeContentLabel label="Formularz kontaktowy - pole 1" value={contact_input1} func={setContactInput1} name="contact_input_1" />
                        <ChangeContentLabel label="Formularz kontaktowy - pole 2" value={contact_input2} func={setContactInput2} name="contact_input_2" />
                        <ChangeContentLabel label="Formularz kontaktowy - pole 3" value={contact_input3} func={setContactInput3} name="contact_input_3" />
                        <ChangeContentLabel label="Formularz kontaktowy - tekst" value={contact_text} func={setContactText} name="contact_text" />
                        <ChangeContentLabel label="O nas - nagłówek" value={about_us_header} func={setAboutUsHeader} name="about_us_header" />
                        <ChangeContentLabel label="O nas - Michał 1" value={about_us_michal_1} func={setAboutUsMichal1} name="about_us_michal_1" />
                        <ChangeContentLabel label="O nas - Michał 2" value={about_us_michal_2} func={setAboutUsMichal2} name="about_us_michal_2" />
                        <ChangeContentLabel label="O nas - Michał 3" value={about_us_michal_3} func={setAboutUsMichal3} name="about_us_michal_3" />
                        <ChangeContentLabel label="O nas - Bartek 1" value={about_us_bartosz_1} func={setAboutUsBartosz1} name="about_us_bartosz_1" />
                        <ChangeContentLabel label="O nas - Bartek 2" value={about_us_bartosz_2} func={setAboutUsBartosz2} name="about_us_bartosz_2" />
                        <ChangeContentLabel label="O nas - Bartek 3" value={about_us_bartosz_3} func={setAboutUsBartosz3} name="about_us_bartosz_3" />
                        <ChangeContentLabel label="Rejestracja - nagłówek" value={register_header} func={setRegisterHeader} name="register_header" />
                        <ChangeContentLabel label="Rejestracja - krok" value={register_step} func={setRegisterStep} name="register_step" />
                        <ChangeContentLabel label="Rejestracja - input 1" value={register_input1} func={setRegisterInput1} name="register_input_1" />
                        <ChangeContentLabel label="Rejestracja - input 2" value={register_input2} func={setRegisterInput2} name="register_input2" />
                        <ChangeContentLabel label="Rejestracja - input 3" value={register_input3} func={setRegisterInput3} name="register_input3" />
                        <ChangeContentLabel label="Rejestracja - input 4" value={register_input4} func={setRegisterInput4} name="register_input4" />
                        <ChangeContentLabel label="Rejestracja - input 5" value={register_input5} func={setRegisterInput5} name="register_input5" />
                        <ChangeContentLabel label="Rejestracja - input 6" value={register_input6} func={setRegisterInput6} name="register_input6" />
                        <ChangeContentLabel label="Rejestracja - input 7" value={register_input7} func={setRegisterInput7} name="register_input7" />
                        <ChangeContentLabel label="Rejestracja - input 8" value={register_input8} func={setRegisterInput8} name="register_input8" />
                        <ChangeContentLabel label="Mężczyzna" value={male} func={setMale} name="male" />
                        <ChangeContentLabel label="Kobieta" value={famale} func={setFamale} name="famale" />
                        <ChangeContentLabel label="Rejestracja - zgoda marketingowa" value={marketing_consent} func={setMarketingConsent} name="marketing_consent" />
                        <ChangeContentLabel label="Rejestracja - zgoda 1" value={register_consent1} func={setRegisterConsent1} name="register_consent1" />
                        <ChangeContentLabel label="Rejestracja - zgoda 2" value={register_consent2} func={setRegisterConsent2} name="register_consent2" />
                        <ChangeContentLabel label="Login - input 1" value={login_input1} func={setLoginInput1} name="login_input1" />
                        <ChangeContentLabel label="Login - input 2" value={login_input2} func={setLoginInput2} name="login_input2" />
                        <ChangeContentLabel label="Login box - 1" value={login_box1} func={setLoginBox1} name="login_box1" />
                        <ChangeContentLabel label="Login box - 2" value={login_box2} func={setLoginBox2} name="login_box2" />
                        <ChangeContentLabel label="Strefa zawodnika - nagłówek 1" value={player_zone_header1} func={setPlayerZoneHeader1} name="player_zone_header1" />
                        <ChangeContentLabel label="Strefa zawodnika - nagłówek 2" value={player_zone_header2} func={setPlayerZoneHeader2} name="player_zone_header2" />
                        <ChangeContentLabel label="Strefa zawodnika - nagłówek 3" value={player_zone_header3} func={setPlayerZoneHeader3} name="player_zone_header3" />
                        <ChangeContentLabel label="Strefa zawodnika - nagłówek 4" value={player_zone_header4} func={setPlayerZoneHeader4} name="player_zone_header4" />
                        <ChangeContentLabel label="Strefa zawodnika - nagłówek 5" value={player_zone_header5} func={setPlayerZoneHeader5} name="player_zone_header5" />
                        <ChangeContentLabel label="Strefa zawodnika - nagłówek 6" value={player_zone_header6} func={setPlayerZoneHeader6} name="player_zone_header6" />
                        <ChangeContentLabel label="Strefa zawodnika - tekst 1" value={player_zone_text1} func={setPlayerZoneText1} name="player_zone_text1" type="textarea" />
                        <ChangeContentLabel label="Strefa zawodnika - tekst 2" value={player_zone_text2} func={setPlayerZoneText2} name="player_zone_text2" type="textarea" />
                        <ChangeContentLabel label="Strefa zawodnika - tekst 3" value={player_zone_text3} func={setPlayerZoneText3} name="player_zone_text3" type="textarea" />
                        <ChangeContentLabel label="Strefa zawodnika - tekst 4" value={player_zone_text4} func={setPlayerZoneText4} name="player_zone_text4" type="textarea" />
                        <ChangeContentLabel label="Strefa zawodnika - tekst 5" value={player_zone_text5} func={setPlayerZoneText5} name="player_zone_text5" type="textarea" />
                        <ChangeContentLabel label="Strefa zawodnika - tekst 6" value={player_zone_text6} func={setPlayerZoneText6} name="player_zone_text6" type="textarea" />
                        <ChangeContentLabel label="Strefa zawodnika - kółko 1" value={player_zone_circle1} func={setPlayerZoneCircle1} name="player_zone_circle1" />
                        <ChangeContentLabel label="Strefa zawodnika - kółko 2" value={player_zone_circle2} func={setPlayerZoneCircle2} name="player_zone_circle2" />
                        <ChangeContentLabel label="Strefa zawodnika - kółko 3" value={player_zone_circle3} func={setPlayerZoneCircle3} name="player_zone_circle3" />
                        <ChangeContentLabel label="Strefa zawodnika - kup teraz 1" value={player_zone_buy_frame1} func={setPlayerZoneBuyFrame1} name="player_zone_buy_frame1" />
                        <ChangeContentLabel label="Strefa zawodnika - kup teraz 2" value={player_zone_buy_frame2} func={setPlayerZoneBuyFrame2} name="player_zone_buy_frame2" />
                        <ChangeContentLabel label="FAQ - kategoria 1." value={faq_header_1} func={setFaqHeader1} name="faq_header_1" />
                        <ChangeContentLabel label="FAQ - kategoria 2." value={faq_header_2} func={setFaqHeader2} name="faq_header_2" />
                        <ChangeContentLabel label="FAQ - kategoria 3." value={faq_header_3} func={setFaqHeader3} name="faq_header_3" />
                        <ChangeContentLabel label="FAQ - kategoria 4." value={faq_header_4} func={setFaqHeader4} name="faq_header_4" />
                        <ChangeContentLabel label="FAQ - pytanie 1." value={faq_question_1} func={setFaqQuestion1} name="faq_question_1" />
                        <ChangeContentLabel label="FAQ - pytanie 2." value={faq_question_2} func={setFaqQuestion2} name="faq_question_2" />
                        <ChangeContentLabel label="FAQ - pytanie 3." value={faq_question_3} func={setFaqQuestion3} name="faq_question_3" />
                        <ChangeContentLabel label="FAQ - pytanie 4." value={faq_question_4} func={setFaqQuestion4} name="faq_question_4" />
                        <ChangeContentLabel label="FAQ - pytanie 5." value={faq_question_5} func={setFaqQuestion5} name="faq_question_5" />
                        <ChangeContentLabel label="FAQ - pytanie 6." value={faq_question_6} func={setFaqQuestion6} name="faq_question_6" />
                        <ChangeContentLabel label="FAQ - pytanie 7." value={faq_question_7} func={setFaqQuestion7} name="faq_question_7" />
                        <ChangeContentLabel label="FAQ - pytanie 8." value={faq_question_8} func={setFaqQuestion8} name="faq_question_8" />
                        <ChangeContentLabel label="FAQ - pytanie 9." value={faq_question_9} func={setFaqQuestion9} name="faq_question_9" />
                        <ChangeContentLabel label="FAQ - pytanie 10." value={faq_question_10} func={setFaqQuestion10} name="faq_question_10" />
                        <ChangeContentLabel label="FAQ - pytanie 11." value={faq_question_11} func={setFaqQuestion11} name="faq_question_11" />
                        <ChangeContentLabel label="FAQ - pytanie 12." value={faq_question_12} func={setFaqQuestion12} name="faq_question_12" />
                        <ChangeContentLabel label="FAQ - pytanie 13." value={faq_question_13} func={setFaqQuestion13} name="faq_question_13" />
                        <ChangeContentLabel label="FAQ - pytanie 14." value={faq_question_14} func={setFaqQuestion14} name="faq_question_14" />
                        <ChangeContentLabel label="FAQ - pytanie 15." value={faq_question_15} func={setFaqQuestion15} name="faq_question_15" />
                        <ChangeContentLabel label="FAQ - pytanie 16." value={faq_question_16} func={setFaqQuestion16} name="faq_question_16" />
                        <ChangeContentLabel label="FAQ - odpowiedź 1." value={faq_answer_1} func={setFaqAnswer1} name="faq_answer_1" type="textarea" />
                        <ChangeContentLabel label="FAQ - odpowiedź 2." value={faq_answer_2} func={setFaqAnswer2} name="faq_answer_2" type="textarea" />
                        <ChangeContentLabel label="FAQ - odpowiedź 3." value={faq_answer_3} func={setFaqAnswer3} name="faq_answer_3" type="textarea" />
                        <ChangeContentLabel label="FAQ - odpowiedź 4." value={faq_answer_4} func={setFaqAnswer4} name="faq_answer_4" type="textarea" />
                        <ChangeContentLabel label="FAQ - odpowiedź 5." value={faq_answer_5} func={setFaqAnswer5} name="faq_answer_5" type="textarea" />
                        <ChangeContentLabel label="FAQ - odpowiedź 6." value={faq_answer_6} func={setFaqAnswer6} name="faq_answer_6" type="textarea" />
                        <ChangeContentLabel label="FAQ - odpowiedź 7." value={faq_answer_7} func={setFaqAnswer7} name="faq_answer_7" type="textarea" />
                        <ChangeContentLabel label="FAQ - odpowiedź 8." value={faq_answer_8} func={setFaqAnswer8} name="faq_answer_8" type="textarea" />
                        <ChangeContentLabel label="FAQ - odpowiedź 9." value={faq_answer_9} func={setFaqAnswer9} name="faq_answer_9" type="textarea" />
                        <ChangeContentLabel label="FAQ - odpowiedź 10." value={faq_answer_10} func={setFaqAnswer10} name="faq_answer_10" type="textarea" />
                        <ChangeContentLabel label="FAQ - odpowiedź 11." value={faq_answer_11} func={setFaqAnswer11} name="faq_answer_11" type="textarea" />
                        <ChangeContentLabel label="FAQ - odpowiedź 12." value={faq_answer_12} func={setFaqAnswer12} name="faq_answer_12" type="textarea" />
                        <ChangeContentLabel label="FAQ - odpowiedź 13." value={faq_answer_13} func={setFaqAnswer13} name="faq_answer_13" type="textarea" />
                        <ChangeContentLabel label="FAQ - odpowiedź 14." value={faq_answer_14} func={setFaqAnswer14} name="faq_answer_14" type="textarea" />
                        <ChangeContentLabel label="FAQ - odpowiedź 15." value={faq_answer_15} func={setFaqAnswer15} name="faq_answer_15" type="textarea" />
                        <ChangeContentLabel label="FAQ - odpowiedź 16." value={faq_answer_16} func={setFaqAnswer16} name="faq_answer_16" type="textarea" />
                        <ChangeContentLabel label="Strefa klubowa - nagłówek 1." value={club_zone_header1} func={setClubZoneHeader1} name="club_zone_header1" />
                        <ChangeContentLabel label="Strefa klubowa - nagłówek 2." value={club_zone_header2} func={setClubZoneHeader2} name="club_zone_header2" />
                        <ChangeContentLabel label="Strefa klubowa - nagłówek 3." value={club_zone_header3} func={setClubZoneHeader3} name="club_zone_header3" />
                        <ChangeContentLabel label="Strefa klubowa - nagłówek 4." value={club_zone_header4} func={setClubZoneHeader4} name="club_zone_header4" />
                        <ChangeContentLabel label="Strefa klubowa - nagłówek 5." value={club_zone_header5} func={setClubZoneHeader5} name="club_zone_header5" />
                        <ChangeContentLabel label="Strefa klubowa - tekst 1." value={club_zone_text1} func={setClubZoneText1} name="club_zone_text_1" type="textarea" />
                        <ChangeContentLabel label="Strefa klubowa - tekst 2." value={club_zone_text2} func={setClubZoneText2} name="club_zone_text_2" type="textarea" />
                        <ChangeContentLabel label="Strefa klubowa - tekst 3." value={club_zone_text3} func={setClubZoneText3} name="club_zone_text_3" type="textarea" />
                        <ChangeContentLabel label="Strefa klubowa - tekst 4." value={club_zone_text4} func={setClubZoneText4} name="club_zone_text_4" type="textarea" />
                        <ChangeContentLabel label="Strefa klubowa - tekst 5." value={club_zone_text5} func={setClubZoneText5} name="club_zone_text_5" type="textarea" />
                        <ChangeContentLabel label="Strefa klubowa - nagłówek formularza kontaktowego" value={club_zone_contact_form_header} func={setClubZoneContactFormHeader} name="club_zone_contact_form_header" />
                        <ChangeContentLabel label="Strefa klubowa - formularz kontaktowy, input 1" value={club_zone_contact_form_input1} func={setClubZoneContactFormInput1} name="club_zone_contact_form_input1" />
                        <ChangeContentLabel label="Strefa klubowa - formularz kontaktowy, input 2" value={club_zone_contact_form_input2} func={setClubZoneContactFormInput2} name="club_zone_contact_form_input2" />
                        <ChangeContentLabel label="Strefa klubowa - formularz kontaktowy, input 3" value={club_zone_contact_form_input3} func={setClubZoneContactFormInput3} name="club_zone_contact_form_input3" />
                        <ChangeContentLabel label="Strefa klubowa - formularz kontaktowy, input 4" value={club_zone_contact_form_input4} func={setClubZoneContactFormInput4} name="club_zone_contact_form_input4" />
                        <ChangeContentLabel label="Mapa - nagłówek" value={map_header} func={setMapHeader} name="map_header" />
                        <ChangeContentLabel label="Mapa - płeć" value={map_gender} func={setMapGender} name="map_gender" />
                        <ChangeContentLabel label="Mapa - ligi" value={map_leagues} func={setMapLeagues} name="map_leagues" />
                        <ChangeContentLabel label="Mapa - 1. liga" value={map_league1} func={setMapLeague1} name="map_league1" />
                        <ChangeContentLabel label="Mapa - 2. liga" value={map_league2} func={setMapLeague2} name="map_league2" />
                        <ChangeContentLabel label="Mapa - 3. liga" value={map_league3} func={setMapLeague3} name="map_league3" />
                        <ChangeContentLabel label="Mapa - siedziba" value={map_location} func={setMapLocation} name="map_location" />
                        <ChangeContentLabel label="Brak wiadomości" value={player_profile_no_messages} func={setPlayerProfileNoMessages} name="player_profile_no_messages" />
                        <ChangeContentLabel label="Zobacz wszystkie wiadomości" value={player_profile_all_messages} func={setPlayerProfileAllMessages} name="player_profile_all_messages" />
                        <ChangeContentLabel label="Witaj - nagłówek" value={welcome_header} func={setWelcomeHeader} name="welcome_header" />
                        <ChangeContentLabel label="Witaj - tekst" value={welcome_text} func={setWelcomeText} name="welcome_text" type="textarea" />
                        <ChangeContentLabel label="Czytaj więcej" value={read_more} func={setReadMore} name="read_more" />
                        <ChangeContentLabel label="Aktywności klubów - nagłówek 1" value={club_activities_header1} func={setClubActivitiesHeader1} name="club_activities_header1" />
                        <ChangeContentLabel label="Aktywności klubów - nagłówek 2" value={club_activities_header2} func={setClubActivitiesHeader2} name="club_activities_header2" />
                        <ChangeContentLabel label="Aktywności klubów - tekst 1" value={club_activities_text1} func={setClubActivitiesText1} name="club_activities_text1" />
                        <ChangeContentLabel label="Aktywności klubów - tekst 2" value={club_activities_text2} func={setClubActivitiesText2} name="club_activities_text2" />
                        <ChangeContentLabel label="Twoja subskrypcja" value={your_subscription} func={setYourSubscription} name="your_subscription" />
                        <ChangeContentLabel label="Twoja subskrypcja - ok" value={your_subscription_text_ok} func={setYourSubscriptionTextOk} name="your_subscription_text_ok" />
                        <ChangeContentLabel label="Twoja subskrypcja - wygasła" value={your_subscription_text_expire} func={setYourSubscriptionTextExpire} name="your_subscription_text_expire" />
                        <ChangeContentLabel label="Twoja subskrypcja - dni" value={your_subscription_days} func={setYourSubscriptionDays} name="your_subscription_days" />
                        <ChangeContentLabel label="Dropdown menu - zawodnik (rozdzielone średnikiem)" value={dropdown_menu_player} func={setDropdownMenuPlayer} name="dropdown_menu_player" />
                        <ChangeContentLabel label="Dropdown menu - klub (rozdzielone średnikiem)" value={dropdown_menu_club} func={setDropdownMenuClub} name="dropdown_menu_club" />
                        <ChangeContentLabel label="Parametr zawodnika - 1" value={player_parameter_1} func={setPlayerParameter1} name="player_parameter_1" />
                        <ChangeContentLabel label="Parametr zawodnika - 2" value={player_parameter_2} func={setPlayerParameter2} name="player_parameter_2" />
                        <ChangeContentLabel label="Parametr zawodnika - 3" value={player_parameter_3} func={setPlayerParameter3} name="player_parameter_3" />
                        <ChangeContentLabel label="Parametr zawodnika - 4" value={player_parameter_4} func={setPlayerParameter4} name="player_parameter_4" />
                        <ChangeContentLabel label="Parametr zawodnika - 5" value={player_parameter_5} func={setPlayerParameter5} name="player_parameter_5" />
                        <ChangeContentLabel label="Parametr zawodnika - 6" value={player_parameter_6} func={setPlayerParameter6} name="player_parameter_6" />
                        <ChangeContentLabel label="Parametr zawodnika - 7" value={player_parameter_7} func={setPlayerParameter7} name="player_parameter_7" />
                        <ChangeContentLabel label="Parametr zawodnika - 8" value={player_parameter_8} func={setPlayerParameter8} name="player_parameter_8" />
                        <ChangeContentLabel label="Parametr zawodnika - 9" value={player_parameter_9} func={setPlayerParameter9} name="player_parameter_9" />
                        <ChangeContentLabel label="Parametr zawodnika - 10" value={player_parameter_10} func={setPlayerParameter10} name="player_parameter_10" />
                        <ChangeContentLabel label="Parametr zawodnika - 11" value={player_parameter_11} func={setPlayerParameter11} name="player_parameter_11" />
                        <ChangeContentLabel label="Parametr zawodnika - 12" value={player_parameter_12} func={setPlayerParameter12} name="player_parameter_12" />
                        <ChangeContentLabel label="Parametr zawodnika - 13" value={player_parameter_13} func={setPlayerParameter13} name="player_parameter_13" />
                        <ChangeContentLabel label="Dodaj akcje" value={add_action} func={setAddAction} name="add_action" />
                        <ChangeContentLabel label="Wróć do profilu" value={back_to_profile} func={setBackToProfile} name="back_to_profile" />
                        <ChangeContentLabel label="Video" value={video} func={setVideo} name="video" />
                        <ChangeContentLabel label="Akcja" value={play} func={setPlay} name="play" />
                        <ChangeContentLabel label="Data dodania" value={add_date} func={setAddDate} name="add_date" />
                        <ChangeContentLabel label="Typ filmu 1" value={element1} func={setElement1} name="element1" />
                        <ChangeContentLabel label="Typ filmu 2" value={element2} func={setElement2} name="element2" />
                        <ChangeContentLabel label="Typ filmu 3" value={element3} func={setElement3} name="element3" />
                        <ChangeContentLabel label="Typ filmu 4" value={element4} func={setElement4} name="element4" />
                        <ChangeContentLabel label="Typ filmu 5" value={element5} func={setElement5} name="element5" />
                        <ChangeContentLabel label="Typ filmu 6" value={element6} func={setElement6} name="element6" />
                        <ChangeContentLabel label="Dodaj video - nagłówek" value={add_video_header} func={setAddVideoHeader} name="add_video_header" />
                        <ChangeContentLabel label="Dodaj video - tekst 1" value={add_video_text} func={setAddVideoText} name="add_video_text" />
                        <ChangeContentLabel label="Dodaj video - tekst 2" value={add_video_text2} func={setAddVideoText2} name="add_video_text2" />
                        <ChangeContentLabel label="Video dodane" value={video_added} func={setVideoAdded} name="video_added" />
                        <ChangeContentLabel label="Usuń video" value={delete_video_text} func={setDeleteVideoText} name="delete_video_text" />
                        <ChangeContentLabel label="Video usunięte" value={video_deleted} func={setVideoDeleted} name="video_deleted" />
                        <ChangeContentLabel label="Płatność - nagłówek" value={payment_header} func={setPaymentHeader} name="payment_header" />
                        <ChangeContentLabel label="Płatność - tekst" value={payment_text} func={setPaymentText} name="payment_text" />
                        <ChangeContentLabel label="Płać z" value={pay_with} func={setPayWith} name="pay_with" />
                        <ChangeContentLabel label="Kod rabatowy" value={discount_code} func={setDiscountCode} name="discount_code" />
                        <ChangeContentLabel label="Kod rabatowy - input" value={discount_code_input} func={setDiscountCodeInput} name="discount_code_input" />
                        <ChangeContentLabel label="Strona po opłaceniu subskrypcji - nagłówek" value={ty_page_header} func={setTyPageHeader} name="ty_page_header" />
                        <ChangeContentLabel label="Strona po opłaceniu subskrypcji - tekst" value={ty_page_text} func={setTyPageText} name="ty_page_text" />
                        <ChangeContentLabel label="Strona po rejestracji - tekst 1" value={after_register_text_1} func={setAfterRegisterText1} name="after_register_text_1" />
                        <ChangeContentLabel label="Strona po rejestracji - tekst 2" value={after_register_text_2} func={setAfterRegisterText2} name="after_register_text_2" />
                        <ChangeContentLabel label="Strona po weryfikacji - tekst" value={after_verification_text} func={setAfterVerificationText} name="after_verification_text" />
                        <ChangeContentLabel label="Wiek" value={age} func={setAge} name="age" />
                        <ChangeContentLabel label="Więcej" value={more_about_player} func={setMoreAboutPlayer} name="more_about_player" />
                        <ChangeContentLabel label="Stwórz swoją drużyne" value={create_your_team} func={setCreateYourTeam} name="create_your_team" />
                        <ChangeContentLabel label="Dalej" value={continue_text} func={setContinueText} name="continue_text" />
                        <ChangeContentLabel label="Imię i nazwisko" value={first_and_last_name} func={setFirstAndLastName} name="first_and_last_name" />
                        <ChangeContentLabel label="Wyszukaj zawodnika" value={find_new_player} func={setFindNewPlayer} name="find_new_player" />
                        <ChangeContentLabel label="Ulubieni zawodnicy" value={favorite_players} func={setFavoritePlayers} name="favorite_players" />
                        <ChangeContentLabel label="Brak ulubionych zawodników" value={no_favorite_players} func={setNoFavoritePlayers} name="no_favorite_players" />
                        <ChangeContentLabel label="Nie znaleziono zawodników" value={no_players_found} func={setNoPlayersFound} name="no_players_found" />
                        <ChangeContentLabel label="Nie znaleziono drużyn" value={no_teams_found} func={setNoTeamsFound} name="no_teams_found" />
                        <ChangeContentLabel label="Wiadomości" value={messages} func={setMessages} name="messages" />
                        <ChangeContentLabel label="Brak filmików" value={no_videos_yet} func={setNoVideosYet} name="no_videos_yet" />
                        <ChangeContentLabel label="Wszyscy zawodnicy" value={all_players} func={setAllPlayers} name="all_players" />
                        <ChangeContentLabel label="Nazwa drużyny" value={team_name} func={setTeamName} name="team_name" />
                        <ChangeContentLabel label="Koszt drużyny" value={cost_of_the_team} func={setCostOfTheTeam} name="cost_of_the_team" />
                        <ChangeContentLabel label="Pozycja" value={position} func={setPosition} name="position" />
                        <ChangeContentLabel label="Pozycja 1" value={position1} func={setPosition1} name="position1" />
                        <ChangeContentLabel label="Pozycja 2" value={position2} func={setPosition2} name="position2" />
                        <ChangeContentLabel label="Pozycja 3" value={position3} func={setPosition3} name="position3" />
                        <ChangeContentLabel label="Pozycja 4" value={position4} func={setPosition4} name="position4" />
                        <ChangeContentLabel label="Pozycja 5" value={position5} func={setPosition5} name="position5" />


                        <ChangeContentLabel label="Zarejestruj się" value={register} func={setRegister} name="register" />
                        <ChangeContentLabel label="Zaloguj się 1" value={login} func={setLogin} name="login1" />
                        <ChangeContentLabel label="Zaloguj się 2" value={sign_in} func={setSignIn} name="login2" />
                        <ChangeContentLabel label="Kontakt - nagłówek" value={contact_header2} func={setContactHeader2} name="contact_header" />
                        <ChangeContentLabel label="Błąd - nazwa" value={name_error} func={setNameError} name="name_error" />
                        <ChangeContentLabel label="Błąd - email" value={email_error} func={setEmailError} name="email_error" />
                        <ChangeContentLabel label="Potwierdzenie" value={confirm_msg} func={setConfirmMsg} name="confirm_msg" />
                        <ChangeContentLabel label="Wszystko" value={all_text} func={setAllText} name="all_text" />
                        <ChangeContentLabel label="Brak klubów" value={no_clubs} func={setNoClubs} name="no_clubs" />
                        <ChangeContentLabel label="Rejestracja - nagłówek 2" value={register_header_2} func={setRegisterHeader2} name="register_header_2" />
                        <ChangeContentLabel label="Rejestracja - nagłówek 3" value={register_header_3} func={setRegisterHeader3} name="register_header_3" />
                        <ChangeContentLabel label="Takie same hasła" value={identical_password_error} func={setIdenticalPasswordError} name="identical_password_error" />
                        <ChangeContentLabel label="Słabe hasło" value={weak_password_error} func={setWeakPasswordError} name="weak_password_error" />
                        <ChangeContentLabel label="Email zajęty" value={email_already_in_use} func={setEmailAlreadyInUse} name="email_already_in_use" />
                        <ChangeContentLabel label="Błąd - imię" value={first_name_error} func={setFirstNameError} name="first_name_error" />
                        <ChangeContentLabel label="Błąd - nazwisko" value={last_name_error} func={setLastNameError} name="last_name_error" />
                        <ChangeContentLabel label="Błąd - płeć" value={sex_error} func={setSexError} name="sex_error" />
                        <ChangeContentLabel label="Błąd - data urodzenia" value={date_of_birth_error} func={setDateOfBirthError} name="date_of_birth_error" />
                        <ChangeContentLabel label="Błąd - wiek" value={minimal_age_error} func={setMinimalAgeError} name="minimal_age_error" />
                        <ChangeContentLabel label="Błąd - numer telefonu" value={phone_number_error} func={setPhoneNumberError} name="phone_number_error" />
                        <ChangeContentLabel label="Błąd - zły numer telefonu" value={wrong_phone_number} func={setWrongPhoneNumber} name="wrong_phone_number" />
                        <ChangeContentLabel label="Błąd" value={error} func={setError} name="error" />
                        <ChangeContentLabel label="Po rejestracji - 3" value={after_register_text_3} func={setAfterRegisterText3} name="after_register_text_3" />
                        <ChangeContentLabel label="Login - error" value={login_error} func={setLogin_error} name="login_error" />
                        <ChangeContentLabel label="Element 7" value={element_7} func={setElement7} name="element_7" />
                        <ChangeContentLabel label="Element 8" value={element_8} func={setElement8} name="element_8" />
                        <ChangeContentLabel label="Wybierz pozycję" value={choose_position} func={setChoosePosition} name="choose_position" />
                        <ChangeContentLabel label="Video za duże" value={video_to_large} func={setVideoToLarge} name="video_to_large" />
                        <ChangeContentLabel label="Płatność - 2" value={payment_text2} func={setPaymentText2} name="payment_text2" />
                        <ChangeContentLabel label="Kod rabatowy" value={payment_code} func={setPaymentCode} name="payment_code" />
                        <ChangeContentLabel label="Płatność - zniżka" value={payment_discount} func={setPaymentDiscount} name="payment_discount" />
                        <ChangeContentLabel label="Kod nie istnieje" value={payment_code_not_exists} func={setPaymentCodeNotExists} name="payment_code_not_exists" />
                        <ChangeContentLabel label="Płać z PayPal" value={pay_with2} func={setPayWith2} name="pay_with2" />
                        <ChangeContentLabel label="Brak wiadomości" value={no_messages} func={setNoMessages} name="no_messages" />
                        <ChangeContentLabel label="Powiadomienia" value={notifications} func={setNotifications} name="notifications" />
                        <ChangeContentLabel label="Twój wynik" value={your_result} func={setYourResult} name="your_result" />
                        <ChangeContentLabel label="Wynik" value={result_text} func={setResultText} name="result_text" />
                        <ChangeContentLabel label="Wróć" value={back_text} func={setBackText} name="back_text" />
                        <ChangeContentLabel label="Filtry" value={filters} func={setFilters} name="filters" />
                        <ChangeContentLabel label="Zawodnicy" value={players} func={setPlayers} name="players" />
                        <ChangeContentLabel label="Zmień hasło - 1" value={change_password1} func={setChangePassword1} name="change_password1" />
                        <ChangeContentLabel label="Zmień hasło - 2" value={change_password2} func={setChangePassword2} name="change_password2" />
                        <ChangeContentLabel label="Zmień hasło - 3" value={change_password3} func={setChangePassword3} name="change_password3" />
                        <ChangeContentLabel label="Zmień hasło - 4" value={change_password4} func={setChangePassword4} name="change_password4" />
                        <ChangeContentLabel label="Zmień hasło - 5" value={change_password5} func={setChangePassword5} name="change_password5" />
                        <ChangeContentLabel label="Zmień hasło - 6" value={change_password_input1} func={setChangePassword6} name="change_password6" />
                        <ChangeContentLabel label="Zmień hasło - 7" value={change_password_input2} func={setChangePassword7} name="change_password7" />
                        <ChangeContentLabel label="Skład zaktualizowany" value={team_updated} func={setTeamUpdated} name="team_updated" />
                        <ChangeContentLabel label="Skład dodany" value={team_added} func={setTeamAdded} name="team_added" />
                        <ChangeContentLabel label="Składy - błąd 1" value={team_error1} func={setTeamError1} name="team_error1" />
                        <ChangeContentLabel label="Składy - błąd 2" value={team_error2} func={setTeamError2} name="team_error2" />
                        <ChangeContentLabel label="Zapisane składy" value={saved_teams} func={setTeamsSaved} name="teams_saved" />
                        <ChangeContentLabel label="Drużyny - kolumna 1" value={teams_col1} func={setTeamsCol1} name="teams_col1" />
                        <ChangeContentLabel label="Drużyny - kolumna 2" value={teams_col2} func={setTeamsCol2} name="teams_col2" />
                        <ChangeContentLabel label="Drużyny - kolumna 3" value={teams_col3} func={setTeamsCol3} name="teams_col3" />
                        <ChangeContentLabel label="Drużyny - kolumna 4" value={teams_col4} func={setTeamsCol4} name="teams_col4" />
                        <ChangeContentLabel label="Usuń drużynę" value={delete_team} func={setDeleteTeam} name="delete_team" />
                        <ChangeContentLabel label="Usuń drużynę - tak" value={delete_team_yes} func={setDeleteTeamYes} name="delete_team_yes" />
                        <ChangeContentLabel label="Usuń drużynę - nie" value={delete_team_no} func={setDeleteTeamNo} name="delete_team_no" />
                        <ChangeContentLabel label="Drużyna usunięta" value={team_deleted} func={setTeamDeleted} name="team_deleted" />
                        <ChangeContentLabel label="Odzyskaj hasło - 1" value={reset_password1} func={setResetPassword1} name="reset_password1" />
                        <ChangeContentLabel label="Odzyskaj hasło - 2" value={reset_password2} func={setResetPassword2} name="reset_password2" />
                        <ChangeContentLabel label="Odzyskaj hasło - 3" value={reset_password3} func={setResetPassword3} name="reset_password3" />
                        <ChangeContentLabel label="Odzyskaj hasło - 4" value={reset_password4} func={setResetPassword4} name="reset_password4" />
                        <ChangeContentLabel label="Odzyskaj hasło - 5" value={reset_password5} func={setResetPassword5} name="reset_password5" />
                        <ChangeContentLabel label="Odzyskaj hasło - 6" value={reset_password6} func={setResetPassword6} name="reset_password6" />
                        <ChangeContentLabel label="Odzyskaj hasło - 7" value={reset_password7} func={setResetPassword7} name="reset_password7" />

                        <ChangeContentLabel label="Wiadomości - 1" value={messages_header1} func={setMessageHeader1} name="messages_header1" />
                        <ChangeContentLabel label="Wiadomości - 2" value={messages_header2} func={setMessageHeader2} name="messages_header2" />
                        <ChangeContentLabel label="Wiadomości - 3" value={messages_header3} func={setMessageHeader3} name="messages_header3" />
                        <ChangeContentLabel label="Wiadomości - 4" value={messages_header4} func={setMessageHeader4} name="messages_header4" />
                        <ChangeContentLabel label="Wiadomości - 5" value={messages_header5} func={setMessageHeader5} name="messages_header5" />
                        <ChangeContentLabel label="Wiadomości - 6" value={messages_header6} func={setMessageHeader6} name="messages_header6" />
                        <ChangeContentLabel label="Wiadomości - 7" value={messages_header7} func={setMessageHeader7} name="messages_header7" />
                        <ChangeContentLabel label="Wiadomości - 8" value={messages_header8} func={setMessageHeader8} name="messages_header8" />
                        <ChangeContentLabel label="Wiadomości - 9" value={messages_read} func={setMessageRead} name="message_read" />

                        <ChangeContentLabel label="Strefa asystenta - nagłówek 1" value={stuff_zone_header1} func={setStuffZoneHeader1} name="stuff_zone_header1" />
                        <ChangeContentLabel label="Strefa asystenta - nagłówek 2" value={stuff_zone_header2} func={setStuffZoneHeader2} name="stuff_zone_header2" />
                        <ChangeContentLabel label="Strefa asystenta - nagłówek 3" value={stuff_zone_header3} func={setStuffZoneHeader3} name="stuff_zone_header3" />
                        <ChangeContentLabel label="Strefa asystenta - nagłówek 4" value={stuff_zone_header4} func={setStuffZoneHeader4} name="stuff_zone_header4" />
                        <ChangeContentLabel label="Strefa asystenta - nagłówek 5" value={stuff_zone_header5} func={setStuffZoneHeader5} name="stuff_zone_header5" />
                        <ChangeContentLabel label="Strefa asystenta - nagłówek 6" value={stuff_zone_header6} func={setStuffZoneHeader6} name="stuff_zone_header6" />
                        <ChangeContentLabel label="Strefa asystenta - tekst 1" value={stuff_zone_text1} func={setStuffZoneText1} name="stuff_zone_text1" type="textarea" />
                        <ChangeContentLabel label="Strefa asystenta - tekst 2" value={stuff_zone_text2} func={setStuffZoneText2} name="stuff_zone_text2" type="textarea" />
                        <ChangeContentLabel label="Strefa asystenta - tekst 3" value={stuff_zone_text3} func={setStuffZoneText3} name="stuff_zone_text3" type="textarea" />
                        <ChangeContentLabel label="Strefa asystenta - tekst 4" value={stuff_zone_text4} func={setStuffZoneText4} name="stuff_zone_text4" type="textarea" />
                        <ChangeContentLabel label="Strefa asystenta - tekst 5" value={stuff_zone_text5} func={setStuffZoneText5} name="stuff_zone_text5" type="textarea" />
                        <ChangeContentLabel label="Strefa asystenta - tekst 6" value={stuff_zone_text6} func={setStuffZoneText6} name="stuff_zone_text6" type="textarea" />
                        <ChangeContentLabel label="Stefa asystenta - napis pod kółkiem 1" value={stuff_zone_circle1} func={setStuffZoneCircle1} name="stuff_zone_circle1" />
                        <ChangeContentLabel label="Stefa asystenta - napis pod kółkiem 2" value={stuff_zone_circle2} func={setStuffZoneCircle2} name="stuff_zone_circle2" />
                        <ChangeContentLabel label="Stefa asystenta - napis pod kółkiem 3" value={stuff_zone_circle3} func={setStuffZoneCircle3} name="stuff_zone_circle3" />
                        <ChangeContentLabel label="Posada" value={post} func={setPost} name="post" />
                        <ChangeContentLabel label="Posada 1" value={post1} func={setPost1} name="post1" />
                        <ChangeContentLabel label="Posada 2" value={post2} func={setPost2} name="post2" />
                        <ChangeContentLabel label="Posada 3" value={post3} func={setPost3} name="post3" />
                        <ChangeContentLabel label="Posada 4" value={post4} func={setPost4} name="post4" />
                        <ChangeContentLabel label="Posada 5" value={post5} func={setPost5} name="post5" />
                        <ChangeContentLabel label="Typ wpisu do CV 1" value={cv_type1} func={setCvType1} name="cv_type1" />
                        <ChangeContentLabel label="Typ wpisu do CV 2" value={cv_type2} func={setCvType2} name="cv_type2" />
                        <ChangeContentLabel label="Typ wpisu do CV 3" value={cv_type3} func={setCvType3} name="cv_type3" />
                        <ChangeContentLabel label="Dodaj nowy" value={add_new} func={setAddNew} name="add_new" />
                        <ChangeContentLabel label="Znajdź nowych asystentów" value={find_new_stuff} func={setFindNewStuff} name="find_new_stuff" />
                        <ChangeContentLabel label="Zobacz CV" value={see_cv} func={setSeeCv} name="see_cv" />
                        <ChangeContentLabel label="CV input 1" value={cv_input1} func={setCvInput1} name="cv_input1" />
                        <ChangeContentLabel label="CV input 2" value={cv_input2} func={setCvInput2} name="cv_input2" />
                        <ChangeContentLabel label="CV input 3" value={cv_input3} func={setCvInput3} name="cv_input3" />
                        <ChangeContentLabel label="Menu rozwijane klubu - 1" value={club_search_dropdown1} func={setClubSearchDropdown1} name="club_search_dropdown1" />
                        <ChangeContentLabel label="Menu rozwijane klubu - 2" value={club_search_dropdown2} func={setClubSearchDropdown2} name="club_search_dropdown2" />
                        <ChangeContentLabel label="Usuń CV - tekst" value={delete_cv_text} func={setDeleteCvText} name="delete_cv_text" />
                        <ChangeContentLabel label="CV usunięte" value={cv_deleted} func={setCvDeleted} name="cv_deleted" />
                        <ChangeContentLabel label="CV dodane" value={cv_added} func={setCvAdded} name="cv_added" />
                        <ChangeContentLabel label="CV zaktualizowane" value={cv_updated} func={setCvUpdated} name="cv_updated" />
                        <ChangeContentLabel label="CV - błąd 1" value={cv_input_error1} func={setCvInputError1} name="cv_input_error1" />
                        <ChangeContentLabel label="CV - błąd 2" value={cv_input_error2} func={setCvInputError2} name="cv_input_error2" />
                        <ChangeContentLabel label="CV - błąd 3" value={cv_input_error3} func={setCvInputError3} name="cv_input_error2" />
                        <ChangeContentLabel label="Usuń wpis w CV" value={delete_cv_yes} func={setDeleteCvYes} name="delete_cv_yes" />
                        <ChangeContentLabel label="Powrót" value={delete_cv_no} func={setDeleteCvNo} name="delete_cv_no" />

                        <ChangeContentLabel label="Propozycja dodania konta - nagłówek" value={add_account_type_header} func={setAddAccountTypeHeader} name="add_account_type_header" />
                        <ChangeContentLabel label="Propozycja dodania konta - tekst dla zawodnika" value={add_account_type_text_user} func={setAddAccountTypeTextUser} name="add_account_type_text_user" />
                        <ChangeContentLabel label="Propozycja dodania konta - tekst dla sztabu" value={add_account_type_text_staff} func={setAddAccountTypeTextStaff} name="add_account_type_text_staff" />
                        <ChangeContentLabel label="Po dodaniu drugiego typu konta - zawodnik" value={after_add_account_type_user} func={setAfterAddAccountTypeUser} name="after_add_account_type_user" />
                        <ChangeContentLabel label="Po dodaniu drugiego typu konta - zawodnik" value={after_add_account_type_staff} func={setAfterAddAccountTypeStaff} name="after_add_account_type_staff" />
                        <ChangeContentLabel label="Zmiana typu konta - zawodnik" value={switch_account_type_user} func={setSwitchAccountTypeUser} name="switch_account_type_user" />
                        <ChangeContentLabel label="Zmiana typu konta - zawodnik" value={switch_account_type_staff} func={setSwitchAccountTypeStaff} name="switch_account_type_staff" />

                        <button className="admin__btn admin__btn--addNotification admin__btn--cms"
                                onClick={() => { handleSubmit(); }}>
                            Zaktualizuj treści
                        </button>
                    </section>
                </main>
            </main> : <DraftLoader />}
        </main>
    </div>
}

export default AdminContent;
