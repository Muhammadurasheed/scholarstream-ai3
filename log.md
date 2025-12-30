HP@Emrash MINGW64 ~/Documents/scholarstream-ai3 (main)
$ ./deploy.sh
========================================================
  ScholarStream Cloud Run Deployment (Bash/Linux)
========================================================
[1/5] Getting Project ID...
Project ID: scholarstream-i4i
[2/5] Preparing Environment Variables...
Reading backend/.env...
Writing 33 variables to env.yaml...

[3/5] Building & Deploying Backend...
This may take a few minutes (especially for Playwright install)...
Building using Dockerfile and deploying container to Cloud Run service [scholarstream-backend] in project [scholarstream-i4i] region [us-central1]
OK Building and deploying... Done.
  OK Validating Service...
  OK Uploading sources...
  OK Building Container... Logs are available at [https://console.cloud.google.com/cloud-build/builds;
  region=us-central1/881c8f1a-bad1-44ad-92b9-d10783d35d47?project=1086434452502].
  OK Creating Revision...
  OK Routing traffic...
  OK Setting IAM Policy...
Done.
Service [scholarstream-backend] revision [scholarstream-backend-00002-92z] has been deployed and is serving 100 percent of traffic.
Service URL: https://scholarstream-backend-1086434452502.us-central1.run.app

[4/5] Retrieving Backend URL...
Backend deployed at: https://scholarstream-backend-opdnpd6bsq-uc.a.run.app

[5/5] Building & Deploying Frontend...
Injecting API URL: https://scholarstream-backend-opdnpd6bsq-uc.a.run.app
Submitting build to Cloud Build...
Creating temporary archive of 424 file(s) totalling 19.5 MiB before compression.
Some files were not included in the source upload.

Check the gcloud log [C:\Users\HP\AppData\Roaming/gcloud/logs/2025.12.29/23.53.40.432103.log] to see which files and the contents of the
default gcloudignore file used (see `$ gcloud topic gcloudignore` to learn
more).

Uploading tarball of [.] to [gs://scholarstream-i4i_cloudbuild/source/1767048820.765561-d6838adc4fe045d294fd6b363b8ba082.tgz]
Created [https://cloudbuild.googleapis.com/v1/projects/scholarstream-i4i/locations/global/builds/884135a8-c0c5-4318-aee4-0012d5fda580].
Logs are available at [ https://console.cloud.google.com/cloud-build/builds/884135a8-c0c5-4318-aee4-0012d5fda580?project=1086434452502 ].
Waiting for build to complete. Polling interval: 1 second(s).
----------------------------------------- REMOTE BUILD OUTPUT -----------------------------------------
starting build "884135a8-c0c5-4318-aee4-0012d5fda580"

FETCHSOURCE
Fetching storage object: gs://scholarstream-i4i_cloudbuild/source/1767048820.765561-d6838adc4fe045d294fd6b363b8ba082.tgz#1767048836647152
Copying gs://scholarstream-i4i_cloudbuild/source/1767048820.765561-d6838adc4fe045d294fd6b363b8ba082.tgz#1767048836647152...
/ [1 files][  4.8 MiB/  4.8 MiB]
Operation completed over 1 objects/4.8 MiB.
BUILD
Already have image (with digest): gcr.io/cloud-builders/docker
Sending build context to Docker daemon  20.86MB
Step 1/13 : FROM node:18-alpine as builder
18-alpine: Pulling from library/node
f18232174bc9: Pulling fs layer
dd71dde834b5: Pulling fs layer
1e5a4c89cee5: Pulling fs layer
25ff2da83641: Pulling fs layer
25ff2da83641: Verifying Checksum
25ff2da83641: Download complete
1e5a4c89cee5: Verifying Checksum
1e5a4c89cee5: Download complete
f18232174bc9: Verifying Checksum
f18232174bc9: Download complete
f18232174bc9: Pull complete
dd71dde834b5: Verifying Checksum
dd71dde834b5: Download complete
dd71dde834b5: Pull complete
1e5a4c89cee5: Pull complete
25ff2da83641: Pull complete
Digest: sha256:8d6421d663b4c28fd3ebc498332f249011d118945588d0a35cb9bc4b8ca09d9e
Status: Downloaded newer image for node:18-alpine
 ---> ee77c6cd7c18
Step 2/13 : WORKDIR /app
 ---> Running in f7f3695307c9
Removing intermediate container f7f3695307c9
 ---> a031983f6453
Step 3/13 : COPY package*.json ./
 ---> 2342f0e76c95
Step 4/13 : RUN npm ci
 ---> Running in dd1a2ecf142c
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@firebase/ai@2.6.0',
npm warn EBADENGINE   required: { node: '>=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.8', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@firebase/app@0.14.6',
npm warn EBADENGINE   required: { node: '>=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.8', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@firebase/app-check@0.11.0',
npm warn EBADENGINE   required: { node: '>=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.8', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@firebase/app-check-compat@0.4.0',
npm warn EBADENGINE   required: { node: '>=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.8', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@firebase/app-compat@0.5.6',
npm warn EBADENGINE   required: { node: '>=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.8', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@firebase/auth-compat@0.6.1',
npm warn EBADENGINE   required: { node: '>=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.8', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@firebase/auth@1.11.1',
npm warn EBADENGINE   required: { node: '>=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.8', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@firebase/component@0.7.0',
npm warn EBADENGINE   required: { node: '>=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.8', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@firebase/database@1.1.0',
npm warn EBADENGINE   required: { node: '>=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.8', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@firebase/database-compat@2.1.0',
npm warn EBADENGINE   required: { node: '>=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.8', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@firebase/firestore@4.9.2',
npm warn EBADENGINE   required: { node: '>=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.8', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@firebase/firestore-compat@0.4.2',
npm warn EBADENGINE   required: { node: '>=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.8', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@firebase/functions@0.13.1',
npm warn EBADENGINE   required: { node: '>=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.8', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@firebase/functions-compat@0.4.1',
npm warn EBADENGINE   required: { node: '>=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.8', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@firebase/logger@0.5.0',
npm warn EBADENGINE   required: { node: '>=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.8', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@firebase/storage@0.14.0',
npm warn EBADENGINE   required: { node: '>=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.8', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@firebase/storage-compat@0.4.0',
npm warn EBADENGINE   required: { node: '>=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.8', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@firebase/util@1.13.0',
npm warn EBADENGINE   required: { node: '>=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.8', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn EBADENGINE Unsupported engine {
npm warn EBADENGINE   package: '@firebase/auth@1.11.1',
npm warn EBADENGINE   required: { node: '>=20.0.0' },
npm warn EBADENGINE   current: { node: 'v18.20.8', npm: '10.8.2' }
npm warn EBADENGINE }
npm warn deprecated @types/react-virtualized-auto-sizer@1.0.8: This is a stub types definition. react-virtualized-auto-sizer provides its own type definitions, so you do not need this installed.

added 547 packages, and audited 548 packages in 17s

156 packages are looking for funding
  run `npm fund` for details

2 moderate severity vulnerabilities

To address all issues (including breaking changes), run:
  npm audit fix --force

Run `npm audit` for details.
npm notice
npm notice New major version of npm available! 10.8.2 -> 11.7.0
npm notice Changelog: https://github.com/npm/cli/releases/tag/v11.7.0
npm notice To update run: npm install -g npm@11.7.0
npm notice
Removing intermediate container dd1a2ecf142c
 ---> 19ad798cdaf5
Step 5/13 : COPY . .
 ---> 0a3a508f441b
Step 6/13 : ARG VITE_API_BASE_URL
 ---> Running in d12b774bb5df
Removing intermediate container d12b774bb5df
 ---> 2dd7159adff2
Step 7/13 : ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}
 ---> Running in e8f6d452e15e
Removing intermediate container e8f6d452e15e
 ---> b44e1c93cc1c
Step 8/13 : RUN npm run build
 ---> Running in 20d4330571f8

> vite_react_shadcn_ts@0.0.0 build
> vite build
vite v5.4.21 building for production...
transforming...
? 3595 modules transformed.
rendering chunks...
computing gzip size...
dist/index.html                                  1.41 kB ? gzip:   0.57 kB
dist/assets/ss_logo-BQW8l5aA.png               178.44 kB
dist/assets/index-Bzbl2rww.css                  95.11 kB ? gzip:  15.91 kB
dist/assets/ss_logo-BDIkKLG3.js                  0.05 kB ? gzip:   0.07 kB
dist/assets/index-BdQq_4o_.js                    0.06 kB ? gzip:   0.08 kB
dist/assets/index-Bgj5Yvwv.js                    0.23 kB ? gzip:   0.18 kB
dist/assets/check-D-5o8nmh.js                    0.29 kB ? gzip:   0.24 kB
dist/assets/chevron-right-DFXJ9ihv.js            0.30 kB ? gzip:   0.25 kB
dist/assets/loader-circle-D4KkfUuQ.js            0.31 kB ? gzip:   0.26 kB
dist/assets/index-BIVV7qN5.js                    0.32 kB ? gzip:   0.25 kB
dist/assets/plus-ddHobll6.js                     0.32 kB ? gzip:   0.25 kB
dist/assets/arrow-right-D8ZgAoNf.js              0.33 kB ? gzip:   0.27 kB
dist/assets/arrow-left-BdYfVayJ.js               0.33 kB ? gzip:   0.27 kB
dist/assets/search-BTRegufR.js                   0.34 kB ? gzip:   0.27 kB
dist/assets/circle-check-Byr1io1w.js             0.35 kB ? gzip:   0.27 kB
dist/assets/clock-BuwBCF-s.js                    0.35 kB ? gzip:   0.28 kB
dist/assets/code-DzYtM_yB.js                     0.35 kB ? gzip:   0.27 kB
dist/assets/user-ublXFvJm.js                     0.37 kB ? gzip:   0.29 kB
dist/assets/trending-up-BUWT6ZGj.js              0.37 kB ? gzip:   0.29 kB
dist/assets/circle-x-BMp82PZ6.js                 0.38 kB ? gzip:   0.28 kB
dist/assets/bell-od48i1eW.js                     0.38 kB ? gzip:   0.29 kB
dist/assets/mail-DCs67ZWu.js                     0.38 kB ? gzip:   0.30 kB
dist/assets/dollar-sign-LsJ2G0FA.js              0.39 kB ? gzip:   0.30 kB
dist/assets/briefcase-BpfVqa9Z.js                0.39 kB ? gzip:   0.30 kB
dist/assets/target-BK90TLXd.js                   0.40 kB ? gzip:   0.27 kB
dist/assets/circle-help-1p_hdVFb.js              0.41 kB ? gzip:   0.31 kB
dist/assets/circle-alert-Ty7fqIqL.js             0.42 kB ? gzip:   0.29 kB
dist/assets/external-link-CBmLcAXs.js            0.42 kB ? gzip:   0.30 kB
dist/assets/eye-BDkD7gtI.js                      0.43 kB ? gzip:   0.31 kB
dist/assets/calendar-kMhpYysc.js                 0.43 kB ? gzip:   0.31 kB
dist/assets/upload-BPEaEtwd.js                   0.43 kB ? gzip:   0.32 kB
dist/assets/zap-DZeIep_l.js                      0.43 kB ? gzip:   0.31 kB
dist/assets/download-CvEr809o.js                 0.43 kB ? gzip:   0.32 kB
dist/assets/shield-DCHmiU9G.js                   0.44 kB ? gzip:   0.33 kB
dist/assets/award-B4iPdz1v.js                    0.44 kB ? gzip:   0.33 kB
dist/assets/textarea-B4OJDljh.js                 0.48 kB ? gzip:   0.32 kB
dist/assets/square-pen-CtXrcuId.js               0.49 kB ? gzip:   0.34 kB
dist/assets/graduation-cap-CIP1WYdF.js           0.50 kB ? gzip:   0.35 kB
dist/assets/file-text-C5e7iBB3.js                0.50 kB ? gzip:   0.32 kB
dist/assets/trash-2-Bpizo2Fb.js                  0.53 kB ? gzip:   0.35 kB
dist/assets/chevron-up-n7DPFi6X.js               0.54 kB ? gzip:   0.28 kB
dist/assets/input-D0RgqLD1.js                    0.59 kB ? gzip:   0.36 kB
dist/assets/eye-off-B71lNF6k.js                  0.60 kB ? gzip:   0.38 kB
dist/assets/badge-BqXwkvpz.js                    0.82 kB ? gzip:   0.40 kB
dist/assets/label-BcfM0Dbd.js                    0.92 kB ? gzip:   0.58 kB
dist/assets/trophy-BNivpQcx.js                   1.01 kB ? gzip:   0.50 kB
dist/assets/NotFound-CSA5eCjs.js                 1.33 kB ? gzip:   0.64 kB
dist/assets/index.esm-TLeAsu1j.js                1.54 kB ? gzip:   0.89 kB
dist/assets/MobileBottomNav-C7NNpV2K.js          1.56 kB ? gzip:   0.85 kB
dist/assets/dialog-DPWbdwca.js                   2.15 kB ? gzip:   0.83 kB
dist/assets/api-UDC6Q_KI.js                      2.73 kB ? gzip:   0.87 kB
dist/assets/ForgotPassword-CqvIT743.js           3.31 kB ? gzip:   1.31 kB
dist/assets/checkbox-Blh2fLFs.js                 3.89 kB ? gzip:   1.72 kB
dist/assets/alert-dialog-BmiDK29s.js             5.23 kB ? gzip:   2.02 kB
dist/assets/Login-DabzsaCx.js                    6.53 kB ? gzip:   2.38 kB
dist/assets/tabs-9lsmvOf2.js                     6.61 kB ? gzip:   2.64 kB
dist/assets/index-D3aRUg0J.js                    6.69 kB ? gzip:   2.56 kB
dist/assets/SavedOpportunities-8n1I8pZM.js       6.95 kB ? gzip:   2.44 kB
dist/assets/ApplicationTracker-Wq-q4Ye-.js       7.17 kB ? gzip:   2.20 kB
dist/assets/Applications-BkwMbcP7.js             9.85 kB ? gzip:   2.89 kB
dist/assets/scroll-area-D23RI4d_.js             12.52 kB ? gzip:   3.94 kB
dist/assets/react-confetti-DgjCpXFb.js          13.08 kB ? gzip:   4.63 kB
dist/assets/Landing-BzgSL5Wt.js                 14.83 kB ? gzip:   5.45 kB
dist/assets/index-BuQjrl9i.js                   16.59 kB ? gzip:   6.29 kB
dist/assets/SignUp-BBDSqWZv.js                  17.95 kB ? gzip:   5.18 kB
dist/assets/select-B0dc05G2.js                  22.65 kB ? gzip:   7.88 kB
dist/assets/DashboardHeader-V89KfvGy.js         30.47 kB ? gzip:   9.45 kB
dist/assets/matchingEngine-D9DHAOlp.js          33.93 kB ? gzip:  10.77 kB
dist/assets/OpportunityDetail-CMxGzVLV.js       35.20 kB ? gzip:   8.03 kB
dist/assets/Apply-D3aAEdoW.js                   38.38 kB ? gzip:   9.20 kB
dist/assets/Profile-BGKF0W7x.js                 43.31 kB ? gzip:  10.98 kB
dist/assets/Onboarding-DjDUQsDQ.js              54.44 kB ? gzip:  15.59 kB
dist/assets/proxy-B_xNAOzf.js                  114.04 kB ? gzip:  37.68 kB
dist/assets/FloatingChatAssistant-Dc1eHa0a.js  196.40 kB ? gzip:  60.31 kB
dist/assets/Dashboard-DqCR5sN9.js              429.38 kB ? gzip: 123.22 kB
dist/assets/index-Cq1VWG6K.js                  800.12 kB ? gzip: 218.59 kB

(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rollupOptions.output.manualChunks to improve chunking: https://rollupjs.org/configuration-options/#output-manualchunks
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
? built in 15.32s
Removing intermediate container 20d4330571f8
 ---> 15349ae092d4
Step 9/13 : FROM nginx:alpine
alpine: Pulling from library/nginx
1074353eec0d: Pulling fs layer
25f453064fd3: Pulling fs layer
567f84da6fbd: Pulling fs layer
da7c973d8b92: Pulling fs layer
33f95a0f3229: Pulling fs layer
085c5e5aaa8e: Pulling fs layer
0abf9e567266: Pulling fs layer
de54cb821236: Pulling fs layer
0abf9e567266: Waiting
de54cb821236: Waiting
085c5e5aaa8e: Verifying Checksum
085c5e5aaa8e: Download complete
567f84da6fbd: Verifying Checksum
567f84da6fbd: Download complete
da7c973d8b92: Verifying Checksum
da7c973d8b92: Download complete
33f95a0f3229: Verifying Checksum
33f95a0f3229: Download complete
25f453064fd3: Verifying Checksum
25f453064fd3: Download complete
1074353eec0d: Verifying Checksum
1074353eec0d: Download complete
0abf9e567266: Verifying Checksum
0abf9e567266: Download complete
de54cb821236: Verifying Checksum
de54cb821236: Download complete
1074353eec0d: Pull complete
25f453064fd3: Pull complete
567f84da6fbd: Pull complete
da7c973d8b92: Pull complete
33f95a0f3229: Pull complete
085c5e5aaa8e: Pull complete
0abf9e567266: Pull complete
de54cb821236: Pull complete
Digest: sha256:8491795299c8e739b7fcc6285d531d9812ce2666e07bd3dd8db00020ad132295
Status: Downloaded newer image for nginx:alpine
 ---> 04da2b0513cd
Step 10/13 : COPY --from=builder /app/dist /usr/share/nginx/html
 ---> 665e384628a5
Step 11/13 : COPY nginx.conf /etc/nginx/conf.d/default.conf
 ---> 9b86104a9154
Step 12/13 : EXPOSE 8080
 ---> Running in bb871fce72de
Removing intermediate container bb871fce72de
 ---> c32d5ffa7a18
Step 13/13 : CMD ["nginx", "-g", "daemon off;"]
 ---> Running in ad637450c70d
Removing intermediate container ad637450c70d
 ---> 8e0154ea5dea
Successfully built 8e0154ea5dea
Successfully tagged gcr.io/scholarstream-i4i/scholarstream-frontend:latest
PUSH
Pushing gcr.io/scholarstream-i4i/scholarstream-frontend
The push refers to repository [gcr.io/scholarstream-i4i/scholarstream-frontend]
2380456df24d: Preparing
1f8860090b2d: Preparing
e6fe11fa5b7f: Preparing
67ea0b046e7d: Preparing
ed5fa8595c7a: Preparing
8ae63eb1f31f: Preparing
b3e3d1bbb64d: Preparing
48078b7e3000: Preparing
fd1e40d7f74b: Preparing
7bb20cf5ef67: Preparing
67ea0b046e7d: Layer already exists
b3e3d1bbb64d: Layer already exists
48078b7e3000: Layer already exists
7bb20cf5ef67: Layer already exists
ed5fa8595c7a: Layer already exists
e6fe11fa5b7f: Layer already exists
8ae63eb1f31f: Layer already exists
fd1e40d7f74b: Layer already exists
2380456df24d: Pushed
1f8860090b2d: Pushed
latest: digest: sha256:9f830884b274b0a2e5daad91ed9722094e1a0f619d0a66e6fcb03380df413d7f size: 2406     
DONE
-------------------------------------------------------------------------------------------------------
ID                                    CREATE_TIME                DURATION  SOURCE                      
                                                                     IMAGES                            
                         STATUS
884135a8-c0c5-4318-aee4-0012d5fda580  2025-12-29T22:53:58+00:00  1M13S     gs://scholarstream-i4i_cloudbuild/source/1767048820.765561-d6838adc4fe045d294fd6b363b8ba082.tgz  gcr.io/scholarstream-i4i/scholarstream-frontend (+1 more)  SUCCESS
Deploying Frontend image to Cloud Run...
Deploying container to Cloud Run service [scholarstream-frontend] in project [scholarstream-i4i] region [us-central1]
OK Deploying new service... Done.
  OK Creating Revision...
  OK Routing traffic...
  OK Setting IAM Policy...
Done.
Service [scholarstream-frontend] revision [scholarstream-frontend-00001-bjh] has been deployed and is serving 100 percent of traffic.
Service URL: https://scholarstream-frontend-1086434452502.us-central1.run.app

========================================================
  DEPLOYMENT COMPLETE!
========================================================
Backend: https://scholarstream-backend-opdnpd6bsq-uc.a.run.app
Frontend: https://scholarstream-frontend-opdnpd6bsq-uc.a.run.app

Please update your environment variables (Firebase, etc.) if needed.
(base) 
HP@Emrash MINGW64 ~/Documents/scholarstream-ai3 (main)
$