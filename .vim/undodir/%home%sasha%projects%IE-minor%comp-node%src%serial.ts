Vim�UnDo� �F�pL&��W�IWU�|ڕQ'8�-ߐ�q��          baudRate: 9600,                             d�҅    _�                            ����                                                                                                                                                                                                                                                                                                                                                             d��e     �               *    path: "/dev/cu.usbmodem" + portNumber,5��                        �                    �                         �                     �                         �                     �                         �                     �                        �                    �                         �                     �                         �                     �                         �                     �                         �                     �                         �                     �                         �                     �                        �                    �                        �                    �                        �                    5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             d��j     �               &    path: "/dev/ttyACM1" + portNumber,5��                         �                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             d��k     �               %    path: "/dev/ttyACM1"+ portNumber,5��                         �                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             d��k     �               $    path: "/dev/ttyACM1" portNumber,5��                         �                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             d��k     �               #    path: "/dev/ttyACM1"portNumber,5��                         �                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             d��k     �               "    path: "/dev/ttyACM1"ortNumber,5��                         �                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             d��k     �               !    path: "/dev/ttyACM1"rtNumber,5��                         �                     5�_�      	                     ����                                                                                                                                                                                                                                                                                                                                                             d��k     �                    path: "/dev/ttyACM1"tNumber,5��                         �                     5�_�      
           	          ����                                                                                                                                                                                                                                                                                                                                                             d��k     �                   path: "/dev/ttyACM1"Number,5��                         �                     5�_�   	              
          ����                                                                                                                                                                                                                                                                                                                                                             d��k     �                   path: "/dev/ttyACM1"umber,5��                         �                     5�_�   
                        ����                                                                                                                                                                                                                                                                                                                                                             d��k     �                   path: "/dev/ttyACM1"mber,5��                         �                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             d��l     �                   path: "/dev/ttyACM1"ber,5��                         �                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             d��l     �                   path: "/dev/ttyACM1"er,5��                         �                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                             d��l    �                   path: "/dev/ttyACM1"r,5��                         �                     5�_�                           ����                                                                                                                                                                                                                                                                                                                                                V       d��o     �                  const portNumber = portList   3    .filter((p) => p.path.includes("tty.usbmodem"))   8    .filter((p) => p.path[p.path.length - 1] === "3")[0]   #    .path.split("tty.usbmodem")[1];         console.log(portNumber);5��                          �       �               5�_�                           ����                                                                                                                                                                                                                                                                                                                                                V       d��p    �                +  const portList = await SerialPort.list();5��                          u       ,               5�_�                           ����                                                                                                                                                                                                                                                                                                                                                V       d��r     �                   baudRate: 9600,5��                        �                     5�_�                            ����                                                                                                                                                                                                                                                                                                                                                V       d�҄    �                   baudRate: 115,5��                         �                      5��