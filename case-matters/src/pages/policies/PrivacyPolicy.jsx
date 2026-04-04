import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Scale, Lock, FileText, Globe, Info, AlertCircle, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen bg-white py-24 px-6 md:px-12 lg:px-24 relative font-sans text-gray-600">
      {/* Aesthetic Background Glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1871C9]/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1871C9]/10 text-[#1871C9] text-xs font-bold uppercase tracking-widest mb-6 border border-[#1871C9]/20">
            <Shield size={14} /> Official Policy
          </div>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-gray-900 mb-6">
            Privacy <span className="text-[#1871C9] italic font-light">Policy</span>
          </h1>
          <p className="text-gray-600 uppercase tracking-[0.2em] text-xs font-semibold">
            Terms of General Site Usage
          </p>
          <div className="h-1 w-20 bg-[#1871C9] mx-auto mt-8" />
        </motion.div>

        {/* Introduction */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="bg-gray-200/70 border border-gray-200/60 p-8 md:p-12 rounded-3xl shadow-sm mb-12 border-l-4 border-l-[#1871C9] backdrop-blur-sm"
        >
          <p className="text-lg leading-relaxed italic text-gray-700">
            Case Matters and its affiliates is committed to protecting your privacy and has provided this policy ("Policy") to familiarize you with the manner in which it collects, uses, shares and discloses your information that is collected through <a href="https://www.casematters.in/" className="text-[#1871C9] hover:text-[#1871C9]/80 underline transition-colors">https://www.casematters.in/</a> and associated mobile applications (the "Website").
          </p>
        </motion.div>

        {/* Detailed Points */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-6"
        >
          {/* Full policy text (as provided) */}
          <motion.div variants={itemVariants} className="p-6 sm:p-8 md:p-12 bg-gray-200/70 border border-gray-200/60 rounded-3xl shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900">Policy Text</h2>
              <Link
                to="/policies/terms-and-conditions"
                className="text-[#1871C9] text-xs font-bold uppercase tracking-[0.22em] hover:underline underline-offset-4"
              >
                View Terms & Conditions
              </Link>
            </div>

            <ol className="space-y-4 text-sm leading-relaxed text-gray-700 list-decimal pl-5">
              <li>The terms of the Policy provided herein govern your use of the Website and any content provided, accessed or distributed in the Website. For our client confidentiality obligations and associated references, please refer to our terms of engagement.</li>
              <li>This Policy shall be construed to be provided in compliance with the Information Technology Act 2000 and the rules framed thereunder (as amended from time to time) ("IT Act"). The words and expressions used in this Policy but not defined herein will have the meaning assigned to them under the IT Act.</li>
              <li>
                During the use of the Website we may collect the following types of information ("Personal Information"):
                <div className="mt-3 space-y-2 text-sm text-gray-700">
                  <p><strong>(i)</strong> contact information, such as your name, job title, postal address, including your home address, business address, telephone number, mobile phone number, fax number and email address;</p>
                  <p><strong>(ii)</strong> further business information necessarily processed in a project or client contractual relationship with Case Matters or voluntarily provided by you, such as instructions given, payments made, requests and projects;</p>
                  <p><strong>(iii)</strong> your password for the Website or other password protected platforms or services, where you have one;</p>
                  <p><strong>(iv)</strong> information collected from publicly available resources, integrity data bases and credit agencies;</p>
                  <p><strong>(v)</strong> information about relevant and significant litigation or other legal proceedings against you or a third party related to you and interaction with you which may be relevant for antitrust purposes, if legally required for compliance purposes;</p>
                  <p><strong>(vi)</strong> information about your health for the purpose of identifying and being mindful of any disabilities or special dietary requirements you may have, which we may ask in connection with the registration for and provision of access to an event or seminar. Any use of such information is based on your consent. If you do not provide such information, we will not be able to take relevant precautions;</p>
                  <p><strong>(vii)</strong> information about your experience, qualifications, desired position within Case Matters, which you may provide in connection with any application made to Case Matters. Any use of such information is based on your consent;</p>
                  <p><strong>(viii)</strong> other personal data regarding your preferences notwithstanding its relevance to the legal services that we provide; and/or</p>
                  <p><strong>(ix)</strong> details of your visits to our premises.</p>
                </div>
              </li>
              <li>From time to time, it may include personal data about your membership of a professional or trade association or union, personal health data, details of dietary preferences when relevant for events to which we invite you and details of any criminal record you may have.</li>
              <li>Your Personal Information will be kept confidential to the maximum possible extent and will be used to support your relationship with Case Matters. Any Sensitive Personal Information will be kept confidential as required under applicable Indian laws.</li>
              <li>Any comments, messages, blogs, scribbles etc posted / uploaded / conveyed / communicated by users on the public sections of the Website becomes published content and is not considered personal information subject to this Policy.</li>
              <li>We may collect personal data about you in a number of circumstances, including (i) when you or your organisation browse, make an enquiry or otherwise interact on the Website; (ii) when you attend a seminar or another Case Matters event or sign up to receive personal data from us, including for training purposes; or (iii) when you or your organisation offer to provide services to us.</li>
              <li>In some circumstances, we collect personal data about you from a third party source, including, personal data from your organisation, other organisations with whom you have dealings, inter alia, government agencies, credit reporting agencies, information or service providers or from publicly available records.</li>
              <li>As a general principle, you will provide us with your personal data entirely voluntarily. There are generally no detrimental effects for you if you choose not to consent or to provide personal data.</li>
              <li>
                Case Matters does not sell or rent Personal Information. We may use your Personal Information for the following purposes only ("Permitted Purposes"):
                <div className="mt-3 space-y-2">
                  <p><strong>(i)</strong> to verify whether you are entitled to access and use the Website and the services made available through the Website. This Personal Information may also be used to enable Case Matters to enhance your experience of the Website.</p>
                  <p><strong>(ii)</strong> to provide legal advice or other services or things you may have requested, including online or legal technology services or solutions as instructed or requested by you or your organisation;</p>
                  <p><strong>(iii)</strong> to manage and administer your or your organisation's business relationship with Case Matters, including processing payments, accounting, auditing, billing and collection and support services;</p>
                  <p><strong>(iv)</strong> to comply with our legal obligations (such as record keeping obligations), compliance screening or recording obligations (including obligations under antitrust laws, export laws, trade sanction and embargo laws and for anti-money laundering, financial and credit check and fraud and crime prevention and detection purposes);</p>
                  <p><strong>(v)</strong> to analyse and improve our services and communications with you;</p>
                  <p><strong>(vi)</strong> to protect the security of and manage access to our premises, information technology and communication systems, online platforms, websites and other systems and to prevent and detect security threats, fraud or other criminal or malicious activities;</p>
                  <p><strong>(vii)</strong> for insurance purposes;</p>
                  <p><strong>(viii)</strong> to monitor and assess compliance with our policies and standards;</p>
                  <p><strong>(ix)</strong> to identify persons authorised to trade on behalf of our clients, customers, suppliers and/or service providers;</p>
                  <p><strong>(x)</strong> to comply with our legal and regulatory obligations and requests anywhere in the world, including reporting to and/or being audited by national and international regulatory bodies;</p>
                  <p><strong>(xi)</strong> to enable vendors and service providers to provide various services subscribed to by you including contact information verification, payment processing, customer service, website hosting, data analysis, infrastructure provision, information technology services, and other similar services;</p>
                  <p><strong>(xii)</strong> to comply with court orders and exercise and/or defend Case Matters's legal rights; and</p>
                  <p><strong>(xiii)</strong> for any purpose related and/or ancillary to any of the above or any other purpose for which your Personal Information was provided to us.</p>
                </div>
              </li>
              <li>
                Where you have expressly given us your consent, we may process your Personal Information also for the following purposes:
                <div className="mt-3 space-y-2">
                  <p><strong>(i)</strong> communicating with you through the channels you have approved to keep you up to date on the latest legal developments, announcements, and other information about Case Matters services, products and technologies (including client briefings, newsletters and other information) as well as Case Matters events and projects;</p>
                  <p><strong>(ii)</strong> informing you of customer surveys, marketing campaigns, market analysis, sweepstakes, contests or other promotional activities or events; or</p>
                  <p><strong>(iii)</strong> collecting information about your preferences to create a user profile to personalise and foster the quality of our communication and interaction with you (for example, by way of newsletter tracking or website analytics).</p>
                </div>
              </li>
              <li>With regard to marketing related communication, we will, where legally required, only provide you with such information after you have opted in and provide you the opportunity to opt out anytime if you do not want to receive further marketing related communication from us. We will not use your Personal Information for taking any automated decisions affecting you or creating profiles other than as described above.</li>
              <li>
                We may process your personal data, depending on the Permitted Purpose we use your personal data for, on one or more of the following legal grounds:
                <div className="mt-3 space-y-2">
                  <p><strong>(i)</strong> to perform and carry our client instructions since processing is necessary for the performance of client instructions or other contract with you or your organisation;</p>
                  <p><strong>(ii)</strong> to comply with our legal obligations (eg to keep pension records or records for tax purposes); or</p>
                  <p><strong>(iii)</strong> for the purposes of our legitimate interest or those of any third party recipients that receive your personal data, provided that such interests are not overridden by your interests or fundamental rights and freedoms.</p>
                </div>
              </li>
              <li>In addition, the processing may be based on your consent where you have expressly given that to us.</li>
              <li>
                We may share your Personal Information in the following circumstances:
                <div className="mt-3 space-y-2">
                  <p><strong>(i)</strong> we may share your Personal Information between the other Case Matters entities on a confidential basis where required for the purpose of providing legal advice or other products or services and for administrative, billing and other business purposes;</p>
                  <p><strong>(ii)</strong> If we have collected your Personal Information in the course of providing legal services to any of our clients, we may disclose it to that client, and where permitted by law to others for the purpose of providing those services;</p>
                  <p><strong>(iii)</strong> we may disclose your contact details on a confidential basis to third parties for the purposes of collecting your feedback on the firm’s service provision, to help us measure our performance and to improve and promote our services;</p>
                  <p><strong>(iv)</strong> we may share your Personal Information with companies providing services for money laundering checks, credit risk reduction and other fraud and crime prevention purposes and companies providing similar services, including financial institutions, credit reference agencies and regulatory bodies with whom such Personal Information is shared;</p>
                  <p><strong>(v)</strong> we may share your Personal Information with any third party to whom we assign or novate any of our rights or obligations;</p>
                  <p><strong>(vi)</strong> we may share your Personal Information with courts, law enforcement authorities, regulators or attorneys or other parties where it is reasonably necessary for Case Matters to exercise or defend a legal or equitable claim, or for the purposes of a confidential alternative dispute resolution process;</p>
                  <p><strong>(vii)</strong> we may also instruct service providers within or outside Case Matters, domestically or abroad, eg shared service centres, to process personal data for Permitted Purposes on our behalf and in accordance with our instructions only. Case Matters will retain control over and will remain fully responsible for your Personal Information and will use appropriate safeguards as required by applicable law to ensure the integrity and security of your Personal Information when engaging such service providers; and</p>
                  <p><strong>(viii)</strong> we may also use aggregated personal data and statistics for the purpose of monitoring website usage in order to help us develop our Website and our services.</p>
                </div>
              </li>
              <li>Otherwise, we will only disclose your Personal Information when you direct us or give us permission, when we are required by applicable law or regulations or judicial or official request to do so, or as required to investigate actual or suspected fraudulent or criminal activities.</li>
              <li>If you provide Personal Information to us about someone else (such as one of your directors or employees, or someone with whom you have business dealings) you must ensure that you are entitled to disclose that Personal Information to us and that, without our taking any further steps, we may collect, use and disclose that Personal Information as described in this Policy. In particular, you must ensure the individual concerned is aware of the various matters detailed in this Policy, as those matters relate to that individual, including our identity, how to contact us, our purposes of collection, our personal data disclosure practices (including disclosure to overseas recipients), the individual's right to obtain access to the Personal Information and make complaints about the handling of the Personal Information, and the consequences if the Personal Information is not provided (such as our inability to provide services).</li>
              <li>We will take appropriate technical and organisational measures to keep your Personal Information confidential and secure in accordance with our internal procedures covering the storage, disclosure of and access to Personal Information. Personal Information may be kept on our personal data technology systems, those of our contractors or in paper files.</li>
              <li>Case Matters uses reasonable security measures, at the minimum those mandated under the IT Act and read with Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules 2011, to safeguard and protect your Personal Information and Sensitive Personal Information. Case Matters implements such measures, as stated above, to protect against unauthorized access to, and unlawful interception of, Personal Information and Sensitive Personal Information. Additionally, we have adopted measures to ensure that your Personal Information and Sensitive Personal Information is accessible to our employees or partners’ employees strictly on a need to know basis. You accept the inherent security implications of providing information over internet / cellular / data networks and will not hold Case Matters responsible for any breach of security or the disclosure of Personal Information unless Case Matters has been grossly and willfully negligent.</li>
              <li>Your Personal Information will primarily be stored in an electronic form. However, certain data can also be stored in physical form. Case Matters may store, collect, process and use your Personal Information in countries other than the Republic of India but under full compliance with applicable laws. Case Matters may enter into an agreement with third parties (in or outside of India) to store collect, process your Personal Information and Sensitive Personal Information under full compliance with applicable laws.</li>
              <li>Notwithstanding anything contained in this Policy or elsewhere, Case Matters shall not be held responsible for any loss, damage or misuse of your Personal Information, if such loss, damage or misuse is attributable to a Force Majeure Event. A "Force Majeure Event" shall mean any event that is beyond the reasonable control of Case Matters and shall include, inter alia, without limitation, sabotage, fire, flood, explosion, acts of God, civil commotion, strikes or industrial action of any kind, riots, insurrection, war, acts of government, computer hacking, unauthorized access to computer data and storage device, computer crashes, breach of security and encryption.</li>
              <li>This Policy is subject to modification based on changes in the business, legal and regulatory requirements and will be made available to you online. We will make all reasonable efforts to communicate to you all significant changes to this Policy. You are encouraged to periodically visit this page to review the Policy and any changes thereto. In case you discontinue the use of the Website, it will not affect the applicability of the Policy to your prior uses of the Website.</li>
              <li>We strive hard to keep our records updated and accurate with your latest information. You shall be responsible to ensure that the information or data you provide from time to time is and shall be correct, current and updated and you have all the rights, permissions and consent to provide such information or data to us.</li>
              <li>Based on technical feasibility and requirements of applicable laws, we will provide you with the right to review, access and modify the Personal Information or Sensitive Personal Information that we maintain about you. We may perform verification before providing you access to this Personal Information. However, we are not responsible for the authenticity of the Sensitive Personal Information provided by you.</li>
              <li>Further, you have the right to withdraw the consent provided to us in relation to your Sensitive Personal Information at any time in writing by sending an e-mail to us at <a className="text-[#1871C9] underline underline-offset-4" href="mailto:casematters.info@gmail.com">casematters.info@gmail.com</a>, in accordance with the terms of this Policy. However, please note that withdrawal of consent will not be retrospective in nature and shall be applicable prospectively. In case you do not provide your information or consent for usage of Sensitive Personal Information or subsequently withdraw your consent for usage of the Sensitive Personal Information so collected, Case Matters reserves the right to discontinue the services for which the said Sensitive Personal Information was sought.</li>
              <li>If you wish to delete the Sensitive Personal Information provided to Case Matters, you can always do so by sending a request to us at <a className="text-[#1871C9] underline underline-offset-4" href="mailto:casematters.info@gmail.com">casematters.info@gmail.com</a>.</li>
              <li>You may note that correction or deletion of certain information or data may lead to cancellation of your registration with the Website or your access to certain features of the Website. You also agree and acknowledge that certain data or information cannot be corrected or deleted and/or is prohibited from being deleted under any applicable law or in lieu of law enforcement requests or under any judicial proceedings.</li>
              <li>We are committed to protect your Personal Information collected and processed by us and look forward to your continued support for the same. In case of any feedback or concern regarding protection of your Personal Information, or any privacy related feedback or concerns you may contact us at <a className="text-[#1871C9] underline underline-offset-4" href="mailto:casematters.info@gmail.com">casematters.info@gmail.com</a>.</li>
              <li>We welcome your views about our Website and our Policy. If you would like to contact us with any queries or comments, please send an email to <a className="text-[#1871C9] underline underline-offset-4" href="mailto:casematters.info@gmail.com">casematters.info@gmail.com</a> or send a letter to Case Matters.</li>
            </ol>
          </motion.div>
        </motion.div>

      </div>
    </div>
  );
};

export default PrivacyPolicy;