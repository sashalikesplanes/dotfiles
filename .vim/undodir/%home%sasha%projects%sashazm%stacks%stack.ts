Vim�UnDo� Z��}e�lq����!���4O���Y8|�HW   -                       !       !   !   !    d�W    _�                             ����                                                                                                                                                                                                                                                                                                                                                             d� g    �   	               �   
           �                 �      
       5��                          �                      �                          �                      �                         �                      �    	                    �               �       5�_�                            ����                                                                                                                                                                                                                                                                                                                                                V       d� m     �   
      '        path: "packages/web",     buildOutput: "dist",      buildCommand: "npm run build",     environment: {       VITE_APP_API_URL: api.url,     },   });5��    
                     �                     �                                             �                         *                    �                         M                    �                         `                    �                         �                    �                          �                     5�_�                    
       ����                                                                                                                                                                                                                                                                                                                                                V       d� r     �          '      =import { StackContext, Api, EventBus } from "sst/constructs";5��        $                  $                      5�_�                    	        ����                                                                                                                                                                                                                                                                                                                                      	           V       d� z     �      	       	       ,  const web = new StaticSite(stack, "web", {       path: "packages/web",       buildOutput: "dist",   "    buildCommand: "npm run build",       environment: {          VITE_APP_API_URL: api.url,       },     });5��           	               �       �               5�_�                            ����                                                                                                                                                                                                                                                                                                                            	          	           V       d� |    �             �             5��                   	                     �       5�_�                           ����                                                                                                                                                                                                                                                                                                                            	          	           V       d� �    �         '      "    buildCommand: "npm run build",5��                        {                    5�_�                    %       ����                                                                                                                                                                                                                                                                                                                                                             d��    �   %   '   (          �   %   '   '    5��    %                      e                     �    %                     i                     �    %                     e                    �    %                     y                     5�_�      	              &       ����                                                                                                                                                                                                                                                                                                                                                             d��    �   %   '   (          webUrl: web.url,5��    %                    i                    5�_�      
           	          ����                                                                                                                                                                                                                                                                                                                                                             d�	�     �         )          �         (    5��                                               �                                              �                                             �                                              5�_�   	              
          ����                                                                                                                                                                                                                                                                                                                                                             d�	�     �         *            �         )          environment: {5��                                             �                                             �                                             �                         -                     5�_�   
                        ����                                                                                                                                                                                                                                                                                                                                                             d�	�    �         +            �         +    �         *    5��                          .                     �                      �   4              �       5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             d�
     �         +      �      'a144ec6fd61631464b4489483736eb1eda3bcaaa017708b564b4caca99a57999417e3d94a34ea2099ecd00fba2ca539a6969af74faa49fdd497925fe340950eb26b105d77beb0d5868f09d2798b5dc9fab74ebf1a2090e35b569799be374294c'5��                         4                     �                         ?                     �                        >                    5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             d�
   	 �                      TABLE_NAME: "todo",5��                                               5�_�                           ����                                                                                                                                                                                                                                                                                                                               �                 v   �    d�
�     �         *      �      DEEZER_ABL: 'a144ec6fd61631464b4489483736eb1eda3bcaaa017708b564b4caca99a57999417e3d94a34ea2099ecd00fba2ca539a6969af74faa49fdd497925fe340950eb26b105d77beb0d5868f09d2798b5dc9fab74ebf1a2090e35b569799be374294c'5��              �           '      �               5�_�                            ����                                                                                                                                                                                                                                                                                                                                                  V        d�
�   
 �                    environment: {         DEEZER_ABL: ''5��                                (               5�_�                           ����                                                                                                                                                                                                                                                                                                                                                  V        d�
     �         (              bind: [bus],5��                         0                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                  V        d�
    �         (              bind: [bus,],5��                         1                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                  V        d�)     �         *      const DEEZER_KEY�          *      Iimport { StackContext, Api, EventBus, StaticSite } from "sst/constructs";�         )       �         (    5��                          J                      �                          J                      �                       
   K               
       �       	                  T                      �                         S                      �                         R                      �                     
   Q              
       �              
          Q       
              �                        Q                     �                     	   ]              	       �                        b                     �                        b                     �        0                  0                      �                        j                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                  V        d�4     �         *      const DEEZER_KEY = new Config.5��                        p                     �                        p                     �                     	   p              	       5�_�                       $    ����                                                                                                                                                                                                                                                                                                                                                  V        d�=     �                &const DEEZER_KEY = new Config.Secret()5��                          S       '               5�_�                            ����                                                                                                                                                                                                                                                                                                                                                  V        d�>     �         )    �         )    5��                          �               '       5�_�                            ����                                                                                                                                                                                                                                                                                                                                                  V        d�?     �         *      &const DEEZER_KEY = new Config.Secret()5��                          �                      5�_�                           ����                                                                                                                                                                                                                                                                                                                                                  V        d�@     �         *    5��                          �                      �                         �                      �                          �                      5�_�                       '    ����                                                                                                                                                                                                                                                                                                                                                  V        d�B     �         +      (  const DEEZER_KEY = new Config.Secret()5��       '                  �                      �       '                 �                     �       '                 �                     �       '                 �                     �               ,       >   �       ,       >       �       =                  �                      5�_�                       :    ����                                                                                                                                                                                                                                                                                                                                                  V        d�G     �         +      >  const DEEZER_KEY = new Config.Secret(stack, "DEEZER_KEY", {)5��       :                  �                      5�_�                       :    ����                                                                                                                                                                                                                                                                                                                                                  V        d�G     �         +      =  const DEEZER_KEY = new Config.Secret(stack, "DEEZER_KEY" {)5��       :                  �                      5�_�                       :    ����                                                                                                                                                                                                                                                                                                                                                  V        d�G     �         +      <  const DEEZER_KEY = new Config.Secret(stack, "DEEZER_KEY"{)5��       :                  �                      5�_�                       ;    ����                                                                                                                                                                                                                                                                                                                                                  V        d�J    �         +      ;  const DEEZER_KEY = new Config.Secret(stack, "DEEZER_KEY")5��       ;                  �                      5�_�                       6    ����                                                                                                                                                                                                                                                                                                                                                  V        d�	     �         ,            �         +    5��                          �                     �                         �                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                  V        d�     �         ,            "GET /song"5��                         �                     �                      :   �             :       �       9                                       5�_�                        +    ����                                                                                                                                                                                                                                                                                                                                                  V        d�    �         ,      9      "GET /song": "packages/functions/src/song.handler",5��       +                                     5�_�      !                      ����                                                                                                                                                                                                                                                                                                                                                  V        d��    �         ,      B      "GET /song": "packages/functions/src/recognizeSong.handler",5��                        �                    5�_�                   !      
    ����                                                                                                                                                                                                                                                                                                                                                  V        d�V    �         -              �         ,    5��                          e                     �                      	   e             	       �                        m                    �                        m                    �                        m                    5��