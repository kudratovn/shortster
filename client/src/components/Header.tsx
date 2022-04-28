import React from "react";
import { ROUTES } from "../constants/router";

import { browserHistory } from "../services/BrowserHistory";

export type HeaderProps = {};
export const Header: React.FC<HeaderProps> = () => {

  const handleCreate = () => {
    browserHistory.push(ROUTES.CREATE);
  }

  const handleRedirect = () => {
    browserHistory.push(ROUTES.REDIRECT);
  }

  const handleGet = () => {
    browserHistory.push(ROUTES.GET);
  }

  return <>
    <header>
        <div className="container">
            <div className="header">
                <div className="logo">
                    <a onClick={handleCreate} className='header-btn'>
                        Home
                    </a>
                </div>
                <nav>
                    <ul>
                        <li>
                            <a onClick={handleCreate} className='header-btn'>
                                Crete 
                            </a>
                        </li>
                        <li>
                            <a onClick={handleRedirect} className='header-btn'>
                                Redirect
                            </a>
                        </li>
                        <li>
                            <a onClick={handleGet} className='header-btn'>
                                Get
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
  </>
};