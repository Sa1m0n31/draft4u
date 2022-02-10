import React, {useState, useEffect, useRef} from 'react'
import AdminTop from "../components/AdminTop";
import PanelMenu from "../components/PanelMenu";
import {
    addClub,
    changeClubPasswordFromAdminPanel,
    getClubById,
    getClubLocations,
    getLeagues,
    updateClub
} from "../helpers/club";
import mapImg from '../static/img/poland.svg'
import settings from "../settings";
import trashIcon from "../static/img/trash-black.svg";
import Dropzone from "react-dropzone-uploader";
import {getCustomFields, updateCustomFields} from "../helpers/admin";

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

    const [nameError, setNameError] = useState("");
    const [addResult, setAddResult] = useState(-1);

    useEffect(() => {
        getCustomFields(lang)
            .then((res) => {

            });
    }, []);

    const handleSubmit = () => {
        updateCustomFields({
            menu_before_login, menu_player, menu_club, carousel_title, footer_header1,
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
            position1, position2, position3, position4, position5
        })
            .then((res) => {

            });
    }

    return <div className="container container--dark container--admin">
        <AdminTop />
        <main className="admin">
            <PanelMenu menuOpen={6} />
            <main className="admin__main">
                <header className="admin__flex">
                    <h1 className="admin__main__header">
                        Edytuj treści
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
                    <section className="admin__main__form admin__main__form--addClub">
                        <label className="admin__label">
                            Menu przed logowaniem (pozycje rozdzielone średnikiem)
                            <input className="admin__input admin__input--title"
                                   name="name"
                                   value={menu_before_login}
                                   onChange={(e) => { setMenuBeforeLogin(e.target.value); }} />
                        </label>
                    </section>
                </main>
            </main>
        </main>
    </div>
}

export default AdminContent;
