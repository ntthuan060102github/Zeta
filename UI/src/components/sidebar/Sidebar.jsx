import "./sidebar.css"
import CloseFriend from "../closeFriend/CloseFriend"
import { Users } from "../../dummyData.js"
import { RssFeed, Chat, SlowMotionVideo, Group, 
            Bookmark, HelpOutline, Work, Event, School } from "@material-ui/icons"

export default function Sidebar () {
    return (
        <div className="sidebar">
            <div className="sidebar__wrapper">
                <ul className="sidebar__list">
                    <li className="sidebar__item">
                        <RssFeed className="sidebar__item-icon"/>
                        <span className="sidebar__item-text">Feed</span>
                    </li>
                    <li className="sidebar__item">
                        <Chat className="sidebar__item-icon"/>
                        <span className="sidebar__item-text">Chats</span>
                    </li>
                    <li className="sidebar__item">
                        <SlowMotionVideo className="sidebar__item-icon"/>
                        <span className="sidebar__item-text">Videos</span>
                    </li>
                    <li className="sidebar__item">
                        <Group className="sidebar__item-icon"/>
                        <span className="sidebar__item-text">Groups</span>
                    </li>
                    <li className="sidebar__item">
                        <Bookmark className="sidebar__item-icon"/>
                        <span className="sidebar__item-text">Bookmarks</span>
                    </li>
                    <li className="sidebar__item">
                        <HelpOutline className="sidebar__item-icon"/>
                        <span className="sidebar__item-text">Questions</span>
                    </li>
                    <li className="sidebar__item">
                        <Work className="sidebar__item-icon"/>
                        <span className="sidebar__item-text">Jobs</span>
                    </li>
                    <li className="sidebar__item">
                        <Event className="sidebar__item-icon"/>
                        <span className="sidebar__item-text">Events</span>
                    </li>
                    <li className="sidebar__item">
                        <School className="sidebar__item-icon"/>
                        <span className="sidebar__item-text">Courses</span>
                    </li>
                </ul>
                <button className="sidebar__button">Show More</button>
                <hr className="sidebar__hr"/>
                <ul className="sidebar__friends">
                    {Users.map(user => <CloseFriend key={user.id} user={user}/>)}
                </ul>
            </div>
        </div>
    )
}