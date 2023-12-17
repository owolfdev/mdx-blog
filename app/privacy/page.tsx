import ReactMarkdown from "react-markdown";

export default function Privacy() {
  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl sm:text-5xl font-bold text-center">
        Privacy Policy
      </h1>
      <ReactMarkdown className="flex flex-col gap-6">
        {privacyContent}
      </ReactMarkdown>
    </div>
  );
}

const privacyContent = `

Effective Date: December 1, 2023

Welcome to MDX Blog. Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website MDXBlog.io, including any other media form, media channel, mobile website, or mobile application related or connected thereto (collectively, the “Site”). Please read this privacy policy carefully. If you do not agree with the terms of this privacy policy, please do not access the site.

**1. Collection of Your Information**

We may collect information about you in a variety of ways. The information we may collect on the Site includes:

   *Personal Data:* Personally identifiable information, such as your name and email address, that you voluntarily give to us when you choose to participate in various activities related to the Site. You are under no obligation to provide us with personal information of any kind, however, your refusal to do so may prevent you from using certain features of the Site.

**2. Disclosure of Your Information**

We may share information we have collected about you in certain situations. Your information may be disclosed as follows:

   *By Law or to Protect Rights:* If we believe the release of information about you is necessary to respond to legal process, to investigate or remedy potential violations of our policies, or to protect the rights, property, and safety of others, we may share your information as permitted or required by any applicable law, rule, or regulation.

**3. Security of Your Information**

We use administrative, technical, and physical security measures to help protect your personal information. While we have taken reasonable steps to secure the personal information you provide to us, please be aware that despite our efforts, no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.

**4. Contact Us**

If you have questions or comments about this Privacy Policy, please contact us at: owolfdev@gmail.com.
`;
