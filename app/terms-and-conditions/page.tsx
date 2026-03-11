'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, ShieldCheck, FileText, Scale, Info } from 'lucide-react';
import Link from 'next/link';

export default function TermsAndConditions() {
    const sections = [
        {
            title: "1. Acceptance of Terms",
            icon: <ShieldCheck className="text-[#780FF0]" size={20} />,
            content: "By accessing and using Sirf Local's services, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please refrain from using our services. We reserve the right to update these terms at any time without prior notice."
        },
        {
            title: "2. Booking and Payments",
            icon: <FileText className="text-[#780FF0]" size={20} />,
            content: "A booking token (25%, 50%, or 100% of the total project value) is required to initiate any service. This token is non-refundable as it covers initial resource allocation and planning. The remaining balance is due upon completion of the agreed project milestones."
        },
        {
            title: "3. Service Delivery",
            icon: <Scale className="text-[#780FF0]" size={20} />,
            content: "Sirf Local strives to provide high-quality design, technology, and strategy solutions. Project timelines are estimates and may vary based on client feedback and project complexity. We are not liable for delays caused by third-party services or incomplete client information."
        },
        {
            title: "4. Intellectual Property",
            icon: <Info className="text-[#780FF0]" size={20} />,
            content: "Upon final payment, ownership of the delivered assets is transferred to the client. However, Sirf Local retains the right to showcase the work in our portfolio and promotional materials unless a non-disclosure agreement (NDA) is explicitly signed."
        }
    ];

    return (
        <main className="min-h-screen bg-[#0E0E0E] text-[#F5F0E8] selection:bg-[#780FF0]/30 py-12 px-6 sm:px-12 lg:px-24">
            <div className="max-w-4xl mx-auto">
                {/* Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 text-[#8A8178] hover:text-[#780FF0] transition-colors group text-sm font-medium"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </Link>
                </motion.div>

                {/* Header */}
                <header className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="section-tag mb-4 block">Legal Documentation</span>
                        <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">
                            Terms & <span className="text-[#780FF0]">Conditions</span>
                        </h1>
                        <p className="text-[#8A8178] text-lg max-w-2xl leading-relaxed">
                            Please review our policies carefully. These terms outline our commitment to you and your responsibilities as a client of Sirf Local.
                        </p>
                    </motion.div>
                </header>

                {/* Content Sections */}
                <div className="grid gap-8">
                    {sections.map((section, index) => (
                        <motion.section
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-[#141414] border border-[#1E1E1E] rounded-3xl p-8 hover:border-[#780FF0]/40 transition-all duration-300 card-glow relative group overflow-hidden"
                        >
                            {/* Decorative background element */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#780FF0]/5 blur-3xl rounded-full -mr-16 -mt-16 group-hover:bg-[#780FF0]/10 transition-colors" />

                            <div className="flex items-center gap-4 mb-4">
                                <div className="p-2.5 bg-[#0E0E0E] border border-[#1E1E1E] rounded-xl">
                                    {section.icon}
                                </div>
                                <h2 className="text-xl font-bold">{section.title}</h2>
                            </div>
                            <p className="text-[#8A8178] leading-relaxed relative z-10">
                                {section.content}
                            </p>
                        </motion.section>
                    ))}
                </div>

                {/* Footer Note */}
                <motion.footer
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-20 pt-12 border-t border-[#1E1E1E] text-center"
                >
                    <p className="text-[#555] text-sm">
                        Last updated: March 11, 2026. For any questions regarding these terms, please contact us at <a href="mailto:hello@sirflocal.in" className="text-[#780FF0] hover:underline">hello@sirflocal.in</a>
                    </p>
                </motion.footer>
            </div>
        </main>
    );
}
