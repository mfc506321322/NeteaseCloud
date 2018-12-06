import React from "react";

//引入一级路由
import LoginPage from '../routes/LoginPage';
import MainPage from '../routes/MainPage';
import PassPage from '../routes/PassPage';
import MusicPage from '../routes/MusicPage';

//引入二级路由
import AccountPage from '../routes/account/Index';
import DiscoverPage from '../routes/discover/Index';
import FriendPage from '../routes/friend/Index';
import MyPage from '../routes/my/Index';
import VideoPage from '../routes/video/Index';
import SearchPage from '../routes/discover/Search';

//引入三级路由
import RecommendPage from '../routes/discover/recommend/Index';
import StationPage from '../routes/discover/station/Index';


export default {
  routes: [
    {
      path:'/login',
      component:LoginPage
    },
    {
      path:'/passPage',
      component:PassPage
    },
    {
      path:'/music/:id?',
      component:MusicPage
    },
    {
      path:'/main',
      component:MainPage,
      children:[
        {
          path:'/main/account',
          component:AccountPage
        },
        {
          path:'/main/discover',
          component:DiscoverPage,
          children:[
            {
              path:'/main/discover/recommend',
              component:RecommendPage
            },
            {
              path:'/main/discover/station',
              component:StationPage
            },
            {
              path:'/main/discover',
              redirect:'/main/discover/recommend'
            }
          ]
        },
        {
          path:'/main/friend',
          component:FriendPage
        },
        {
          path:'/main/my',
          component:MyPage
        },
        {
          path:'/main/video',
          component:VideoPage
        },
        {
          path:'/main/search',
          component:SearchPage
        }
      ]
    },{
      path:'/',
      redirect:'/main/discover/recommend'
    }
  ]
};