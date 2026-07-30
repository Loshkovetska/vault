import { Text } from '@/components/ui/text';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

const styles = StyleSheet.create({
  container: {
    gap: 24,
    paddingTop: 20,
  },
  block: { gap: 16 },
});

export const documents = [
  {
    id: 'privacy',
    title: 'Privacy Policy',
    content: (
      <View style={styles.container}>
        <View style={styles.block}>
          <Text typo="label-md" weight={600}>
            Last Updated: July 15, 2026
          </Text>
          <Text typo="text-md" weight={500}>
            At Vault ("we," "our," or "us"), we are committed to protecting your
            privacy. This Privacy Policy explains how we collect, use, disclose,
            and safeguard your information when you use our mobile application
            and services (the "Service").
          </Text>
          <Text typo="text-md" weight={500}>
            Please read this privacy policy carefully. If you do not agree with
            the terms of this privacy policy, please do not access the
            application.
          </Text>
        </View>
        <View style={styles.block}>
          <Text typo="label-lg" weight={600}>
            1. Information We Collect
          </Text>
          <Text typo="text-md" weight={500}>
            We collect information about you in a range of ways to provide and
            improve our services:
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Personal Data: Legal name, email address, phone number,
            mailing address, date of birth, and government-issued identification
            numbers (e.g., SSN, Passport, or National ID) required for identity
            verification (KYC).
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Financial Data: Bank account numbers, linked credit/debit
            card details, transaction histories, balances, and payment
            destination details.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Device Data: IP address, device ID, operating system version,
            mobile carrier, and hardware specifications used to detect and
            prevent fraud.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Biometric Data: Face geometry data (via selfie scans) used
            strictly for secure authentication and identity verification. We do
            not store raw biometric data on our servers; it is handled securely
            via native device systems.
          </Text>
        </View>
        <View style={styles.block}>
          <Text typo="label-lg" weight={600}>
            2. How We Use Your Information
          </Text>
          <Text typo="text-md" weight={500}>
            We process your information to fulfill our contract with you and
            comply with legal obligations, including:
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Operating, maintaining, and providing the core financial
            features of the Service.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Verifying your identity and processing compliance checks
            against global sanctions lists.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Detecting, preventing, and prosecuting financial fraud,
            security breaches, and illegal activities.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Providing customer support and processing transaction
            disputes.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Sending essential system updates, security alerts, and
            transaction receipts.
          </Text>
        </View>
        <View style={styles.block}>
          <Text typo="label-lg" weight={600}>
            3. Sharing Your Information
          </Text>
          <Text typo="text-md" weight={500}>
            We do not sell your personal data. We only share your information
            with trusted third parties under the following strict conditions:
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Banking Partners & Processors: To execute your requests for
            deposits, withdrawals, and P2P transfers.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Identity Verification Services: Third-party compliance
            systems that verify your legal documents during onboarding.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Law Enforcement & Regulators: When legally compelled to do so
            by court orders, financial regulatory authorities, or anti-money
            laundering (AML) enforcement bodies.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Service Providers: Cloud hosting services (e.g., AWS) and
            security analytics tools operating under strict confidentiality
            agreements.
          </Text>
        </View>
        <View style={styles.block}>
          <Text typo="label-lg" weight={600}>
            4. Data Security and Retention
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Encryption: All data transmitted through our application is
            protected using Transport Layer Security (TLS) and stored using
            bank-grade AES-256 encryption standards.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Retention Period: Due to financial regulations and anti-money
            laundering laws, we are legally required to retain your financial
            records and identification data for a minimum period (typically 5 to
            7 years) after you close your account.
          </Text>
        </View>
        <View style={styles.block}>
          <Text typo="label-lg" weight={600}>
            5. Your Privacy Rights
          </Text>
          <Text typo="text-md" weight={500}>
            Depending on your geographical location (such as the EU under GDPR
            or California under CCPA), you may have the following rights:
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Access & Portability: Request a digital copy of all personal
            data we hold about you.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Correction: Request updates to inaccurate or incomplete
            profile records.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Erasure ("Right to be Forgotten"): Request deletion of your
            personal account data, subject to our overriding legal financial
            retention requirements.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Withdraw Consent: Revoke permissions for optional tracking or
            marketing features inside your account dashboard.
          </Text>
        </View>
        <View style={styles.block}>
          <Text typo="label-lg" weight={600}>
            6. Changes to This Privacy Policy
          </Text>
          <Text typo="text-md" weight={500}>
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal mandates. We will notify you of
            any material changes by posting the new policy on this page and
            updating the "Last Updated" timestamp. We recommend reviewing this
            policy periodically.
          </Text>
        </View>
        <View style={styles.block}>
          <Text typo="label-lg" weight={600}>
            7. Contact Our Data Protection Officer (DPO)
          </Text>
          <Text typo="text-md" weight={500}>
            If you have questions, concerns, or requests regarding your data
            privacy rights, please contact our privacy compliance team at:
            privacy@vault.com
          </Text>
        </View>
      </View>
    ),
  },
  {
    id: 'terms',
    title: 'Terms & Conditions',
    content: (
      <View style={styles.container}>
        <View style={styles.block}>
          <Text typo="label-md" weight={600}>
            Last Updated: July 15, 2026
          </Text>
          <Text typo="text-md" weight={500}>
            Please read these Terms and Conditions ("Terms", "Terms and
            Conditions") carefully before using our mobile application and
            services (the "Service") operated by [Company Name] ("us", "we", or
            "our").
          </Text>
          <Text typo="text-md" weight={500}>
            Your access to and use of the Service is conditioned on your
            acceptance of and compliance with these Terms. These Terms apply to
            all visitors, users, and others who access or use the Service.
          </Text>
        </View>
        <View style={styles.block}>
          <Text typo="label-lg" weight={600}>
            1. Eligibility and Account Registration
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Age Requirement: You must be at least 18 years old (or the
            legal age of majority in your jurisdiction) to create an account.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Accuracy of Information: You agree to provide accurate,
            current, and complete information during registration and to keep
            your account details updated.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Identity Verification (KYC): To comply with financial
            regulations and prevent financial crime, we require identity
            verification before unlocking specific features. We reserve the
            right to suspend accounts that fail verification or provide
            fraudulent documentation.
          </Text>
        </View>
        <View style={styles.block}>
          <Text typo="label-lg" weight={600}>
            2. Account Security and Maintenance
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Credential Safety: You are responsible for safeguarding the
            password, PIN, or biometric keys used to access the Service.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Unauthorized Access: You must notify us immediately upon
            becoming aware of any breach of security or unauthorized use of your
            account.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Prohibited Sharing: Accounts are strictly personal. You may
            not authorize third parties to use your account or transfer your
            account to any other person.
          </Text>
        </View>
        <View style={styles.block}>
          <Text typo="label-lg" weight={600}>
            3. Financial Transactions
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Deposits and Top-Ups: Funding sources must be legally owned
            by the account holder. Mismatched names between funding sources and
            your profile will result in processing delays or transaction
            reversals.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Withdrawals: Withdrawals are subject to processing times,
            verification checks, and dynamic limits displayed within the app UI.
            Standard processing times depend heavily on banking networks.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Transaction Fees: We reserve the right to charge convenience
            or processing fees for specific payment corridors. All applicable
            fees will be explicitly stated before you confirm a transaction.
          </Text>
        </View>
        <View style={styles.block}>
          <Text typo="label-lg" weight={600}>
            4. Prohibited Conduct and System Misuse
          </Text>
          <Text typo="text-md" weight={500}>
            You agree not to use the Service to:
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Engage in money laundering, terrorist financing, or any other
            illegal financial activity.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Purchase or sell illegal goods, services, or restricted
            substances.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Bypass, disable, or circumvent any security layers,
            anti-fraud algorithms, or rate-limiting architectures.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Use automated scripts, bots, or scrapers to extract data or
            manipulate platform functions.
          </Text>
        </View>
        <View style={styles.block}>
          <Text typo="label-lg" weight={600}>
            5. Termination and Account Suspension
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Suspension for Cause: We reserve the right to instantly
            terminate or suspend access to our Service, without prior notice or
            liability, if you breach these Terms or if we suspect fraudulent
            activity.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Regulatory Compliance: Your account may be restricted if
            required by local court orders, law enforcement requests, or global
            financial regulatory authorities.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Voluntary Closure: You may close your account at any time by
            contacting our support team, provided you have settled all pending
            balances and transaction disputes.
          </Text>
        </View>
        <View style={styles.block}>
          <Text typo="label-lg" weight={600}>
            6. Limitation of Liability
          </Text>
          <Text typo="text-md" weight={500}>
            To the maximum extent permitted by applicable law, Vault shall not
            be liable for any indirect, incidental, special, consequential, or
            punitive damages, including without limitation, loss of profits,
            data, use, goodwill, or other intangible losses resulting from:
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Your ability or inability to access or use the Service.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Processing delays caused by third-party banking networks or
            clearing houses.
          </Text>
          <Text typo="text-md" weight={500}>
            &bull; Any unauthorized access, alteration, or use of your data or
            account components.
          </Text>
        </View>
        <View style={styles.block}>
          <Text typo="label-lg" weight={600}>
            7. Changes to These Terms
          </Text>
          <Text typo="text-md" weight={500}>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. If a revision is material, we will provide
            at least 30 days' notice via in-app notification or email prior to
            any new terms taking effect. What constitutes a material change will
            be determined at our sole discretion.
          </Text>
        </View>
        <View style={styles.block}>
          <Text typo="label-lg" weight={600}>
            8. Contact Us
          </Text>
          <Text typo="text-md" weight={500}>
            If you have any questions or require clarification regarding these
            Terms and Conditions, please contact our legal compliance team at:
            legal@vault.com
          </Text>
        </View>
      </View>
    ),
  },
];
