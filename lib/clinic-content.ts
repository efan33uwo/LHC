import type { Language } from "@/lib/translations";

export type ServiceItem = {
  title: string;
  description: string;
  icon: string;
  category: "claims" | "injury" | "therapy" | "coverage";
};

export type PractitionerItem = {
  name: string;
  role: string;
  bio: string;
};

export type TrustCard = {
  title: string;
  description: string;
};

type Localized<T> = Record<Language, T>;

export const clinicContent = {
  name: "Langham Health Center",
  phone: "905-477-7887",
  email: "support@langhamhc.ca",
  address: "8333 Kennedy Rd Unit 2000, Markham, ON",
  hours: "Mon-Sun 10:00am - 6:00pm",
  mapLink: "https://maps.google.com/?q=8333+Kennedy+Rd+Unit+2000+Markham+ON",
  mapEmbedLink:
    "https://www.google.com/maps?output=embed&q=8333+Kennedy+Rd+Unit+2000,+Markham,+ON",

  aboutHighlights: {
    en: [
      "Family medicine and chiropractic care in one clinic setting",
      "Bilingual support for English and Chinese-speaking patients",
      "Convenient appointment requests and patient-focused follow-up",
    ],
    zh: [
      "家庭医疗与脊椎治疗服务结合于同一门诊环境",
      "为英语及中文患者提供双语沟通支持",
      "提供便捷预约及以患者为中心的后续跟进服务",
    ],
  } as Localized<string[]>,

  services: {
    en: [
      {
        title: "MVA Insurance Claims",
        description:
          "Support for motor vehicle accident patients with assessment, treatment planning, documentation guidance, and claim-related clinic communication.",
        icon: "MVA",
        category: "claims",
      },
      {
        title: "Spinal Cord Injury",
        description:
          "Focused care pathways for spine-related injury concerns, mobility changes, pain, function, and coordinated rehabilitation support.",
        icon: "SCI",
        category: "injury",
      },
      {
        title: "Sports Injury",
        description:
          "Assessment and rehabilitation support for activity-related sprains, strains, overuse issues, movement limitations, and return-to-play goals.",
        icon: "SI",
        category: "injury",
      },
      {
        title: "Slip and Fall Injuries",
        description:
          "Care for pain, stiffness, joint strain, soft-tissue irritation, and mobility concerns after a fall at work, home, or in public spaces.",
        icon: "SF",
        category: "injury",
      },
      {
        title: "Physiotherapy",
        description:
          "Rehabilitation programs built around movement, strengthening, mobility, education, and practical recovery goals.",
        icon: "PT",
        category: "therapy",
      },
      {
        title: "Chiropractic",
        description:
          "Hands-on care for spinal and joint concerns, back pain, neck pain, posture-related strain, and musculoskeletal function.",
        icon: "DC",
        category: "therapy",
      },
      {
        title: "RMT",
        description:
          "Registered massage therapy for soft-tissue tension, recovery support, stress-related muscle tightness, and injury rehabilitation plans.",
        icon: "RMT",
        category: "therapy",
      },
      {
        title: "Acupuncture",
        description:
          "Supportive treatment for pain management, tension, recovery, and overall wellness as part of a broader care plan.",
        icon: "AC",
        category: "therapy",
      },
      {
        title: "Extended Healthcare",
        description:
          "Clinic support for patients using extended health benefits, including receipts and appointment information for eligible services.",
        icon: "EHC",
        category: "coverage",
      },
    ],
    zh: [
      {
        title: "车祸保险理赔",
        description:
          "为车祸患者提供评估、治疗计划、文件说明及与保险理赔相关的诊所沟通支持。",
        icon: "车祸",
        category: "claims",
      },
      {
        title: "脊髓损伤",
        description:
          "针对脊柱相关损伤、活动能力变化、疼痛、功能恢复及康复协调提供支持。",
        icon: "脊髓",
        category: "injury",
      },
      {
        title: "运动损伤",
        description:
          "为运动相关扭伤、拉伤、过度使用、活动受限及恢复运动目标提供评估与康复支持。",
        icon: "运动",
        category: "injury",
      },
      {
        title: "滑倒跌倒损伤",
        description:
          "针对在工作、家中或公共场所跌倒后的疼痛、僵硬、关节拉伤、软组织不适及活动问题提供护理。",
        icon: "跌倒",
        category: "injury",
      },
      {
        title: "物理治疗",
        description:
          "根据活动能力、力量、灵活度、教育及实际恢复目标制定康复计划。",
        icon: "物理",
        category: "therapy",
      },
      {
        title: "脊椎矫正",
        description:
          "针对脊柱与关节问题、背痛、颈痛、姿势相关压力及肌肉骨骼功能提供护理。",
        icon: "脊椎",
        category: "therapy",
      },
      {
        title: "注册按摩治疗",
        description:
          "为软组织紧张、恢复支持、压力相关肌肉紧绷及损伤康复计划提供注册按摩治疗。",
        icon: "按摩",
        category: "therapy",
      },
      {
        title: "针灸",
        description:
          "作为综合治疗计划的一部分，为疼痛管理、紧张缓解、恢复及整体健康提供辅助支持。",
        icon: "针灸",
        category: "therapy",
      },
      {
        title: "延伸医疗保险",
        description:
          "为使用延伸医疗福利的患者提供诊所支持，包括符合条件服务的收据及预约资料。",
        icon: "保险",
        category: "coverage",
      },
    ],
  } as Localized<ServiceItem[]>,
  practitioners: {
    en: [
      {
        name: "Family Doctor Team",
        role: "Primary Care",
        bio: "Our family medicine team supports routine medical care, preventive health, follow-up, and continuity of care for patients and families.",
      },
      {
        name: "Chiropractic Team",
        role: "Musculoskeletal Care",
        bio: "Our chiropractic services focus on assessment and treatment of pain, mobility concerns, posture-related issues, and physical strain.",
      },
      {
        name: "Clinic Support Team",
        role: "Patient Coordination",
        bio: "Our clinic support staff help patients with scheduling, communication, and a smooth front-desk experience from booking to follow-up.",
      },
    ],
    zh: [
      {
        name: "家庭医生团队",
        role: "基层医疗",
        bio: "家庭医疗团队为患者及家庭提供常规门诊、预防保健、复诊及持续性照护服务。",
      },
      {
        name: "脊椎治疗团队",
        role: "肌肉骨骼照护",
        bio: "脊椎治疗服务专注于疼痛、活动度问题、姿势压力及身体劳损相关问题的评估与处理。",
      },
      {
        name: "门诊支持团队",
        role: "患者协调",
        bio: "门诊支持人员协助患者处理预约、沟通及从登记到后续跟进的整体前台体验。",
      },
    ],
  } as Localized<PractitionerItem[]>,

  whyChooseUs: {
    en: [
      {
        title: "Integrated Clinic Experience",
        description:
          "Patients benefit from a clinic environment that supports both family medicine and chiropractic care in one accessible setting.",
      },
      {
        title: "Bilingual Communication",
        description:
          "English-speaking care is standard, and Chinese language support is available to help patients feel informed and comfortable.",
      },
      {
        title: "Professional Scheduling and Follow-Up",
        description:
          "Appointment requests, front-desk communication, and follow-up processes are designed to be clear, simple, and patient-focused.",
      },
      {
        title: "Comfort and Accessibility",
        description:
          "We aim to provide a clean, welcoming, and professionally managed environment for individuals and families seeking care.",
      },
    ],
    zh: [
      {
        title: "综合门诊体验",
        description:
          "患者可在同一门诊环境中获得家庭医疗与脊椎治疗相关服务，体验更便捷的一体化照护。",
      },
      {
        title: "双语沟通支持",
        description:
          "门诊以英语服务为基础，并提供中文沟通支持，帮助患者更安心、更清楚地了解治疗流程。",
      },
      {
        title: "专业预约与后续跟进",
        description:
          "预约申请、前台沟通及后续联系流程力求清晰、简洁，并以患者体验为核心。",
      },
      {
        title: "舒适与便利",
        description:
          "我们致力于提供整洁、欢迎且专业管理的门诊环境，服务个人及家庭患者。",
      },
    ],
  } as Localized<TrustCard[]>,
};
