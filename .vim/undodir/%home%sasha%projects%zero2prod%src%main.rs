Vim�UnDo� ����@�@g|]�s�]��7l���H]�a�Wy�f-      J    let pool = PgPool::connect_lazy_with(configuration.database.with_db())      J  Z  ~       %  ~  ~    dr2p   � _�      [          Z           ����                                                                                                                                                                                                                                                                                                                          	   '       	   %       v   %    dj��   | �                use sqlx::{Connection, PgPool};5��                                                 5�_�  Z  \          [          ����                                                                                                                                                                                                                                                                                                                             '          %       v   %    dj��    �               ;use zero2prod::{configuration::get_configuration, startup};5��                                                5�_�  [  ]          \           ����                                                                                                                                                                                                                                                                                                                          	   '       	   %       v   %    dk�:     �      	             �      	       5��                          �                      �                       	   �               	       5�_�  \  ^          ]      	    ����                                                                                                                                                                                                                                                                                                                          
   '       
   %       v   %    dk�@     �      	         	    env::5��                         �                      �                         �                      5�_�  ]  _          ^          ����                                                                                                                                                                                                                                                                                                                          
   '       
   %       v   %    dk�A     �      	             env5��                         �                      �                         �                      �                        �                     5�_�  ^  `          _      	    ����                                                                                                                                                                                                                                                                                                                          
   '       
   %       v   %    dk�M     �                
    env_lo5��                          �                      5�_�  _  a          `      	    ����                                                                                                                                                                                                                                                                                                                          	   '       	   %       v   %    dk�^     �      	             �      	       5��                          �                      �                         �                      �       
                  �                      �       	                  �                      �                     
   �              
       5�_�  `  b          a          ����                                                                                                                                                                                                                                                                                                                          
   '       
   %       v   %    dk�b     �      	             let env_logger5��                         �                      �                         �                      �                         �                      �                         �                      �                         �                      �                         �                      �                         �                      �       
                  �                      �       	                  �                      �                         �                      5�_�  a  c          b          ����                                                                                                                                                                                                                                                                                                                          
   '       
   %       v   %    dk�b     �      	             let 5��                         �                      �                         �                      �                         �                      �                        �                     �                         �                      �                         �                      �                     
   �              
       �              
          �       
              �                        �                     �                         �                      �                         �                      �                         �                      �                         �                      �                         �                      �                         �                      �                        �                     �                        �                     5�_�  b  d          c          ����                                                                                                                                                                                                                                                                                                                          
   '       
   %       v   %    dk�l     �      	             env_logger::builder()::f5��                         �                      5�_�  c  e          d          ����                                                                                                                                                                                                                                                                                                                          
   '       
   %       v   %    dk�m     �      	             env_logger::builder()::5��                         �                      �                         �                      �                         �                      �                         �                      5�_�  d  f          e          ����                                                                                                                                                                                                                                                                                                                          
   '       
   %       v   %    dk�m     �      	             env_logger::builder5��                         �                      �                         �                      �                         �                      �                         �                      �                         �                      �                         �                      �                        �                     �                         �                      �                        �                     �                        �                     �                        �                     �                         �                      �                         �                      �                         �                      �                        �                     �                          �                      �                         �                      �                         �                      �                         �                      �                         �                      �                         �                      �                         �                      �                        �                     �                        �                     �                        �                     5�_�  e  g          f      "    ����                                                                                                                                                                                                                                                                                                                             $          "       v   "    dk�w     �      
         &    env_logger::Builder::from_env(Env)�               use sqlx::PgPool;�      	         &    env_logger::Builder::from_env(env)5��       "                 �                     �       $                  �                      �       #                  �                      �       "                 �                     �       $                  �                      �       #                  �                      �       "                 �                     �       "                 �                     �                                                �       "                 �                     �       (                  �                      �       '                 �                     �       '                 �                     �       '                 �                     �       2                  �                      �       1                 �                     �       1                 �                     �       1                 �                     5�_�  f  h          g   	   C    ����                                                                                                                                                                                                                                                                                                                          	   I       	   C       v   C    dk�     �      
         L    env_logger::Builder::from_env(Env::default().default_filter_or(default))5��       C                  �                      5�_�  g  i          h   	   C    ����                                                                                                                                                                                                                                                                                                                          	   I       	   C       v   C    dk�     �      
         E    env_logger::Builder::from_env(Env::default().default_filter_or())5��       C                  �                      5�_�  h  j          i   	   D    ����                                                                                                                                                                                                                                                                                                                          	   I       	   C       v   C    dk�     �      
         G    env_logger::Builder::from_env(Env::default().default_filter_or(""))5��       D                  �                      5�_�  i  k          j   	   K    ����                                                                                                                                                                                                                                                                                                                          	   I       	   C       v   C    dk�     �      
         K    env_logger::Builder::from_env(Env::default().default_filter_or("info"))5��       K                                       �       L                                     �       O                                       �       N                                       �       M                                       �       L                                     �       L                                     �       L                                     5�_�  j  l          k   	   R    ����                                                                                                                                                                                                                                                                                                                          	   I       	   C       v   C    dk�   � �   	          5��    	                                           �    	                                          �    	                                           5�_�  k  m          l   	       ����                                                                                                                                                                                                                                                                                                                          	   I       	   C       v   C    dk�     �      
             �      
       5��                          �                      �                         �                      �       
                  �                      �       	                  �                      �                         �                      �                     !   �              !       �       '                  �                      �       &                  �                      �       %                  �                      �       $                  �                      5�_�  l  n          m   	   $    ����                                                                                                                                                                                                                                                                                                                          
   I       
   C       v   C    dk�     �      
         $    // Attach the env logger to the 5��       $                  �                      5�_�  m  o          n   	   %    ����                                                                                                                                                                                                                                                                                                                          
   I       
   C       v   C    dk�   � �      
         &    // Attach the env logger to the ``5��       %                  �                      �       )                  �                      5�_�  n  p          o          ����                                                                                                                                                                                                                                                                                                                                                             dqٱ   � �               K    let pool = PgPool::connect(&configuration.database.connection_string())5��                         �                     �                         �                     �                         �                     �                         �                     �                         �                     �                         �                     �                         �                     �                         �                     �                        �                    �       %                  �                     �       $                  �                     �       #                  �                     �       "                  �                     �       !                  �                     �                          �                     �                         �                     �                         �                     �                         �                     �                         �                     �                         �                     �                         �                     �                         �                     �                         �                     �                        �                    �       "                  �                     �       !                  �                     �                          �                     �                         �                     �                         �                     �                         �                     �                         �                     �                         �                     �                         �                     �                         �                     �                         �                     �                        �                    �       "                  �                     �       !                  �                     �                          �                     �                         �                     �                         �                     �                         �                     �                         �                     �                         �                     �                         �                     �                         �                     �                         �                     �                        �                    �                        �                    �                        �                    5�_�  o  q          p          ����                                                                                                                                                                                                                                                                                                                                                             dq��   � �                        .await5��                          �                     5�_�  p  r          q      &    ����                                                                                                                                                                                                                                                                                                                                                             dq�x     �               K    let listener = TcpListener::bind(("127.0.0.1", configuration.app_port))5��       &                 5                    �       '                  6                     �       &                 5                    �       &                 5                    �       &                 5                    �       5                  D                     �       4                 C                    �       4                 C                    �       4                 C                    �       8                 G                    �       8                 G                    �       8                 G                    5�_�  q  s          r      L    ����                                                                                                                                                                                                                                                                                                                                                             dq�   � �               V    let listener = TcpListener::bind((configuration.app.host, configuration.app_port))5��       L                 [                    5�_�  r  t          s           ����                                                                                                                                                                                                                                                                                                                                                             dr"�     �                   �             5��                          �              	       �                         �                    �                         �                     �                         �                     �                        �                    �       	                  �                     �                         �                     �                         �                     �                         �                     �                         �                     �                        �                    �                         �                     �       
                  �                     �       	                  �                     �                         �                     �                         �                     �                         �                     �                         �                     �                        �                    �                        �                    �                     
   �             
       5�_�  s  u          t          ����                                                                                                                                                                                                                                                                                                                                                             dr"�     �                   println!()5��                         �                     5�_�  t  v          u          ����                                                                                                                                                                                                                                                                                                                                                             dr"�     �                   println!("")5��                        �                    �       	                 �                    �       	                 �                    �       	                 �                    5�_�  u  w          v          ����                                                                                                                                                                                                                                                                                                                                                             dr"�     �                   log::info!()5��                         �                     5�_�  v  x          w          ����                                                                                                                                                                                                                                                                                                                                                             dr"�     �                   log::info!("")5��                         �                     5�_�  w  y          x          ����                                                                                                                                                                                                                                                                                                                                                             dr"�   � �                   log::info!("Starting up")5��                         �                     5�_�  x  z          y      $    ����                                                                                                                                                                                                                                                                                                                                                             dr2@     �               P    let pool = PgPool::connect_lazy(&configuration.database.connection_string())5��       $       +           �      +               5�_�  y  {          z      $    ����                                                                                                                                                                                                                                                                                                                                                             dr2B   � �               %    let pool = PgPool::connect_lazy()5��       $                  �                     �       &                  �                     �       %                  �                     �       $                 �                    �       )                  �                     �       (                  �                     �       '                  �                     �       &                  �                     �       %                  �                     �       $                 �                    �       0                  �                     �       /                  �                     �       .                  �                     �       -                  �                     �       ,                  �                     �       +                  �                     �       *                  �                     �       )                  �                     �       (                  �                     �       '                  �                     �       &                  �                     �       %                  �                     �       $                 �                    �       $                 �                    �       $                 �                    �       3                  �                     �       2                 �                    �       2                 �                    �       2                 �                    �       <                  �                     �       ;                 �                    �       A                  �                     �       @                  �                     �       ?                  �                     �       >                  �                     �       =                  �                     �       <                  �                     �       ;                 �                    �       ;                 �                    �       ;              	   �             	       5�_�  z  }          {      #    ����                                                                                                                                                                                                                                                                                                                                                             dr2X   � �               E    let pool = PgPool::connect_lazy(configuration.database.with_db())5��       #                  �                     5�_�  {  ~  |      }      '    ����                                                                                                                                                                                                                                                                                                                                                             dr2o     �                1        .expect("Failed to connect to Postgres");5��                          �      2               5�_�  }              ~      J    ����                                                                                                                                                                                                                                                                                                                                                             dr2o   � �               J    let pool = PgPool::connect_lazy_with(configuration.database.with_db())5��       J                  �                     5�_�  {          }  |      '    ����                                                                                                                                                                                                                                                                                                                                                             dr2c   � �              5��                          �      2               5��