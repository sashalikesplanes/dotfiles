Vim�UnDo� ���"*rmBmLͮS�Z?��_ڨ���*zrH  �   + * Controller for callbacks from the api.v3                              d��    _�                    +        ����                                                                                                                                                                                                                                                                                                                           +         ?           V       d��     �  *  +            /**   J   * A user parameter is needed to access ApiV3, but we don't have a user.      */   S  private buildClientTokenPayload(clientId: string): ClientFirebaseIdTokenPayload {       return {         name: '',         picture: '',         auth_time: -1,         user_id: '',         email: '',         email_verified: false,         firebase: {           identities: {},           sign_in_provider: '',         },         claims: {           clientId: clientId,         },       };     }    5��    *                     �+      �              5�_�                    �       ����                                                                                                                                                                                                                                                                                                                           +         +           V       d��    �         �      + * Controller for callbacks from the api.v3�      !  �      ) * Called from app/Services/V5/Client.php�       "  �       */�   -   /  �      K  /************************************************************************�   .   0  �      J   ****************************** ROUTES *********************************�   /   1  �      K   ***********************************************************************/�   1   3  �        /**�   2   4  �      &   * Trigger a callback to the client.�   3   5  �      a   * Called from api.v3 when a new fine was created. It will trigger a callback to the client. If�   4   6  �      R   * no callback url is provided, the httpbin cloud function should be configured.�   5   7  �         */�   D   F  �        /**�   E   G  �      &   * Trigger a callback to the client.�   F   H  �      k   * Called from api.v3 when a fine receives a state, which could happen multiple times for the same state,�   G   I  �      %   * if it is applied more than once.�   H   J  �      h   * + It will trigger a patch callback to the client. If no callback url is provided, the httpbin cloud�   I   K  �      #   * function should be configured.�   J   L  �      /   * + It will submit to DLV conditions are met�   K   M  �         */�   u   w  �        /**�   v   x  �      !   * Trigger a win for a transfer�   w   y  �      =   * Called from api.v3 when a fine first enters a win state.�   x   z  �         */�   ~   �  �          /**�      �  �      P     * Note: This is a temporary solution to send the email for Check customers.�   �   �  �      0     * This should be moved to the gRPC service.�   �   �  �           */�   �   �  �      K  /************************************************************************�   �   �  �      K   ****************************** HELPERS *********************************�   �   �  �      K   ***********************************************************************/�   �   �  �        /**�   �   �  �      f   * Submit a transfer to the DLV. Extracted here to keep code readable. Called from updateClient only�   �   �  �         * when conditions are met�   �   �  �         *�   �   �  �      V   * NOTE: included is ignored as we will download the files from the api.v3 ourselves�   �   �  �         */�      �        /**�      �      .   * Prepare the submission request and log it�      �         */�  *  ,  �        /**�  +  -  �      ?   * Log the error that caused the transfer to not be submitted�  ,  .  �         */�  J  L  �        /**�  K  M  �      -   * Check if the required attributes are set�  L  N  �         */�  [  ]  �        /**�  \  ^  �      +   * Checks if the fine should be submitted�  ]  _  �      >   *   - parking codes should never be submitted automatically�  ^  `  �      <   *   - also do not submit if we are in staging environment�  _  a  �      *   *   - and only if the transfer is Dutch�  `  b  �         */�  e  g  �        /**�  f  h  �      p   * Try to map the resource to a transfer. If it fails, log the error and throw an UnprocessableEntityException�  g  i  �      =   * @throws UnprocessableEntityException (equivalent to 422)�  h  j  �         */�  }    �        /**�  ~  �  �      r   * Try to find the client for the transfer. If it fails, log the error and throw an UnprocessableEntityException�    �  �      =   * @throws UnprocessableEntityException (equivalent to 422)�  �  �  �         */5��    �                    �8                    �                        �8                    �    ~                    78                    �    }                    18                    �    h                    �5                    �    g                    �5                    �    f                    $5                    �    e                    5                    �    `                    �3                    �    _                    �3                    �    ^                    �3                    �    ]                    T3                    �    \                    (3                    �    [                    "3                    �    L                    �0                    �    K                    V0                    �    J                    P0                    �    ,                    /,                    �    +                    �+                    �    *                    �+                    �                        q)                    �                        B)                    �                        <)                    �    �                     �                    �    �                     e                    �    �                     `                    �    �                     C                    �    �                     �                    �    �                     �                    �    �                     �                    �    �                     =                    �    �                     �                    �    �                                         �    �                     �                    �                         �                    �    ~                     �                    �    x                     b                    �    w                     $                    �    v                                         �    u                     �                    �    K                     K                    �    J                                         �    I                     �                    �    H                     �                    �    G                     h                    �    F                     �
                    �    E                     �
                    �    D                     �
                    �    5                     �                    �    4                     �                    �    3                     $                    �    2                     �                    �    1                     �                    �    /                     �                    �    .                     _                    �    -                                         �                                              �                         �                    �                         �                    5�_�                    �       ����                                                                                                                                                                                                                                                                                                                           +         +           V       d��    �         �      + * Controller for callbacks from the api.v3�      !  �      ) * Called from app/Services/V5/Client.php�       "  �       */�   -   /  �      K  /************************************************************************�   .   0  �      J   ****************************** ROUTES *********************************�   /   1  �      K   ***********************************************************************/�   1   3  �        /**�   2   4  �      &   * Trigger a callback to the client.�   3   5  �      a   * Called from api.v3 when a new fine was created. It will trigger a callback to the client. If�   4   6  �      R   * no callback url is provided, the httpbin cloud function should be configured.�   5   7  �         */�   D   F  �        /**�   E   G  �      &   * Trigger a callback to the client.�   F   H  �      k   * Called from api.v3 when a fine receives a state, which could happen multiple times for the same state,�   G   I  �      %   * if it is applied more than once.�   H   J  �      h   * + It will trigger a patch callback to the client. If no callback url is provided, the httpbin cloud�   I   K  �      #   * function should be configured.�   J   L  �      /   * + It will submit to DLV conditions are met�   K   M  �         */�   u   w  �        /**�   v   x  �      !   * Trigger a win for a transfer�   w   y  �      =   * Called from api.v3 when a fine first enters a win state.�   x   z  �         */�   ~   �  �          /**�      �  �      P     * Note: This is a temporary solution to send the email for Check customers.�   �   �  �      0     * This should be moved to the gRPC service.�   �   �  �           */�   �   �  �      K  /************************************************************************�   �   �  �      K   ****************************** HELPERS *********************************�   �   �  �      K   ***********************************************************************/�   �   �  �        /**�   �   �  �      f   * Submit a transfer to the DLV. Extracted here to keep code readable. Called from updateClient only�   �   �  �         * when conditions are met�   �   �  �         *�   �   �  �      V   * NOTE: included is ignored as we will download the files from the api.v3 ourselves�   �   �  �         */�      �        /**�      �      .   * Prepare the submission request and log it�      �         */�  *  ,  �        /**�  +  -  �      ?   * Log the error that caused the transfer to not be submitted�  ,  .  �         */�  J  L  �        /**�  K  M  �      -   * Check if the required attributes are set�  L  N  �         */�  [  ]  �        /**�  \  ^  �      +   * Checks if the fine should be submitted�  ]  _  �      >   *   - parking codes should never be submitted automatically�  ^  `  �      <   *   - also do not submit if we are in staging environment�  _  a  �      *   *   - and only if the transfer is Dutch�  `  b  �         */�  e  g  �        /**�  f  h  �      p   * Try to map the resource to a transfer. If it fails, log the error and throw an UnprocessableEntityException�  g  i  �      =   * @throws UnprocessableEntityException (equivalent to 422)�  h  j  �         */�  }    �        /**�  ~  �  �      r   * Try to find the client for the transfer. If it fails, log the error and throw an UnprocessableEntityException�    �  �      =   * @throws UnprocessableEntityException (equivalent to 422)�  �  �  �         */5��    �                    �8                    �                        �8                    �    ~                    78                    �    }                    18                    �    h                    �5                    �    g                    �5                    �    f                    $5                    �    e                    5                    �    `                    �3                    �    _                    �3                    �    ^                    �3                    �    ]                    T3                    �    \                    (3                    �    [                    "3                    �    L                    �0                    �    K                    V0                    �    J                    P0                    �    ,                    /,                    �    +                    �+                    �    *                    �+                    �                        q)                    �                        B)                    �                        <)                    �    �                     �                    �    �                     e                    �    �                     `                    �    �                     C                    �    �                     �                    �    �                     �                    �    �                     �                    �    �                     =                    �    �                     �                    �    �                                         �    �                     �                    �                         �                    �    ~                     �                    �    x                     b                    �    w                     $                    �    v                                         �    u                     �                    �    K                     K                    �    J                                         �    I                     �                    �    H                     �                    �    G                     h                    �    F                     �
                    �    E                     �
                    �    D                     �
                    �    5                     �                    �    4                     �                    �    3                     $                    �    2                     �                    �    1                     �                    �    /                     �                    �    .                     _                    �    -                                         �                                              �                         �                    �                         �                    5�_�                    �       ����                                                                                                                                                                                                                                                                                                                           +         +           V       d��     �   �   �  �      8    const user = this.buildClientTokenPayload(clientId);5��    �                     4                     5�_�                    �       ����                                                                                                                                                                                                                                                                                                                           +         +           V       d��     �   �   �  �      9    const user = this..buildClientTokenPayload(clientId);5��    �                     5                     �    �                    4                    �    �                    4                    �    �                    4                    5�_�                     �       ����                                                                                                                                                                                                                                                                                                                           +         +           V       d��    �         �      + * Controller for callbacks from the api.v3�      !  �      ) * Called from app/Services/V5/Client.php�       "  �       */�   -   /  �      K  /************************************************************************�   .   0  �      J   ****************************** ROUTES *********************************�   /   1  �      K   ***********************************************************************/�   1   3  �        /**�   2   4  �      &   * Trigger a callback to the client.�   3   5  �      a   * Called from api.v3 when a new fine was created. It will trigger a callback to the client. If�   4   6  �      R   * no callback url is provided, the httpbin cloud function should be configured.�   5   7  �         */�   D   F  �        /**�   E   G  �      &   * Trigger a callback to the client.�   F   H  �      k   * Called from api.v3 when a fine receives a state, which could happen multiple times for the same state,�   G   I  �      %   * if it is applied more than once.�   H   J  �      h   * + It will trigger a patch callback to the client. If no callback url is provided, the httpbin cloud�   I   K  �      #   * function should be configured.�   J   L  �      /   * + It will submit to DLV conditions are met�   K   M  �         */�   u   w  �        /**�   v   x  �      !   * Trigger a win for a transfer�   w   y  �      =   * Called from api.v3 when a fine first enters a win state.�   x   z  �         */�   ~   �  �          /**�      �  �      P     * Note: This is a temporary solution to send the email for Check customers.�   �   �  �      0     * This should be moved to the gRPC service.�   �   �  �           */�   �   �  �      K  /************************************************************************�   �   �  �      K   ****************************** HELPERS *********************************�   �   �  �      K   ***********************************************************************/�   �   �  �        /**�   �   �  �      f   * Submit a transfer to the DLV. Extracted here to keep code readable. Called from updateClient only�   �   �  �         * when conditions are met�   �   �  �         *�   �   �  �      V   * NOTE: included is ignored as we will download the files from the api.v3 ourselves�   �   �  �         */�      �        /**�      �      .   * Prepare the submission request and log it�      �         */�  *  ,  �        /**�  +  -  �      ?   * Log the error that caused the transfer to not be submitted�  ,  .  �         */�  J  L  �        /**�  K  M  �      -   * Check if the required attributes are set�  L  N  �         */�  [  ]  �        /**�  \  ^  �      +   * Checks if the fine should be submitted�  ]  _  �      >   *   - parking codes should never be submitted automatically�  ^  `  �      <   *   - also do not submit if we are in staging environment�  _  a  �      *   *   - and only if the transfer is Dutch�  `  b  �         */�  e  g  �        /**�  f  h  �      p   * Try to map the resource to a transfer. If it fails, log the error and throw an UnprocessableEntityException�  g  i  �      =   * @throws UnprocessableEntityException (equivalent to 422)�  h  j  �         */�  }    �        /**�  ~  �  �      r   * Try to find the client for the transfer. If it fails, log the error and throw an UnprocessableEntityException�    �  �      =   * @throws UnprocessableEntityException (equivalent to 422)�  �  �  �         */5��    �                    �8                    �                        �8                    �    ~                    =8                    �    }                    78                    �    h                    �5                    �    g                    �5                    �    f                    *5                    �    e                    $5                    �    `                    4                    �    _                    �3                    �    ^                    �3                    �    ]                    Z3                    �    \                    .3                    �    [                    (3                    �    L                    �0                    �    K                    \0                    �    J                    V0                    �    ,                    5,                    �    +                    �+                    �    *                    �+                    �                        w)                    �                        H)                    �                        B)                    �    �                     �                    �    �                     e                    �    �                     `                    �    �                     C                    �    �                     �                    �    �                     �                    �    �                     �                    �    �                     =                    �    �                     �                    �    �                                         �    �                     �                    �                         �                    �    ~                     �                    �    x                     b                    �    w                     $                    �    v                                         �    u                     �                    �    K                     K                    �    J                                         �    I                     �                    �    H                     �                    �    G                     h                    �    F                     �
                    �    E                     �
                    �    D                     �
                    �    5                     �                    �    4                     �                    �    3                     $                    �    2                     �                    �    1                     �                    �    /                     �                    �    .                     _                    �    -                                         �                                              �                         �                    �                         �                    5��